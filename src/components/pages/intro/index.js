import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-navigation';
import { Container, Text, Spinner  } from 'native-base';
import { View } from 'react-native';
import Socket from '../../../api/socket';
import Notification from '../../../lib/notification';
import AsyncStorage from '@react-native-community/async-storage';

// import style from './style';

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  componentDidUpdate(prevProps) {
    const { user, system } = this.props;
    const { system: prevSystem } = prevProps;

    // Storagedaki state load edildi ise
    if (system.loadedState != prevSystem.loadedState) {
      // Login kontrolü yapılıyor
      this.userLoggedInControl();
    }

    if (user.signedIn) {
      this.notificationSocket();

    }
  }

  // Kullanıcı girişi kontrolü
  userLoggedInControl() {
    const { user, setUserInfo, navigation, setNotifications } = this.props;

    // Giriş yapılmamış ise intro sayfasına gönderir
    console.log("Homa ya da searche")
    console.log(navigation.route)
    if (!user.signedIn) {
     AsyncStorage.getItem("userLogIn").then(res=>{
       if(res === "true") {
        navigation.navigate('Search',{routeNavigation : true});
        return false
       }else {
        navigation.navigate('Home');
        return false;
       }
     })
        //     navigation.navigate('Home');
        // return false;
      console.log("Homa ya da")
 
    }
else {
  console.log("searche")
    // Giriş yapılmış ise bildirimleri ve kullanıcı bilgisini tazeler
    setNotifications({ user: user.user.id });
    setUserInfo();
    // Search sayfasına gönderir
    console.log("searche gircek")
    navigation.navigate('Search');
    return false
}
    // navigation.navigate('User');
  }

  // Anlık bildirimleri günceller
  notificationSocket() {
    if (this.socket && this.socket.connect) {
      return;
    }

    const {
      user: { user },
      navigation,
      setNotifications
    } = this.props;

    const notification = new Notification({ navigation });
    console.log("User bilgisi : ")
    console.log(user)
    this.socket = new Socket({
      connect: socket => {
        // Notification izni için kayıt
        socket.get('/subscribe/notification');
        // Notificationları alır
        socket.on(`notification-receive/${user.id}`, data => {
          const {
            navigationState: { route }
          } = this.props;

          // Notificationları günceller
          console.log("notification niye guncellenmiyorr")
          setNotifications({ user: user.id });
          // Gelen notificationı ekranda gösterir
          notification.show(data, route);
          this.props.setNotifications({ user: this.props.user.user.id });
        });
      }
    });
  }

  render() {
    const { redirect } = this.state;

    return (
      <Container>
        {redirect && <Redirect to={redirect} />}
        <View style={{
          flex:1,
          justifyContent:'center',
          alignItems:'center'
        }}>
                    <Spinner color='blue' />
        </View>
        </Container>
    );
  }
}

Intro.propTypes = {
  system: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  navigationState: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  setUserInfo: PropTypes.func.isRequired,
  setNotifications: PropTypes.func.isRequired
};





export default Intro;
