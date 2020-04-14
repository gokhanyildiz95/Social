import { updateLocation } from '../../api/user';
import { getGeocode } from '../../api/google-map';
import firebase from 'react-native-firebase';

export const CHANGE_LOCATION = 'CHANGE_LOCATION';
export const SET_ADDRESS_FULFILLED = 'SET_ADDRESS_FULFILLED';

export function changeLocation({ latitude, longitude }, setDataToDb = false) {
  
  console.log("girdiiim")
  try {

    updateLocation({ latitude, longitude });
  } catch (err) {
    console.log('location update');
    //ignore
  }

  return dispatch => {
    dispatch({
      type: CHANGE_LOCATION,
      payload: { latitude, longitude }
    });

    dispatch({
      type: SET_ADDRESS_FULFILLED,
      payload: getGeocode({
        latlng: `${latitude},${longitude}`
      })
    });
  };
}
