import { ADD_STOCK_TO_PORTFOLIO, FETCH_STOCKS, UPDATE_STOCK, REMOVE_STOCK } from '../actions/types';
import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
  switch(action.type) {
    case ADD_STOCK_TO_PORTFOLIO:
      return [...state, action.payload.data];
    case FETCH_STOCKS:
      return action.payload.data.length === undefined ? [action.payload.data] : action.payload.data;
    case UPDATE_STOCK:
      let index;

      state.forEach((stock, i) => {
        if (stock.id === parseInt(action.payload.data.id)) {
          index = i;
        }
      });
      return [
        ...state.slice(0, index),
        state[index] = action.payload.data,
        ...state.slice(index + 1)
      ];
    case REMOVE_STOCK:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    default: return state;
  }
}
