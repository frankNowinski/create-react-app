import axios from 'axios';
import { ADD_STOCK_TO_PORTFOLIO, FETCH_STOCKS, FETCH_STOCK_HISTORY, REMOVE_STOCK } from './types';

function formatYahooURL(symbol, startDate, endDate) {
  return `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22${symbol}%22%20and%20startDate%20=%20%22${startDate}%22%20and%20endDate%20=%20%22${endDate}%22&diagnostics=true&env=store://datatables.org/alltableswithkeys&format=json`
};

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

export function fetchStockHistory(symbol, startDate, endDate) {
    return axios.get(formatYahooURL(symbol, startDate, endDate)).then(res => {
      let stockHistory = [res.data.query.results.quote[0], res.data.query.results.quote[1] ]

      return {
        type: FETCH_STOCK_HISTORY,
        payload: stockHistory
      }
    });
}

export function removeStock(index, id) {
  axios.delete(`/api/stocks/${id}`);
  return {
    type: REMOVE_STOCK,
    payload: index
  }
}
