import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView, { Polygon,PROVIDER_GOOGLE } from 'react-native-maps';
import { getAreaCoordinates } from '../../../lib/map';
import { MapMarker } from '../../../components/ui/';

import style from './style';

class Search extends Component {
  handleMarkerPress = user => {
    const { handlePress } = this.props;
    handlePress(user);
  };


  render() {
    const { location, users } = this.props;
    const { latitude, longitude } = location;
    const sqr = getAreaCoordinates({
      latitude,
      longitude
    });



    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4
        }}
        customMapStyle={style.map}
        showsUserLocation
        userLocationAnnotationTitle="06 AC 3312 (Ben)"
      >
        <Polygon coordinates={sqr.polygon} />
        {users.map((marker, index) => (
          <MapMarker
            key={index}
            handlePress={this.handleMarkerPress}
            lat={marker.latitude}
            long={marker.longitude}
            text={marker.fullname}
            user={marker}
          />
        ))}
      </MapView>
    );
  }
}

Search.propTypes = {
  handlePress: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

export default Search;
