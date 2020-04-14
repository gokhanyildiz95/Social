import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import List from './list';
import Map from './map';
import { getUsers } from '../../../api/user';
import Socket from '../../../api/socket';
import { getAreaCoordinates, isInCoordinate } from '../../../lib/map';
import { setDistanceToUsers } from '../../../lib/user';
import { ScrollView,RefreshControl  } from 'react-native';
import {  Toast} from 'native-base';
import style from './style';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';

import {changeLocation } from '../../../store/actions/location'
// Haritadaki kullanıcıların kaç saniyede bir güncelleneceği değeri
const PER_MINUTE_FOR_GET_USER = 8.5 * 1000;

class TabArea extends Component {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

    this.state = {
      users: [],
      refreshing: false,
    };
  }


  onRefresh () {
    this.setState({refreshing: true});
    this.getUsers();
    this.userInterval = setInterval(() => {
      this.getUsers();
    }, PER_MINUTE_FOR_GET_USER);
        this.setState({refreshing: false});
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
    handleChangeLocation(latLng, user.signedIn);
  };

  componentDidMount() {
    Geolocation.getCurrentPosition(this.locationChangedSuccess);
    Toast.show({
      text: "Sağ üstteki harita ikonu ile harita moduna geçebilirsin.",
      buttonText: "Tamam", 
      buttonStyle: { backgroundColor: "#5cb85c" },
      duration: 30000 
    })
    this.getUsers();
    this.userInterval = setInterval(() => {
      this.getUsers();
    }, PER_MINUTE_FOR_GET_USER);
  }

  componentDidUpdate(prevProps) {
    const {
      location: { latitude, longitude },
      isFocused
    } = this.props;
    const {
      location: { latitude: prevLatitude, longitude: prevLongitude }
    } = prevProps;

    // Lokasyon değişmiş ise kullanıcıları günceller
    if (latitude != prevLatitude && longitude != prevLongitude) {
      this.getUsers();
    }

    if (prevProps.isFocused !== isFocused && isFocused) {
      this.userInterval = setInterval(() => {
        this.getUsers();
      }, PER_MINUTE_FOR_GET_USER);
    }
  }

  // Kullanıcı objesinin idlerini döndürür
  getUserIds = (users, ids = []) => {
    users.map(user => ids.push(user.id));
    return ids;
  };

  // Haritadaki kullanıcıların idlerini döndürür
  getCurrentUserIds = () => {

    const { users } = this.state;
    const { user } = this.props;
    console.log(users)
    console.log("Userimiss")
    console.log(users)
    return this.getUserIds(users, [user.user.id]);
  };

  // Socketten gelen koordinat bilgilerini günceller
  setCoordinateToUser = users => {
    const { users: currentUsers } = this.state;

    _.map(users, user => {
      const currentUserKey = _.findIndex(currentUsers, { id: user.id });
      const currentUser = currentUsers[currentUserKey];
      currentUsers[currentUserKey] = {
        ...currentUser,
        latitude: user.latitude,
        longitude: user.longitude
      };
    });

    // Koordinatların içinde olan kullanıcıları tanımlıyor
    this.setUsersInCoordinate(currentUsers);
  };

  // Kullanıcıya koordinatların güncellenmesi için socket tanımlar
  setSocketToUser(user) {
    let socket;
    try {
      const socketProps = {
        connect: socket => {
          socket.get('/subscribe/user', { ids: [user.id] });
          socket.on('user', this.setCoordinateToUser);
        },
        dispose: () => {}
      };
      socket = new Socket(socketProps);
    } catch (err) {
      // Ignore
      // console.log('socket error', err);
    }

    return socket;
  }

  // Giriş yapmış kullanıcının koordinatları içerisindeki kullanıcıları eler
  setUsersInCoordinate = (users = []) => {
    const { location } = this.props;
    const usersWillAdd = [];

    users.map(user => {
      if (isInCoordinate(user, location)) {
        usersWillAdd.push(user);
        return;
      }

      if (user.socket !== undefined) {
        user.socket.disconnect();
      }
    });

    this.setState(() => ({
      users: usersWillAdd
    }));
  };

  // Giriş yapmış kullanıcının koordinatları içerisindeki kullanıcıları eler
  setUsers = (usersWillAdd = []) => {
    const { users: currentUsers } = this.state;

    if (usersWillAdd.length) {
      usersWillAdd.map(user => {
        user.socket = this.setSocketToUser(user);
        currentUsers.push(user);
      });
    }

    this.setUsersInCoordinate(currentUsers);
  };

  // Alan koordinatlarını tanımlar
  getCoordinates() {

    const {
      location: { latitude, longitude }
    } = this.props;

    console.log(latitude)
    console.log(this.props)
    const { area } = getAreaCoordinates({
      latitude,
      longitude
    });

    return area;
  }

  // Alanın içindeki kullanıcıları getirir
  
  getUsers() {

    const currentUserIds = this.getCurrentUserIds();
    const coordinates = this.getCoordinates();
    console.log(coordinates)
    getUsers({
      where: {
        id: { '!=': currentUserIds },
        latitude: { '>': coordinates.latStart, '<': coordinates.latEnd },
        longitude: { '>': coordinates.longStart, '<': coordinates.longEnd }
      }
    }).then(this.setUsers);
  }

  // Seçilen kullanıcının profil sayfasına yönlendirir
  handlePress(friend) {
    const { navigation } = this.props;
    navigation.navigate('Profile', { friendId : friend.id });
  }

  render() {
    const { users } = this.state;
    const { location, user, viewMode } = this.props;
    const usersWithDistance = setDistanceToUsers(users, location);

    return (
      <React.Fragment>
        {viewMode === 'list' && (
      <ScrollView 
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
      }
      style={style.scrollView}>
          <List
            location={location}
            users={usersWithDistance}
            user={user}
            handlePress={this.handlePress}
          />
                </ScrollView>
        )}
        {viewMode === 'map' && (
          <Map
            location={location}
            users={usersWithDistance}
            user={user}
            handlePress={this.handlePress}
          />
        )}
      </React.Fragment>
    );
  }
}

TabArea.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  viewMode: PropTypes.string.isRequired,
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
)(TabArea);
