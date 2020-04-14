import { CITY_PENDING, CITY_FULFILLED, CITY_REJECTED } from '../actions/city';

const initialState = {
  fetching: false,
  fetched: false,
  list: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CITY_PENDING:
      return {
        ...state,
        fetching: true
      };
    case CITY_FULFILLED:
      return {
        ...state,
        fetched: true,
        list: action.payload
      };
    case CITY_REJECTED:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    default:
      return state;
  }


};
