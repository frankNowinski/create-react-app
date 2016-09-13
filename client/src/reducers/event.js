import { CREATE_EVENT } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case CREATE_EVENT:
      console.log(action);
      return state;
    default: return state;
  }
}
