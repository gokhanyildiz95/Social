import { combineReducers } from 'redux';

import city from './city';
import location from './location';
import navigation from './navigation';
import notification from './notification';
import user from './user';
import system from './system';

export default combineReducers({
  city,
  location,
  navigation,
  notification,
  user,
  system
});
