import { ADD_STOCK_TO_PORTFOLIO, FETCH_STOCKS, FETCH_STOCK_HISTORY, REMOVE_STOCK } from '../actions/types';

export default (state = [], action = {}) => {
  switch(action.type) {
    case ADD_STOCK_TO_PORTFOLIO:
      return [...state, action.payload.data];
    case FETCH_STOCKS:
    console.log('user stocks action');
      return action.payload.data.length === undefined ? [action.payload.data] : action.payload.data;
    case FETCH_STOCK_HISTORY:
      // console.log(state);
      console.log(action.payload);
      return [...state]
    case REMOVE_STOCK:
      state.splice(action.payload, 1)
      return [...state];
    default: return state;
  }
}
