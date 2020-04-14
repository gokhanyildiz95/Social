export const SET_ROUTE = 'SET_ROUTE';

export function setRoute(route) {
  return dispatch => {
    dispatch({
      type: SET_ROUTE,
      payload: route
    });
  };
}
