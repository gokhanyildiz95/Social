import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Socket from '../../../api/socket';
import { setAcceptToRequest, getRelation, setDeclineToRequest } from '../../../api/friend';
import { getUser } from '../../../api/user';
import { getBlockState } from '../../../api/block';
import { getFavoriteState, getFavoriteCount } from '../../../api/favorite';
import Profile from './profile';
import ProfileLocked from './locked';
import { Loading } from '../../../components/ui/';
import Notification from '../../../lib/notification';

class Index extends Component {
  constructor(props) {
    super(props);

    const {
      state: {
        params: { friendId }
      }
    } = props.navigation;

    this.state = {
      userStatus: 0,
      friendStatus: 0,
      friendUserId: friendId,
      friend: false,
      favoriteCount: 0,
      favorited: false,
      blocked: false,
      blockedMe: false,
      reason: 0,
      reasonDesc: ''
    };

    this.refreshRelation = this.refreshRelation.bind(this);
    this.acceptToRequest = this.acceptToRequest.bind(this);
    this.declineToRequest = this.declineToRequest.bind(this);
    this.deleteToRequest = this.deleteToRequest.bind(this);

    this.handleRefreshUserStates = this.handleRefreshUserStates.bind(this);
  }

  componentDidMount() {
    this.setFriend();
    this.setRelation();
    this.setUserFavoriteCount();
    this.userActivitySocket();
    this.handleRefreshUserStates();
    this.getBlockStatus();
  }

  componentDidUpdate(prevProps, prevState) {
    const { friendUserId: prevFriendUserId } = prevState;
    const { friendUserId } = this.state;

    // NOTE: eğer kullanıcı değişti ise arkadaşlık durumunu güncelliyoruz
    if (friendUserId != prevFriendUserId) {
      this.setFriend();
      this.setRelation();
      this.setUserFavoriteCount();
    }
  }

  // NOTE: Kullanıcı favorideyse state e tanımlar
  async getFavoriteStatus() {
    const { friendUserId } = this.state;
    const isFavorited = await getFavoriteState({ favoritedUserId: friendUserId });

    this.setState(() => ({ favorited: !!isFavorited.status }));
  }

  // NOTE: Kullanıcıyı bloklanmış ise state e tanımlar
  async getBlockStatus() {
    const { friendUserId } = this.state;
    const isBlocked = await getBlockState({ blockedUserId: friendUserId }); 
    console.log("isBlocked ----------------------- ")
    console.log(isBlocked)
    this.setState(() => ({ blocked: !!isBlocked.status, blockedMe: !!isBlocked.me }));
  }

  // NOTE: Kullanıcıyı state e tanımlar
  async setFriend() {
    const { friendUserId } = this.state;
    const user = await getUser(friendUserId);

    this.setState(() => ({ friend: user }));
  }

  // NOTE: Arkadaşlık durumunu tanımlar
  async setRelation() { 
    const {
      user: { user }
    } = this.props;
    const { friendUserId } = this.state;

    const relation = await getRelation({ userId: user.id, friendUserId: friendUserId });
    console.log(relation);
    this.setState(() => relation);
  }

  // NOTE: Favori sayısını tanımlar
  async setUserFavoriteCount() {
    const { friendUserId } = this.state;

    const favorite = await getFavoriteCount({ userId: friendUserId });
    console.log(favorite);
    this.setState(() => ({ favoriteCount: favorite.count }));
  }

  // Kullanıcı stateini günceller
  handleRefreshUserStates() {
    this.getFavoriteStatus();
    this.getBlockStatus();
  }

  // NOTE: Kullanıcı aktiviteleri takip edip kullanıcıyı günceller
  userActivitySocket() {
    if (this.socket && this.socket.connect) {
      return;
    }
    const {
      user: { user }
    } = this.props;

    this.socket = new Socket({
      connect: socket => {
        // NOTE: Kullanıcı aktivitelerini almak izni için kayıt
        socket.get('/subscribe/user/activity');
        // NOTE: Kullanıcı aktivitelerini alır
        socket.on(`user-activity-receive/${user.id}`, () => {
          this.setFriend();
          this.setRelation();
        });
      },
      dispose: () => {
        // NOTE: Eğer socket disconnect olur ise socketi tekrar açar
        this.userActivitySocket();
      }
    });
  }

  // NOTE: Arkadaşlık isteğini onaylama
  acceptToRequest() {
    const {
      user: { user }
    } = this.props;
    const { friendUserId } = this.state;

    // NOTE: Login olan kullanıcı friend durumunda olduğu için idsini friend olarak gönderiyoruz
    setAcceptToRequest({
      userId: friendUserId,
      friendUserId: user.id
    }).then(() => {
      // NOTE: Arkadaşlık durumunu güncelliyoruz
      this.setRelation();
    });
  }

  declineToRequest() {
    const {
      user: { user }
    } = this.props;
    const { friendUserId, friend } = this.state;

    const { navigation } = this.props;
    const notification = new Notification({ navigation });
    const props2 = { user: user, friend: friend, type: "4", istekTipi: "red" };
    notification.show(props2, navigation);


    console.log("STATE-DECLINE", this.state);
    setDeclineToRequest({
      userId: friendUserId,
      friendUserId: user.id
    }).then((response) => {

    });
  }
  deleteToRequest() {
    const {
      user: { user }
    } = this.props;
    const { friendUserId, friend } = this.state;

    const { navigation } = this.props;
    const notification = new Notification({ navigation });
    const props2 = { user: user, friend: friend, type: "4", istekTipi: "gerialma" };
    notification.show(props2, navigation);


    console.log("STATE-DECLINE", this.state);
    setDeclineToRequest({
      userId: user.id,
      friendUserId: friendUserId
    }).then((response) => {

    });

    setDeclineToRequest({
      userId: friendUserId,
      friendUserId: user.id,
    }).then((response) => {

    }).catch(() => {

    });
  }

  // NOTE: Arkadaşlık durumunu tazeler
  refreshRelation() {
    this.setRelation();
  }

  render() {
    const {
      navigation,
      user: { user }
    } = this.props;
    const {
      userStatus,
      friendStatus,
      friend,
      favoriteCount,
      favorited,
      blocked,
      blockedMe,
      reason,
      reasonDesc
    } = this.state;

    if (!friend) {
      return <Loading />;
    }

    // NOTE: Arkadaşlık isteği onaylanmış ise profil sayfasını gösterir
    if (userStatus === 2 && !blockedMe ) {
      return (
        <Profile
          userStatus={userStatus}
          friendStatus={friendStatus}
          navigation={navigation}
          user={friend}
          friend={user}
          refreshRelation={this.refreshRelation}
          acceptToRequest={this.acceptToRequest}
          //
          declineToRequest={this.declineToRequest}
          deleteToRequest={this.deleteToRequest}
          //
          handleRefreshUserStates={this.handleRefreshUserStates}
          favoriteCount={favoriteCount}
          favorited={favorited}
          blocked={blocked}
        />
      );
    }

    // NOTE: Arakadaşlık isteği henüz onaylanmamış veya gönderilmemiş ise kilitli profil
    // NOTE: Sayfasını gösterir
    return (
      <React.Fragment>
        <ProfileLocked
          userStatus={userStatus}
          friendStatus={friendStatus}
          navigation={navigation}
          friend={friend}
          reason={reason}
          reasonDesc={reasonDesc}
          user={user}
          refreshRelation={this.refreshRelation}
          acceptToRequest={this.acceptToRequest}
          declineToRequest={this.declineToRequest}
          deleteToRequest={this.deleteToRequest}
          handleRefreshUserStates={this.handleRefreshUserStates}
          favoriteCount={favoriteCount}
          favorited={favorited}
          blocked={blocked}
          blockedMe={blockedMe}
        />
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Index;
