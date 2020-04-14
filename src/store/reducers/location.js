import { CHANGE_LOCATION, SET_ADDRESS_FULFILLED } from '../actions/location';

const initialState = {
  latitude: false,
  longitude: false,
  county: null,
  city: null,
  country: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCATION: {
      const { latitude, longitude } = action.payload;

      return {
        ...state,
        latitude,
        longitude
      };
    }
    case SET_ADDRESS_FULFILLED:
      return {
        ...state,
        county : action.payload.county,
        city: action.payload.city,
      };
    default :
    return state;

  }
  
  
};
