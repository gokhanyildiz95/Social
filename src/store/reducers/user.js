import {
  USER_INFO_FULFILLED,
  SIGNUP_PENDING,
  SIGNUP_FULFILLED,
  SIGNUP_REJECTED,
  SIGNIN_PENDING,
  SIGNIN_FULFILLED,
  SIGNIN_REJECTED,
  SET_SETTING
} from '../actions/user';

const initialState = {
  signingUp: false,
  signedUp: false,
  signupError: null,
  signingIn: false,
  signedIn: false,
  signInError: null,
  user: {},
  token: null,
  setting: {
    showConnection:true
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_PENDING:
      return {
        ...state,
        signingUp: true
      };
    case SIGNUP_FULFILLED: {
      const { user, token } = action.payload;

      return {
        ...state,
        signedUp: true,
        signedIn: true,
        signingUp: false,
        user,
        token
      };
    }
    case SIGNUP_REJECTED:
      return {
        ...state,
        signingUp: false,
        signUpError: action.payload
      };
    case SIGNIN_PENDING:
      return {
        ...state,
        signingIn: true
      };
    case SIGNIN_FULFILLED: {
      const { user, token } = action.payload;

      return {
        ...state,
        signedIn: true,
        signingIn: false,
        user,
        token
      };
    }
    case SIGNIN_REJECTED:
      return {
        ...state,
        signingIn: false,
        signInError: action.payload
      };
    case USER_INFO_FULFILLED:
      return {
        ...state,
        user: action.payload
      };
    case 'SET_PLATES':
      state.user.plates = action.payload;
      return {
        ...state
      };
    case 'CLEAR_SIGNIN_ERROR':
      return {
        ...state,
        signInError: null
      };
    case 'SIGNOUT':
      return {
        ...state,
        signingUp: false,
        signedUp: false,
        signupError: null,
        signingIn: false,
        signedIn: false,
        signInError: null,
        user: {},
        setting: {
          showConnection:true
        }
      };
    case 'SET_USER_STATE':
      return {
        ...state,
        ...action.payload
      };
    case SET_SETTING:
    console.log(action.payload);
      return {
        ...state,
         setting:action.payload
      }
      default: 
      return state;
  }

  
};
