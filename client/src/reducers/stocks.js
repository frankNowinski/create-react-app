import { ADD_STOCK_TO_PORTFOLIO } from '../actions/types';

const initialState = {
  usersStocks: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case ADD_STOCK_TO_PORTFOLIO:
    console.log(action.payload);
      return {
        userStocks: [...state, action.payload.stock]
      };
      
    default: return state;
  }
}
