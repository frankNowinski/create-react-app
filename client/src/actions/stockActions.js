import axios from 'axios';
import { ADD_STOCK_TO_PORTFOLIO, FETCH_STOCKS, GET_STOCK, UPDATE_STOCK, REMOVE_STOCK } from './types';

export function addStock(stock) {
  let newStock = axios.post('/api/stocks', stock);

  return {
    type: ADD_STOCK_TO_PORTFOLIO,
    payload: newStock
  }
}

export function fetchStocks() {
  let userStocks = axios.get('/api/stocks');

  return {
    type: FETCH_STOCKS,
    payload: userStocks
  }
}

export function getStock(id) {
  let request = axios.get(`/api/stocks/${id}`);

  return {
    type: GET_STOCK,
    payload: request
  }
}

export function updateStock(index, stock) {
  let request = axios.put(`/api/stocks/${stock.id}`, stock);

  return {
    type: UPDATE_STOCK,
    payload: request
  }
}

export function removeStock(id, index) {
  axios.delete(`/api/stocks/${id}`);

  return {
    type: REMOVE_STOCK,
    payload: index
  }
}
