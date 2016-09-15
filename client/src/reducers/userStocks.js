import { ADD_STOCK_TO_PORTFOLIO, FETCH_STOCKS, REMOVE_STOCK } from '../actions/types';

export default (state = [], action = {}) => {
  switch(action.type) {
    case ADD_STOCK_TO_PORTFOLIO:
      return [...state, action.payload.data]
    case FETCH_STOCKS:
      return action.payload.data.length === undefined ? [action.payload.data] : action.payload.data;
    case REMOVE_STOCK:
      state.splice(action.payload, 1)
      return [...state];
    default: return state;
  }
}
