import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView, { Polygon,PROVIDER_GOOGLE } from 'react-native-maps';
import { getAreaCoordinates } from '../../../lib/map';
import { MapMarker } from '../../../components/ui/';

class Search extends Component {
  constructor(props) {
    super(props);

    const region = this.getRegionCoordinates();
    this.state = {
      region
    };
    this.handleRegionChange = this.handleRegionChange.bind(this);
  }
  componentDidMount(){
    console.log("usersss");
    console.log(this.props.users)
  }

  getRegionCoordinates() {
    const {
      location: { latitude, longitude }
    } = this.props;

    const region = {
      latitude: 38.681842326034534,
      longitude: 27.312735260295796,
      latitudeDelta: 0.4,
      longitudeDelta: 0.4
    };

    if (latitude && longitude) {
      region.latitude = latitude;
      region.longitude = longitude;
    }

    return region;
  }

  handleMarkerPress = user => {
    const { handlePress } = this.props;
    handlePress(user);
  };

  handleRegionChange(region) {
    clearTimeout(this.regionTO);
    this.regionTO = setTimeout(() => {
      this.setState(() => ({ region }));
    }, 2000);
  }

  render() {
    const { location, users } = this.props;
    const { latitude, longitude } = location;
    const { region } = this.state;

    let sqr = false;

    if (latitude && longitude) {
      sqr = getAreaCoordinates({
        latitude,
        longitude
      });
    }

    return (
      <MapView

        style={{ flex: 1 }}
        initialRegion={region}
        showsUserLocation
        userLocationAnnotationTitle="Ben"
        onRegionChange={this.handleRegionChange}
      >
        {sqr && <Polygon coordinates={sqr.polygon} />}
        {users.map((marker, index) => (
          <MapMarker
        
            key={index}
            handlePress={this.handleMarkerPress}
            lat={marker.latitude ?  marker.latitude : 0}
            long={marker.longitude ? marker.longitude : 0}
            text={marker.fullname ? marker.fullname : ''}
            user={marker ? marker : null}
          />
        ))}
      </MapView>
    );
  }
}

Search.propTypes = {
  handlePress: PropTypes.func.isRequired,
  // location: PropTypes.object.isRequired,
  // users: PropTypes.array.isRequired
};

export default Search;
