import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Body, Container, Content, View, List, ListItem, Text, Right, Icon } from 'native-base';
import { StatusBar , BackHandler} from 'react-native';
import OptionsMenu from 'react-native-options-menu';

import { defaultColors } from '../../../config/style';
import { Footer } from '../../../components/common/';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Avatar from './avatar';
import { getUserPlate } from '../../../lib/user';

import style from './style';
import AsyncStorage from '@react-native-community/async-storage';

class User extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  }

  logout() {
    const { navigation, userSignOut } = this.props;
    AsyncStorage.removeItem("userLogIn",()=>{
      navigation.navigate('Home');
      userSignOut();
    })
   
  }
  // Options menu render
  renderOptionsMenu() {
    const opts = {
      customButton: <Icon name="more" style={style.moreIcon} />,
      destructiveIndex: 0,
      options: [],
      actions: [() => {}]
    };

    return <OptionsMenu {...opts} />;
  }

  render() {
    const {
      setUserInfo,
      navigation,
      user: { user }
    } = this.props;

    if (!user.profilePictures) {
      return null;
    }

    const plate = getUserPlate(user);
    const optionsMenu = this.renderOptionsMenu();

    return (
      <Container>
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="light-content" />
        <Grid>
          <Row size={50}>
            <View style={style.avatarContent}>
              {/* <View style={style.moreIconTouchableHighlight}>{optionsMenu}</View> */}
              <Avatar large user={user} setUserInfo={setUserInfo} editable />
              <Text style={style.title}>{plate.name}</Text>
              <Text style={style.subTitle}>{user.fullname}</Text>
            </View>
          </Row>
          <Row size={50}>
            <Content style={style.settingsList}>
              <List>
                <ListItem style={style.listItem} onPress={() => navigation.navigate('Plate')}>
                  <Body>
                    <Grid>
                      <Col style={style.listItemFirstCol}>
                        <Icon style={style.settingIcon} name="heart-o" type="FontAwesome" />
                      </Col>
                      <Col>
                        <Text style={style.settingTitle}>Plakalarım</Text>
                        <Text style={style.settingSubTitle}>Araçlarını ekle/çıkar</Text>
                      </Col>
                    </Grid>
                  </Body>
                  <Right>
                    <Icon style={style.rightIcon} name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem style={style.listItem} onPress={() => navigation.navigate('Favorite')}>
                  <Body>
                    <Grid>
                      <Col style={style.listItemFirstCol}>
                        <Icon style={style.settingIcon} name="star-o" type="FontAwesome" />
                      </Col>
                      <Col>
                        <Text style={style.settingTitle}>Favori Plakalar</Text>
                        <Text style={style.settingSubTitle}>Favoriye aldığınız plakalar</Text>
                      </Col>
                    </Grid>
                  </Body>
                  <Right>
                    <Icon style={style.rightIcon} name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem style={style.listItem} onPress={() => navigation.navigate('Permit')}>
                  <Body>
                    <Grid>
                      <Col style={style.listItemFirstCol}>
                        <Icon style={style.settingIcon} name="shield" type="FontAwesome" />
                      </Col>
                      <Col>
                        <Text style={style.settingTitle} >Onaylı Hesap Ol</Text>
                        <Text style={style.settingSubTitle}>
                          Onaylı hesap olarak avantajlardan yararlan
                        </Text>
                      </Col>
                    </Grid>
                  </Body>
                  <Right>
                    <Icon style={style.rightIcon} name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem  onPress={() => navigation.navigate('Setting')} style={style.listItem}>
                  <Body>
                    <Grid>
                      <Col style={style.listItemFirstCol}>
                        <Icon style={style.settingIcon} name="cog" type="FontAwesome" />
                      </Col>
                      <Col>
                        <Text style={style.settingTitle}>Ayarlar</Text>
                        <Text style={style.settingSubTitle}>Uygulama ile ilgili tüm ayarlar</Text>
                      </Col>
                    </Grid>
                  </Body>
                  <Right>
                    <Icon style={style.rightIcon} name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem  onPress={() => navigation.navigate('Privacy')} style={style.listItem}>
                  <Body>
                    <Grid>
                      <Col style={style.listItemFirstCol}>
                        <Icon style={style.settingIcon} name="user-secret" type="FontAwesome" />
                      </Col>
                      <Col>
                        <Text style={style.settingTitle}>Kullanım Şartları ve Gizlilik</Text>
                        <Text style={style.settingSubTitle}>Kullanıcı şartları ve gizlilik hakkında bilgi edinin</Text>
                      </Col>
                    </Grid>
                  </Body>
                  <Right>
                    <Icon style={style.rightIcon} name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem  onPress={() => navigation.navigate('Contact')} style={style.listItem}>
                  <Body>
                    <Grid>
                      <Col style={style.listItemFirstCol}>
                        <Icon style={style.settingIcon} name="paper-plane" type="FontAwesome" />
                      </Col>
                      <Col>
                        <Text style={style.settingTitle}>Bize Ulaş</Text>
                        <Text style={style.settingSubTitle}>Görüşlerin bizim için önemli</Text>
                      </Col>
                    </Grid>
                  </Body>
                  <Right>
                    <Icon style={style.rightIcon} name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem  onPress={() => navigation.navigate('FAQ')} style={style.listItem}>
                  <Body>
                    <Grid>
                      <Col style={style.listItemFirstCol}>
                        <Icon style={style.settingIcon} name="question" type="FontAwesome" />
                      </Col>
                      <Col>
                        <Text style={style.settingTitle}>S.S.S</Text>
                        <Text style={style.settingSubTitle}>Sıkça Sorulan Sorular</Text>
                      </Col>
                    </Grid>
                  </Body>
                  <Right>
                    <Icon style={style.rightIcon} name="arrow-forward" />
                  </Right>
                </ListItem>
                <ListItem style={style.listItem} onPress={this.logout}>
                  <Body>
                    <Grid>
                      <Col style={style.listItemFirstCol}>
                        <Icon style={style.settingIcon} name="power" />
                      </Col>
                      <Col>
                        <Text style={style.settingTitle}>Çıkış Yap</Text>
                        <Text style={style.settingSubTitle}>Hesaptan çıkış yap</Text>
                      </Col>
                    </Grid>
                  </Body>
                  <Right>
                    <Icon style={style.rightIcon} name="arrow-forward" />
                  </Right>
                </ListItem>
              </List>
            </Content>
          </Row>
        </Grid>
        <Footer />
      </Container>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setUserInfo: PropTypes.func.isRequired,
  userSignOut: PropTypes.func.isRequired
};

export default User;
