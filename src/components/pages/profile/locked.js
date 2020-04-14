import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Text, Icon, View } from 'native-base';
import { StatusBar, ImageBackground, TouchableOpacity, BackHandler } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';

import { defaultColors } from '../../../config/style';
import { Footer } from '../../../components/common/';
import { Avatar, Button, ProfileTabs, ProfileOptions } from '../../../components/ui/';
import { getUserPlate } from '../../../lib/user';

import style from './style';

class ProfileLocked extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const { friend, user, navigation } = this.props;
    if (user.email == friend.email) { 
      navigation.navigate("User")
    }
    else {
      console.log("===================================================")
      console.log(user)
      console.log(friend)
      console.log("===================================================")
    }

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

  // Arkadaş ekle butonu render fonksiyonu
  renderButton() {
    const {
      acceptToRequest,
      declineToRequest,
      deleteToRequest,
      navigation,
      user,
      friend,
      userStatus,
      friendStatus,
      refreshRelation,
      blocked,
      blockedMe
    } = this.props;
    const plate = getUserPlate(friend);
    let props = {
      size: 'xl',
      extraTextStyle: style.buttonText
    };

    // Eğer arkadaşlık isteği gönderilmiş ise
    if (blockedMe) {
      props = {
        ...props,
        color: 'lightGrey',
        text: 'Kullanıcı Sizi Engelledi'
      };

      return <View style={style.buttonView}><Button {...props} /></View>;
    }

    // Eğer arkadaşlık isteği gönderilmiş ise
    if (blocked) {
      props = {
        ...props,
        color: 'lightGrey',
        text: 'Kullanıcı Engelli'
      };

      return <View style={style.buttonView}><Button {...props} /></View>;
    }

    // Eğer arkadaşlık isteği gelmiş ise
    if (friendStatus == 1) {
      props = {
        ...props,
        onPress: acceptToRequest,
        color: 'darkBlueToTurquoise',
        text: 'Onayla'
      };

      props2 = {
        ...props,
        onPress: declineToRequest,
        color: 'orangeToYellow',
        text: 'Reddet'
      };

      return <View style={style.containerButtons}>
        <View style={style.buttonView}><Button {...props} /></View>
        <Text>  </Text>
        <View style={style.buttonView}><Button {...props2} /></View>
      </View>;;
    }

    // Eğer arkadaşlık isteği gönderilmiş ise
    if (userStatus == 1) {
      props = {
        ...props,
        color: 'greenToTurquoise',
        text: 'Ekleme Talebi Gönderildi'
      };

      return <View style={style.buttonView}>
        <Button {...props} />
        {/* <Text></Text>
        <TouchableOpacity
          onPress={deleteToRequest}>
          <Text style={{ textDecorationLine: 'underline', color: '#FFF', textAlign: 'center' }}>
            İsteği iptal et
          </Text>

        </TouchableOpacity> */}
      </View>;
    }

    props = {
      ...props,
      onPress: () => navigation.navigate('ProfileAdd', { friend, plate, user, refreshRelation }),
      color: 'orangeToYellow',
      text: 'Ekle'
    };

    return <View style={style.buttonView}><Button {...props} /></View>;
  }

  render() {
    const {
      friend,
      handleRefreshUserStates,
      favoriteCount,
      favorited,
      blocked,
      blockedMe,
      friendStatus,
      reason,
      navigation,
      reasonDesc,
      deleteToRequest,
      user,
      userStatus,
    } = this.props;
    const plate = getUserPlate(friend);
    const button = this.renderButton();
    console.log("FROMLOCK", friend)
    return (
      <React.Fragment>
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="light-content" />
        <Container>
          <Grid>
            <Row size={75}>
              <ImageBackground
                style={style.avatarContent}
                source={require('../../../assets/login-bg.png')}
              >
                <View style={style.moreIconTouchableHighlight}>
                  <ProfileOptions
                    user={friend}
                    friend={user}
                    deleteToRequest={deleteToRequest}
                    userStatus={userStatus}
                    friendStatus={friendStatus}
                    handleRefresh={handleRefreshUserStates}
                    favorited={favorited}
                    blocked={blocked}
                    blockedMe={blockedMe}
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
                <View style={style.avatarContentViewLocked}>
                  <View style={style.avatarCarouselContentLocked}>
                    <Icon
                      style={friend.permitPictures.length != 0 ? friend.permitPictures[0].default == 1 ? [style.avatarIconsGreen, style.avatarIconLeft] : [style.avatarIcons, style.avatarIconLeft] : [style.avatarIcons, style.avatarIconLeft]}
                      name="shield"
                      type="FontAwesome"
                    />
                    <Avatar xlarge multiple user={friend} />
                    <Icon
                      style={[style.avatarIcons, style.avatarIconRight]}
                      name="shield"
                      type="Foundation"
                    />
                  </View>
                  <Text style={style.title}>{plate.name}</Text>
                  <Text style={style.subTitle}>{friend.fullname}</Text>
                  {button}
                  {friendStatus == 1 && reason == 1 && (
                    <Text style={style.reasonText}>
                      Sosyalleşme sebebi: Trafik 
                    </Text>
                  )}
                  {friendStatus == 1 && reason == 2 && (
                    <Text style={style.reasonText}>Sosyalleşme sebebi: Tanışma</Text>
                  )}
                  {friendStatus == 1 && reason == 3 && (
                    <Text style={style.reasonText}>Sosyalleşme sebebi: Araba</Text>
                  )}
                  {friendStatus == 1 && reason == 4 && (
                    <Text style={style.reasonText}>{reasonDesc}</Text>
                  )}
                  {/* <ProfileTabs favoriteCount={favoriteCount} user={friend} theme="light" /> */}
                </View>
              </ImageBackground>
            </Row>
            <Row size={25} style={style.lockedArea}>
              <Icon name="lock" style={style.lockIcon} />
              <Text style={style.lockText}>İçerikleri görmek için kişiyi ekleyin</Text>
            </Row>
          </Grid>
          <Footer />
        </Container>
      </React.Fragment>
    );
  }
}

ProfileLocked.propTypes = {
  acceptToRequest: PropTypes.func.isRequired,
  declineToRequest: PropTypes.func.isRequired,
  deleteToRequest: PropTypes.func.isRequired,
  setDeclineFriendToRequest: PropTypes.func.isRequired,

  refreshRelation: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  friend: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userStatus: PropTypes.number.isRequired,
  friendStatus: PropTypes.number.isRequired,

  handleRefreshUserStates: PropTypes.func.isRequired,
  favoriteCount: PropTypes.number.isRequired,
  favorited: PropTypes.bool.isRequired,
  blocked: PropTypes.bool.isRequired,
  blockedMe: PropTypes.bool.isRequired,
  reason: PropTypes.number.isRequired,
  reasonDesc: PropTypes.string.isRequired,

};

export default ProfileLocked;
