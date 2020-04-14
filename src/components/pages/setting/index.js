import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StatusBar, Image, Alert, BackHandler} from 'react-native';
import ImagePicker from '../../../lib/image-picker';
import {
  Container,
  Button,
  Content,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
} from 'native-base';
import {settingSet} from '../../../api/user';

import {defaultColors} from '../../../config/style';
import Header from './header';
import {
  setPermitPicture,
  setDefaultPermitPicture,
} from '../../../api/permit-picture';

import style from './style';

class Setting extends Component {
  constructor(props) {
    super(props);
    const {user, setUserInfo} = this.props;
alert(user.user.settings[0].locate_allow)
    this.state = {
      current: false,
      locate_allow: user.user.settings[0].locate_allow,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    const {navigation} = this.props;
    navigation.goBack();
    return true;
  };

  handleChange() {
    const {user, setUserInfo} = this.props;
    const myUser = user.user;
    console.group('sdfsdfsdfsfsdfsfsd----------------------------');
    console.log(myUser.settings);
    console.groupEnd();
    if (myUser.settings.length == 0) {
      alert('4');

      settingSet({
        userId: myUser.id,
        type: 'connection',
        default: '1',
        locate_allow: 1,
      });
      setUserInfo();
    } else if (myUser.settings[0].default == 1) {
      alert('5');
      settingSet({
        userId: myUser.id,
        type: 'connection',
        default: '0',
        locate_allow: 0,
      });
      setUserInfo();
    } else {
      alert('6');
      settingSet({
        userId: myUser.id,
        type: 'connection',
        default: '1',
        locate_allow: 1,
      });
      setUserInfo();
    }
    /* if(this.state.current) {
      this.setState({
        current:false
      })
      setSetting({ showConnection : false });
    }else{
      this.setState({
        current:true
      })
      setSetting({ showConnection : true });

    } */
  }
  changeLocateAlllow(a) {
    const {user, setUserInfo} = this.props;
    const myUser = user.user;
    settingSet({
      userId: myUser.id,
      locate_allow: !this.state.locate_allow,
    });
    this.setState({locate_allow: !this.state.locate_allow});
    setUserInfo();
  }
  render() {
    const {navigation} = this.props;
    const {user} = this.props;

    return (
      <Container>
        <StatusBar
          translucent
          backgroundColor={defaultColors.bg.dark}
          barStyle="dark-content"
        />
        <Header navigation={navigation} />
        <Content>
          <ListItem style={{margin: 10}} icon>
            <Left>
              <Button style={{backgroundColor: '#FF9501'}}>
                <Icon active name="people" />
              </Button>
            </Left>
            <Body>
              <Text>Bağlantılarımı Gösterme</Text>
            </Body>
            <Right>
              <Switch
                onChange={this.handleChange}
                value={
                  typeof user.user.settings[0].default != 'undefined'
                    ? user.user.settings[0].default === false
                      ? false
                      : true
                    : false
                }
              />
            </Right>
          </ListItem>
          <ListItem style={{margin: 10}} icon>
            <Left>
              <Button style={{backgroundColor: '#FF9501'}}>
                <Icon active name="map" />
              </Button>
            </Left>
            <Body>
              <Text>Konumumu Gösterme</Text>
            </Body>
            <Right>
              <Switch
                onChange={(a) => this.changeLocateAlllow(a)}
                value={this.state.locate_allow}
              />
            </Right>
          </ListItem>
          <ListItem icon onPress={() => navigation.navigate('Password')}>
            <Left>
              <Button style={{backgroundColor: 'blue'}}>
                <Icon active name="key" />
              </Button>
            </Left>
            <Body>
              <Text>Şifremi Unuttum</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={() => navigation.navigate('ChangeName')}>
            <Left>
              <Button style={{backgroundColor: 'blue'}}>
                <Icon active name="person" />
              </Button>
            </Left>
            <Body>
              <Text>İsim ve Soyisim değiştir</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

Setting.propTypes = {
  user: PropTypes.object.isRequired,
  setUserInfo: PropTypes.func.isRequired,
  setSetting: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default Setting;
