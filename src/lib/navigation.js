import React from 'react';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'
import {
  Intro,
  Home,
  SideBar,
  Search,
  Notification,
  Message,
  Chat,
  Profile,
  ProfileAdd,
  User,
  Login,
  Register,
  Favorite,
  Plate,
  Connection,
  Permit,
  Password,
  Setting,
  ChangeName,
  Privacy,
  FAQ,
  Contact
} from '../containers/';

const Drawer = createDrawerNavigator(
  {
    Intro: {
      screen: Intro
    },
    Home: {
      screen: Home
    },
    Connection: {
      screen: Connection
    },
    Search: {
      screen: Search
    },
    Message: {
      screen: Message
    },
    User: {
      screen: User
    }
  },
  {
    initialRouteName: 'Intro',
    drawerLockMode: 'locked-closed',
    contentOptions: {
      activeTintColor: '#e91e63'
    },
    contentComponent: props => <SideBar {...props} /> // eslint-disable-line react/display-name
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: {
      screen: Drawer
    },
    Register: {
      screen: Register
    },
    Login: {
      screen: Login
    },
    Chat: {
      screen: Chat
    },
    Profile: {
      screen: Profile
    },
    ProfileAdd: {
      screen: ProfileAdd
    },
    Notification: {
      screen: Notification
    },
    Favorite: {
      screen: Favorite
    },
    Plate: {
      screen: Plate
    },
    Permit: {
      screen: Permit
    },
    Password: {
      screen: Password
    },
    Setting: {
      screen: Setting
    },
    ChangeName: {
      screen: ChangeName
    },
    Privacy: {
      screen: Privacy
    },
    FAQ: {
      screen: FAQ
    },
    Contact: {
      screen: Contact
    }
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none'
  }
);

const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;
