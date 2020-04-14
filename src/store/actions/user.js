import { getUserInfo, signUp, signIn } from '../../api/user';
export const USER_INFO_FULFILLED = 'USER_INFO_FULFILLED';
export const SIGNUP_PENDING = 'SIGNUP_PENDING';
export const SIGNUP_FULFILLED = 'SIGNUP_FULFILLED';
export const SIGNUP_REJECTED = 'SIGNUP_REJECTED';
export const SIGNIN_PENDING = 'SIGNIN_PENDING';
export const SIGNIN_FULFILLED = 'SIGNIN_FULFILLED';
export const SIGNIN_REJECTED = 'SIGNIN_REJECTED';

export const SET_SETTING = 'SET_SETTING';


export function clearUserSignInError() {
  return dispatch => {
    dispatch({
      type: 'CLEAR_SIGNIN_ERROR'
    });
  };
}

export function userSignUp(params) {
  return dispatch => {
    dispatch({
      type: 'SIGNUP',
      payload: signUp(params)
    });
  };
}

export function userSignOut() {
  return dispatch => {
    dispatch({
      type: 'SIGNOUT'
    });
  };
}

export function setUserPlates(plates = []) {
  return dispatch => {
    dispatch({
      type: 'SET_PLATES',
      payload: plates
    });
  };
}

export function setUserInfo() {
  return dispatch => {
    dispatch({
      type: 'USER_INFO',
      payload: getUserInfo()
    });
  };
}

export function userSignIn(params) {
  return dispatch => {
    dispatch({
      type: 'SIGNIN',
      payload: signIn(params)
    });
  };
}

export function setSetting(params) {
  return dispatch => {
    dispatch({
      type: 'SET_SETTING',
      payload: params
    });
  };
}
