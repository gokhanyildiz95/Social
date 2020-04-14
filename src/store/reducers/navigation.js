import { SET_ROUTE } from '../actions/navigation';

const initialState = {
  route: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ROUTE: 
      return {
        route: action.payload
      };
    
    default : {
      return state
    }
  }  


};
