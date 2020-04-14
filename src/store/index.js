import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reduxPromise from 'redux-promise-middleware';
import { throttle } from 'lodash';
import rootReducers from './reducers';
import { loadState, setState } from './localStorage';
// import UserSocket from './sockets/user';

const configureStore = preloadedState => {
  const store = createStore(
    rootReducers,
    preloadedState,
    applyMiddleware(reduxPromise, thunk, logger)
  );

  store.subscribe(
    throttle(() => {
      setState({
        user: store.getState().user
      });
      // new UserSocket({
      //   store,
      //   user: store.getState().user
      // });
    }, 1000)
  );

  loadState(store);

  return store;
};

export default configureStore;
