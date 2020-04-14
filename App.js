// import React, { Component } from "react";


// import {View} from 'react-native'
// import firebase from "react-native-firebase";


// import { RemoteMessage } from 'react-native-firebase';

// import  { Notification,NotificationOpen } from 'react-native-firebase';


// export default class App extends Component {




// componentDidMount() {
//     this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
//         // Process your message as required
//     });

//     this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
//       // Process your notification as required
//       // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
//   });
//   this.removeNotificationListener = firebase.notifications().onNotification((notification: Notification) => {
//       // Process your notification as required
//   });
//   this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
//     // Get the action triggered by the notification being opened
//     const action = notificationOpen.action;
//     // Get information about the notification that was opened
//     const notification: Notification = notificationOpen.notification;
// });

// }


// async componentDidMount() {
//   const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
//   if (notificationOpen) {
//       // App was opened by a notification
//       // Get the action triggered by the notification being opened
//       const action = notificationOpen.action;
//       // Get information about the notification that was opened
//       const notification: Notification = notificationOpen.notification;
//   }
// }

// componentWillUnmount() {
//     this.messageListener();
//     this.removeNotificationDisplayedListener();
//     this.removeNotificationListener();
//     this.removeNotificationOpenedListener();
// }


//  async componentWillMount() {

//     const fcmToken = await firebase.messaging().getToken();
// if (fcmToken) {
//   console.log(fcmToken)
// } else {
//     // user doesn't have a device token yet
// }

// try {
//   await firebase.messaging().requestPermission();
//   // User has authorised
// } catch (error) {
//   // User has rejected permissions
// }


// const enabled = await firebase.messaging().hasPermission();
// if (enabled) {
//     // user has permissions
// } else {
//     // user doesn't have permission
// }





//   }
//   render() {
//     return (
//       <View style={{ flex: 1 ,justifyContent:'flex-end'}}>

       
//       </View>
//     );
//   }
// }



/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Setup from './src/boot/setup';
import SplashScreen from 'react-native-splash-screen'
import firebase, { messaging } from 'react-native-firebase';
import { View } from 'native-base';
import axios from 'axios';
import {navigate} from './src/services/Navigator'
import PropTypes from 'prop-types';

// import FCM from 'fcm-node';
//import FCM from 'fcm-call';

class App extends Component {

  constructor(props) {
    super(props);


  }


  async componentDidMount() {
    SplashScreen.hide();
   var registrationToken = await firebase.messaging().getToken();
 
    console.log("--------------------------------")
    this.checkPermission();
    // this.createNotificationListeners();
    const fcmToken = await firebase.messaging().getToken();
    console.log("Token :"+fcmToken)
    await this.sendPush()
    console.log("--------------------------------")
  }
  async sendPush() {
    const serverKey = 'AAAAox9Yu7U:APA91bEg7sP6YNUEGbaiNURp7fivK_lcD-WMSHi4Z_0l3zl3-qkw74_hPna384suLXVwJtXunk9RPQXVHU0YQgeVf4RS9XGQBDTD7kWxw95eu-VhLl90xyyypaLv-Dj5rngSNbJYqKte';
    //const referenceKey = 'fhHDrbE70Tk:APA91bEWKlLbtaOsA56wdzM62L-rsQdxWj1XOAuzJHANh4O4UUtZeZjSTrc2PW56OXIrg8Yp7LOYIZ3hbuRY_c_ChcmOQW8K2GGbQFOPfbPBjTavUZH38_f-6yQxeQzyBM-hpfwYLlTi'; //Device Key
    const referenceKey = 'dLekuR5i-9A:APA91bGOT5ipe8rrtnQcjZ5VE9cc3BlBLZn5NafgWelFSSKL0z_LhKTczkWm84GhuPSxppRSHRh_Cny6F8T4-vj9HGNEsDNnKmul6EJ2-npXgtv1g45xD734v53AnYNo7Ouiv3YXpX-2'; //Device Key

    const FIREBASE_API_KEY = serverKey;
    const message = {
      registration_ids: [registrationToken,referenceKey],
      notification: {
        title: "india vs south africa test",
        body: "IND chose to bat",
        "vibrate": 1,
        "sound": 1,
        "show_in_foreground": true,
        "priority": "high",
        "content_available": true,
      },
      data: {
        title: "india vs south africa test",
        body: "IND chose to bat",
        score: 50,
        wicket: 1
      }
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": "key=" + FIREBASE_API_KEY
    });

    let response = await fetch("https://fcm.googleapis.com/fcm/send", { method: "POST", headers, body: JSON.stringify(message) })
    response = await response.json();
    console.log(response);

  }


  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async getToken() {
    try {
      const enabled = await firebase.messaging().hasPermission();
      if (!enabled) {
        await firebase.messaging().requestPermission();
      }

      const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log("got token");
        console.log('fcm token:', fcmToken); //-->use this token from the console to send a post request via postman
        this.setState({ fcmToken });
        return fcmToken;
      }
    } catch (error) {
      console.warn('notification token error', error);
    }
  }
//   async createNotificationListeners() {
//     /*
//     * Triggered when a particular notification has been received in foreground
//     * */
//     this.notificationListener = firebase.notifications().onNotification((notification) => {
//       const { title, body,id,type } = notification;
//       // this.showAlert(title, body);
// console.log("Notification")
// console.log("Type : " + type)
//         console.log("id" + id)
//     });

//     /*
//     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
//     * */
//     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
//       const { title, body,
//         } = notificationOpen.notification;
//       console.log("NotificationOpened Function")
//       console.log(notificationOpen.notification.data)
//       let notificationType = notificationOpen.notification.data.type
//       let userId = notificationOpen.notification.data.id

//         console.log("Type : " + notificationType)
//         console.log("id" + userId)
//       if(notificationType === "0") {
//         console.log("girdi ")
//         // this.props.navigation.navigate('Chat', {  friendId: userId });
//       }
//     });

//     /*
//     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
//     * */
//     const notificationOpen = await firebase.notifications().getInitialNotification();
//     if (notificationOpen) {
//       const { title, body } = notificationOpen.notification;
//       // this.showAlert(title, body);
//     }
//     /*
//     * Triggered for data only payload in foreground
//     * */
//     this.messageListener = firebase.messaging().onMessage((message) => {
//       console.log("firebase Messaging")


//       console.log(JSON.stringify(message));
//     });
//   }
  render() {
 //   return <View />;
    return <Setup />;
  }
}



App.propTypes = {


  navigation: PropTypes.object.isRequired,

};


export default App;
