import axios from 'axios';

export function doesStockExists(symbol) {
  return dispatch => {
    return axios.get(`/query?stock=${symbol}`);
  }
}
