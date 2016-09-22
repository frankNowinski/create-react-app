import express from 'express';
import jwtDecode from 'jwt-decode';
import config from '../config';
import knex from 'knex'
import authenticate from '../middlewares/authenticate';
import request from 'request';
import validateStockExists from '../shared/yahooApi/validateStock';
import validateAndPersistStock from '../shared/validations/validateAndPersistStock';
import Stock from '../models/stock';
import stockHistoryUrl from '../shared/yahooApi/stockHistoryUrl';
import each from 'async/each';

let router = express();

router.get('/', authenticate, (req, res) => {
  let userId = req.currentUser.id;
  let counter = 0;
  let finalArr = [];

  Stock.where({userId: userId}).fetchAll({ columns: [ 'id', 'symbol', 'shares', 'dateBought' ]})
  .then(userStocks => {
    let stockSymbols = userStocks.map(stock => stock.attributes.symbol);
    let stocks = userStocks.models.map(stock => stock.attributes);
    let stockHistoryArray = [];

    each(stocks, (stock, callback) => {
      request(stockHistoryUrl(stock.symbol, stock.dateBought), (errors, response, body) => {
        let parseStocks = JSON.parse(body);
        stock.stockHistory = parseStocks.query.results.quote;
        stockHistoryArray.push(stock);

        if (stockHistoryArray.length === stockSymbols.length) {
          callback(stockHistoryArray);
        }
      })
    }, function(stockHistory) {
      request(validateStockExists(stockSymbols), (error, response, body) => {
        let parseStock = JSON.parse(body);
        let stockData = parseStock.query.results.quote;
        let finalArray = [], mergeStockObjects;

        for (let i = 0; i < stockHistory.length; i++) {
          mergeStockObjects = Object.assign(stockData[i], stockHistory[i]);
          finalArray.push(mergeStockObjects);
        }
        res.json(finalArray);
      })
    })
  });
});

router.get('/:id', authenticate, (req, res) => {
  Stock.where({ id: req.params.id }).fetch().then(stock => {
    res.json(stock)
  })
});

router.post('/', authenticate, (req, res) => {
  validateAndPersistStock(req, res);
});

router.delete('/:id', authenticate, (req, res) => {
  Stock.query().where('id', req.params.id).del()
  .then(stock => res.json(req.params.id))
  .catch(err => res.status(500).json({ error: err }));
});

export default router;
