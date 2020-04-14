import getCityList from '../../api/city';

export const CITY_PENDING = 'CITY_PENDING';
export const CITY_FULFILLED = 'CITY_FULFILLED';
export const CITY_REJECTED = 'CITY_REJECTED';

export function getCity() {
  return dispatch => {
    dispatch({
      type: 'CITY',
      payload: getCityList()
    });
  };
}
