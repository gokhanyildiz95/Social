import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Root } from 'native-base';
import { PermissionsAndroid ,} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { updateLocation } from './api/user';
import Geolocation from '@react-native-community/geolocation';

import NavigationContainer from './lib/navigation';
import { changeLocation } from './store/actions/location';
import { setRoute } from './store/actions/navigation';
import firebase from 'react-native-firebase';

const GEOLOCATION_TIMEOUT = 30 * 1000;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleNavigationStateChange = this.handleNavigationStateChange.bind(this);
  }

 async componentDidMount() {
    this.requestLocationPermission();
    const fcmToken = await firebase.messaging().getToken();
    this.setState({ fcmToken: fcmToken });
  }

  componentDidUpdate({ user: prevUser }) {
    const { user, location } = this.props;

    if (user.token !== prevUser.token && user.token) {
      console.log({ latitude: location.latitude, longitude: location.longitude });

      setTimeout(() => {
        updateLocation({ latitude: location.latitude, longitude: location.longitude });
      }, 5000);
    }
  }

  // Aktif screen name2i getirir
  getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return this.getActiveRouteName(route);
    }
    return route.routeName;
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(this.locationChangedSuccess);

        // // eslint-disable-next-line
        // navigator.geolocation.getCurrentPosition(this.locationChangedSuccess);

        // // eslint-disable-next-line
        // navigator.geolocation.watchPosition(
        //   this.locationChangedSuccess,
        //   this.locationChangedError,
        //   {
        //     timeout: GEOLOCATION_TIMEOUT,
        //     maximumAge: 0
        //   }
        // );

        return;
      }
    } catch (err) {
      // ignore
    }

    setTimeout(() => {
      this.requestLocationPermission();
    }, 20000);
  };

  // Lokasyon güncellenmiş ise bu fonksiyon çalışır
  locationChangedSuccess = position => {
    const { user, changeLocation: handleChangeLocation } = this.props;

    const latLng = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    // Kullanıcının lokasyonunu günceller
    handleChangeLocation(latLng, user.signedIn);
  };

  locationChangedError = () => {};

handleNavigationStateChange(prevState, currentState) {
    const { setRoute } = this.props;
    console.log(currentState,"current State")
    console.log(this.props,"current props")
    const route = this.getActiveRouteName(currentState);

setRoute(route)
    // Geolocation.getCurrentPosition(this.locationChangedSuccess);
  }

  render() {
    return (
      <Root>
        <NavigationContainer onNavigationStateChange={this.handleNavigationStateChange} />
        <FlashMessage />
      </Root>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  changeLocation: PropTypes.func.isRequired,
  setRoute: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  location: state.location
});

const mapDispatchToProps = {
  changeLocation,
  setRoute
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
