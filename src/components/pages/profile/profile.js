import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Text, View, Icon } from 'native-base';
import { StatusBar, ImageBackground, ScrollView, TouchableOpacity, BackHandler, Dimensions } from 'react-native';

import { getUsers } from '../../../api/user';
import { defaultColors } from '../../../config/style';
import { Footer } from '../../../components/common/';
import { Row, Grid } from 'react-native-easy-grid';
import { Avatar, Button, UserCard, ProfileTabs, ProfileOptions } from '../../../components/ui/';
import { getUserPlate } from '../../../lib/user';

import style from './style';
import { TouchableHighlight } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('window');

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: []
    };
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this.setUserFriends();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

  }


  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
    return true;
  }

  async setUserFriends() {
    const { user } = this.props;
    const userIds = user.friends.map(data => data.friendUserId);
    const users = await getUsers({ where: { id: userIds } });

    this.setState(() => ({ friends: users }));
  }

  // Seçilen kullanıcının profil sayfasına yönlendirir
  handlePress(friend) {
    const { navigation } = this.props;
    navigation.push('Profile', { friendId : friend.id });
  }

  // Arkadaş ekle butonu render fonksiyonu
  renderButton() {
    const { acceptToRequest, friendStatus, navigation, user } = this.props;
    let props = {
      size: 'xl',
      extraTextStyle: style.buttonText
    };

    // Eğer arkadaşlık isteği gelmiş ise
    if (friendStatus == 1) {
      props = {
        ...props,
        onPress: acceptToRequest,
        color: 'darkBlueToTurquoise',
        text: 'İsteği Onayla'
      };

      return <Button {...props} />;
    }

    props = {
      ...props,
      onPress: () => {
        // navigation.navigate('Chat', { friend: user })
        navigation.navigate('Chat', {  friendId: user.id });
      },
      color: 'darkBlueToTurquoise',
      text: 'Mesaj At'
    };

    return <Button {...props} />;
  }




  render() {
    const button = this.renderButton();
    const { friends } = this.state;
    const { user, handleRefreshUserStates, friend,
      favoriteCount, navigation, favorited, userStatus, friendStatus, blocked, blockedMe, deleteToRequest } = this.props;
    const plate = getUserPlate(user);

    return (
      <React.Fragment>
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="light-content" />
        <Container>
          <Grid>
            <Row size={height > 600 ? 50 : 52}>
              <ImageBackground
                style={style.avatarContent}
                source={require('../../../assets/login-bg.png')}
              >
                <View style={style.moreIconTouchableHighlight}>

                  <ProfileOptions
                    user={user}
                    friend={friend}
                    handleRefresh={handleRefreshUserStates}
                    favorited={favorited}
                    blocked={blocked}
                    blockedMe={blockedMe}
                    deleteToRequest={deleteToRequest}


                    userStatus={userStatus}
                    friendStatus={friendStatus}

                  />

                </View>
                <View style={style.backIconTouchableHighlight}>
                  <TouchableOpacity onPress={() => navigation.goBack()}><Icon style={
                    {
                      color: "#fff",
                    }}
                    type="FontAwesome" name="arrow-left" />
                  </TouchableOpacity>
                </View>

                <View style={style.avatarContentView}>
                  <Avatar xlarge user={user} />
                  <Text style={style.title}>{plate.name}</Text>
                  <Text style={style.subTitle}>{user.fullname}</Text>
                  <View style={[style.buttonView, style.messageButtonView]}>{button}</View>
                </View>
              </ImageBackground>
            </Row>
            <Row size={height > 600 ? 50 : 48} style={style.listContent}>
              <View style={style.tabContent}>
                {/*  <ProfileTabs favoriteCount={favoriteCount} user={user} theme="dark" /> */}
              </View>
              <ScrollView style={style.scrollView}>
                <View style={style.scrollViewContent}>
                  {user.settings[0].default != 1 ? friends.map(friend => (
                    <UserCard key={friend.id} user={friend} handlePress={this.handlePress} />
                  )) : <Text style={{ textAlign: 'center', color: "grey" }}>Üzgünüm, bağlantılar kullanıcı tarafından gizlendi.</Text>}
                </View>
              </ScrollView>
            </Row>
          </Grid>
          <Footer />
        </Container>
      </React.Fragment>
    );
  }
}

Profile.propTypes = {
  acceptToRequest: PropTypes.func.isRequired,
  declineToRequest: PropTypes.func.isRequired,
  deleteToRequest: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  friend: PropTypes.object.isRequired,
  friendStatus: PropTypes.number.isRequired,
  userStatus: PropTypes.number.isRequired,
  refreshRelation: PropTypes.func.isRequired,

  handleRefreshUserStates: PropTypes.func.isRequired,
  favoriteCount: PropTypes.number.isRequired,
  favorited: PropTypes.bool.isRequired,
  blocked: PropTypes.bool.isRequired
};

export default Profile;
