import { GET_STOCK } from '../actions/types';

export default (state = {}, action = {}) => {
  switch(action.type) {
    case GET_STOCK:
      return action.payload.data
    default: return state;
  }
}
