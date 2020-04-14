import AsyncStorage from '@react-native-community/async-storage';

export const loadState = async store => {
  try {
    // await AsyncStorage.removeItem('@SocialTrafficStore:state');

    const serializedState = await AsyncStorage.getItem('@SocialTrafficStore:state');

    if (serializedState !== null) {
      const decodedState = JSON.parse(serializedState);

      global.AUTH_TOKEN = decodedState.user.token;
      console.log(decodedState)
      console.log("Load StateDe")
      store.dispatch({
        type: 'SET_USER_STATE',
        payload: decodedState.user
      });
    }

    store.dispatch({
      type: 'SET_LOAD_STATE',
      payload: true
    });
  } catch (err) {
    // Ignore Error
  }

  return;
};

export const setState = state => {
  try {
    global.AUTH_TOKEN = state.user.token;
    // console.log(global.AUTH_TOKEN);
    const serializedState = JSON.stringify(state);
    AsyncStorage.setItem('@SocialTrafficStore:state', serializedState);
  } catch (err) {
    // Ignore write erros.
  }
};
