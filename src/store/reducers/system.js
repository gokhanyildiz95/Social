const initialState = {
  loadedState: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOAD_STATE':
      return {
        ...state,
        loadedState: action.payload
      };
    default :
    return state;
  }

  
};
