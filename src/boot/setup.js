import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store';
import App from '../App';
 
const Setup = () => {
  const preloadedState = {};
  const store = configureStore(preloadedState);
 
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Setup;
