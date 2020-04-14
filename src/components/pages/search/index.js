import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, ScrollableTab, Tab, Tabs } from 'native-base';
import { KeyboardAvoidingView, StatusBar, BackHandler } from 'react-native';
import { defaultColors } from '../../../config/style';
import { Footer } from '../../../components/common/';
import Header from './header';
import TabArea from './tab-area';
import TabSearch from './tab-search';
import TabPost from './tab-post';
import { changeUserFullName } from '../../../api/user';
import firebase, { messaging } from 'react-native-firebase';
import {changeLocation} from '../../../store/actions/location'
import style from './style';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewMode: 'list',
      currentTab: 0,
      willRouted : true
    };

    this.handleChangeViewType = this.handleChangeViewType.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handlePressNotification = this.handlePressNotification.bind(this);
  }

  componentWillMount(){
    AsyncStorage.setItem("userLogIn","true");

  }
  handleChangeViewType() {
    const { viewMode } = this.state;
    this.setState({
      ...this.state,
      viewMode: viewMode === 'list' ? 'map' : 'list'
    });
  }

  handlePressNotification() {
    const { navigation } = this.props;

    navigation.navigate('Notification');
  }

  handleChangeTab({ i }) {
    this.setState({
      ...this.state,
      currentTab: i
    });
  }

  async updateFcmToken() {
    const { user } = this.props;
    var registrationToken = await firebase.messaging().getToken();
console.log(registrationToken)
    await changeUserFullName(user.user.id, { fcmToken: registrationToken })
      .then((a) => {
        console.log(" token update ?????????????????")
        console.log(" token update ?????????????????") 
      //  setUserInfo();
      });

  }
  getLocations() {
console.log("girdiiiii")
    changeLocation([this.props.user.user.latitude ,this.props.user.user.longitude],false);

  }
  locationChangedSuccess = position => {
    console.log("Locationa Girdi")
    console.log(position)
    const { user, changeLocation: handleChangeLocation } = this.props;

    const latLng = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    // Kullanıcının lokasyonunu günceller
    //  updateLocation({ latitude: location.latitude, longitude: location.longitude });
    handleChangeLocation(latLng, user.signedIn);
  };


  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.updateFcmToken()



    this.getLocations();
    Geolocation.getCurrentPosition(this.locationChangedSuccess);

   



  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  }

  routeNotification(){

    firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body,
        } = notificationOpen.notification;
      console.log("NotificationOpened Function")
      console.log(notificationOpen.notification.data)
      let notificationType = notificationOpen.notification.data.type
      let userId = notificationOpen.notification.data.id

        console.log("Type : " + notificationType)
        console.log("id" + userId)

      if(notificationType === "0") {

        this.props.navigation.navigate('Chat', {  friendId: userId });
      }else if(notificationType === "1") {
        console.log("gitti mi")
        this.props.navigation.navigate('Profile', { friendId : userId });
      }
    });


    firebase.notifications().getInitialNotification()
    .then((notificationOpen) => {
      if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;  


        console.log("NotificationOpened Function")
        console.log(notificationOpen.notification.data)
        let notificationType = notificationOpen.notification.data.type
        let userId = notificationOpen.notification.data.id
  
          console.log("Type : " + notificationType)
          console.log("id" + userId)
  
        if(notificationType === "0") {
  
          this.props.navigation.navigate('Chat', {  friendId: userId });
        }else if(notificationType === "1") {
          console.log("gitti mi")
          this.props.navigation.navigate('Profile', { friendId : userId });
        }
      
        

      }
    });

  }
 

  render() {
    const { location, navigation, user, notification, isFocused } = this.props;
    const { viewMode, currentTab } = this.state;
    if(this.props.navigation.getParam('routeNavigation') && this.state.willRouted) {
        this.setState({willRouted : false},()=>{
          this.routeNotification()
        })
       
    }
    return (
      <Container>
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="dark-content" />
        <Header
          location={location}
          viewMode={viewMode}
          currentTab={currentTab}
          notification={notification}
          handlePressNotification={this.handlePressNotification}
          handleChangeViewType={this.handleChangeViewType}
        />
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <Tabs
            renderTabBar={() => (
              <ScrollableTab
                style={style.scrollTab}
                tabsContainerStyle={style.scrollTabsContainer}
                underlineStyle={style.tabUnderline}
              />
            )}
            tabBarUnderlineStyle={style.tabBarUnderline}
            onChangeTab={this.handleChangeTab}
          >
            <Tab
              style={style.tabContent}
              tabStyle={[style.tab, style.firstTab]}
              activeTabStyle={style.activeTab}
              textStyle={style.tabText}
              activeTextStyle={style.activeTabText}
              heading="Ara"
            >
              <TabSearch location={location} user={user} navigation={navigation} />
            </Tab>
            <Tab
              style={style.tabContent}
              tabStyle={style.tab}
              activeTabStyle={style.activeTab}
              textStyle={style.tabText}
              activeTextStyle={style.activeTabText}
              heading="Çevremde?"
            >
              <TabArea
                isFocused={isFocused}
                navigation={navigation}
                location={location}
                user={user}
                viewMode={viewMode}
              />
            </Tab>
            <Tab
              style={style.tabContent}
              tabStyle={[style.tab, style.firstTab]}
              activeTabStyle={style.activeTab}
              textStyle={style.tabText}
              activeTextStyle={style.activeTabText}
              heading="Trafiktekiler"
            >
              <TabPost location={location} user={user} navigation={navigation} />
            </Tab>
          </Tabs>
        </KeyboardAvoidingView>
        <Footer />
      </Container>
    );
  }
}

Search.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  changeLocation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  changeLocation,

};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
