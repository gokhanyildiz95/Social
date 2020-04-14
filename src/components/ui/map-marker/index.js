import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'native-base';
import { Marker } from 'react-native-maps';

// Style
import style from './style';

const MapMarker = props => {
  const { lat, long, handlePress, user, text } = props;

   
  return (
    < Marker onPress={() => handlePress(user)} coordinate={{ latitude: lat, longitude: long }}>
      <View style={style.markerContent}>
        <View style={user.gender.id == 1 ? style.markerMan : style.markerWoman}>
          <Text style={style.text}>{user.plates[0].name}</Text>
        </View>
        <View style={style.arrow} />
      </View>
    </Marker >
  );
};

MapMarker.propTypes = {
  user: PropTypes.object.isRequired,
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
  handlePress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default MapMarker;
