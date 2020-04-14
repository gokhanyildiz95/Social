import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Root } from 'native-base';
import FlashMessage from 'react-native-flash-message';
import Geolocation from '@react-native-community/geolocation';
import { updateLocation } from './api/user';

import NavigationContainer from './lib/navigation';
import { changeLocation } from './store/actions/location';
import { setRoute } from './store/actions/navigation';

const GEOLOCATION_TIMEOUT = 30 * 1000;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleNavigationStateChange = this.handleNavigationStateChange.bind(this);
  }


  // componentDidUpdate({ user: prevUser }) {
  //   const { user, location } = this.props;

  //   if (user.token !== prevUser.token && user.token) {
  //     console.log({ latitude: location.latitude, longitude: location.longitude });

  //     setTimeout(() => {
  //       updateLocation({ latitude: location.latitude, longitude: location.longitude });
  //     }, 5000);
  //   }
  // }

  componentDidMount() {
    // eslint-disable-next-line
   // navigator.geolocation.getCurrentPosition(this.locationChangedSuccess);
 Geolocation.getCurrentPosition(this.locationChangedSuccess);
    // eslint-disable-next-line
  // navigator.geolocation.watchPosition(this.locationChangedSuccess, this.locationChangedError, {
   //   timeout: GEOLOCATION_TIMEOUT,
   //   maximumAge: 0
   // });
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

  // Lokasyon güncellenmiş ise bu fonksiyon çalışır
  locationChangedSuccess = position => {
    console.log("Locationa Girdi")
    console.log(position)
    const { user, changeLocation: handleChangeLocation } = this.props;

    const latLng = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    updateLocation({ latitude: latLng.latitude, longitude: latLng.longitude });
    // Kullanıcının lokasyonunu günceller
    handleChangeLocation(latLng, user.signedIn);
  };

  locationChangedError = () => {};

   handleNavigationStateChange(prevState, currentState) {
    const { setRoute } = this.props;
    const route = this.getActiveRouteName(currentState);
    console.log(currentState)
    setRoute(route)

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
  changeLocation: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
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
