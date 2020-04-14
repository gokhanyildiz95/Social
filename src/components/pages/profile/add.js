import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Text, Icon, View } from 'native-base';
import { TouchableHighlight, StatusBar, ImageBackground } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { defaultColors } from '../../../config/style';
import { Avatar, Button, AddModal } from '../../../components/ui/';
import { setFriendRequest } from '../../../api/friend';


import Notification from '../../../lib/notification';


import style from './style';

class UserAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reasonFormShow: false,
      form: {
        reasonDesc: ''
      }
    };

    this.handleFriendRequest = this.handleFriendRequest.bind(this);
    this.handleReasonFormShow = this.handleReasonFormShow.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  // Ekleme talebini nedeni ile birlikte iletir
  handleFriendRequest(reason) {
    const { form } = this.state;
    const { navigation } = this.props;
    const {
      state: {
        params: { friend, user, refreshRelation }
      }
    } = navigation;
    const friendData = {
      reason,
      reasonDesc: form.reasonDesc,
      userId: user.id,
      friendUserId: friend.id,
      status: 0
    };
    const notification = new Notification({ navigation });


    ///  show(notification, currentPage) {
    const props2 = { user: user, friend: friend, type: "1", reason: "" + reason };
    notification.show(props2, navigation);

    setFriendRequest(friendData).then(friend => {
      if (typeof friend == 'object') {
        // Arkadaşlık durumu güncelleniyor
        console.log(friend,"friend")
        refreshRelation();
        // Profil sayfasına yönlendiriliyor
        navigation.navigate('Profile', { friendId : friend.id });
      }
    });
  }

  // Ekleme sebebi için kulllanılan formu ekranda gösterir
  handleReasonFormShow() {
    this.setState(state => ({
      reasonFormShow: !state.reasonFormShow
    }));
  }

  // Formdan gelen verileri state'e ekler
  handleFormChange(name, text) {
    const { form } = this.state;

    form[name] = text;
    this.setState(() => ({
      form
    }));
  }

  render() {
    const { navigation } = this.props;
    const { reasonFormShow, form } = this.state;
    const {
      state: {
        params: { friend, plate }
      }
    } = navigation;

    return (
      <React.Fragment>
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="light-content" />
        <Container>
          <Grid>
            <Row size={50}>
              <ImageBackground
                style={style.avatarContent}
                source={require('../../../assets/login-bg.png')}
              >
                <View style={[style.avatarContentView, style.avatarContentViewBetween]}>
                  <View style={style.headerGridContent}>
                    <Grid style={style.headerGrid}>
                      <Col size={15}>
                        <TouchableHighlight
                          activeOpacity={0}
                          underlayColor="transparent"
                          style={style.backButton}
                          onPress={() => {
                            navigation.goBack();
                          }}
                        >
                          <Icon name="arrow-back" style={style.backIcon} />
                        </TouchableHighlight>
                      </Col>
                      <Col size={70}>
                        <Text style={style.headerTitle}>Sosyalleşme Sebebiniz? 😊</Text>
                      </Col>
                      <Col size={15} />
                    </Grid>
                  </View>
                  <Avatar large user={friend} />
                  <Text style={style.title}>{plate.name}</Text>
                  <Text style={style.subTitle}>{friend.fullname}</Text>
                </View>
              </ImageBackground>
            </Row>
            <Row size={50} style={style.profileAddArea}>
              <Button
                onPress={() => this.handleFriendRequest(1)}
                extraTextStyle={style.profileButtonTextGrey}
                extraIconStyle={style.profileButtonIcon}
                icon="traffic-light"
                iconType="FontAwesome5"
                color="orangeToYellow"
                bordered
                shadow
                size="xl"
                rounded
                text="Trafik"
              />
              <Button
                onPress={() => this.handleFriendRequest(2)}
                extraTextStyle={style.profileButtonText}
                extraIconStyle={style.profileButtonIcon}
                icon="user-friends"
                iconType="FontAwesome5"
                color="orangeToYellow"
                size="xl"
                rounded
                shadow
                text="Tanışma"
              />
              <Button
                onPress={() => this.handleFriendRequest(3)}
                extraTextStyle={style.profileButtonTextGrey}
                extraIconStyle={style.profileButtonIcon}
                icon="car"
                iconType="FontAwesome5"
                color="orangeToYellow"
                bordered
                size="xl"
                shadow
                rounded
                text="Araba"
              />
              <Button
                onPress={() => this.handleFriendRequest(4)}
                extraTextStyle={style.profileButtonTextGrey}
                extraIconStyle={style.profileButtonIcon}
                icon="share"
                iconType="FontAwesome5"
                color="orangeToYellow"
                bordered
                size="xl"
                shadow
                rounded
                text="Diğer"
              />
            </Row>
          </Grid>
        </Container>
        <AddModal
          label="Ekleme nedeniniz nedir ?"
          name="reasonDesc"
          placeholder="Ekleme nedeni"
          buttonText="Ekle"
          visibility={reasonFormShow}
          value={form.reasonDesc}
          handleFormSubmit={this.handleReasonFormShow}
          handleClose={this.handleReasonFormShow}
          handleFormChange={this.handleFormChange}
        />
      </React.Fragment>
    );
  }
}

UserAdd.defaultProps = {
  navigation: {}
};

UserAdd.propTypes = {
  navigation: PropTypes.object
};

export default UserAdd;
