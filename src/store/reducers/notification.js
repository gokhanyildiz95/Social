import _ from 'lodash';
import {
  NOTIFICATION_FULFILLED,
  READ_NOTIFICATION,
  DELETE_NOTIFICATION
} from '../actions/notification';

const initialState = {
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_FULFILLED: {
      console.log(action,"akstion")
      return {
        ...state,
        list: action.payload
      };
    }
    case 'NOTIFICATION_2_FULFILLED' : {
      return {
        ...state,
        list : action.payload
      }
    }
    
    case READ_NOTIFICATION: {
      const notificationId = action.payload;
      const notificationList = state.list.map(notification => {
        if (notification.id == notificationId) {
          notification.status = 1;
        }
        return notification;
      });

      return {
        ...state,
        list: notificationList
      };
    }
    case DELETE_NOTIFICATION: {
      const notificationId = action.payload;
      const notificationList = _.remove(
        state.list,
        notification => notification.id != notificationId
      );

      return {
        ...state,
        list: notificationList
      };
    }
    default :
    return state;
  }

  
};
