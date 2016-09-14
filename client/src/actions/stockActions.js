import axios from 'axios';
import { ADD_STOCK_TO_PORTFOLIO } from './types';

export function addStock(stock) {
  // return dispatch => {
  //   return axios.post('/api/stocks', stock);
  // }
  let newStock = axios.post('/api/stocks', stock);

  return {
    type: ADD_STOCK_TO_PORTFOLIO,
    payload: newStock
  }
}
 export function addStockToPortfolio(stock) {
   return {
     stock
   }
 }
