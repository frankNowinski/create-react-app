import express from 'express';
import jwtDecode from 'jwt-decode';
import config from '../config';
import knex from 'knex'
import authenticate from '../middlewares/authenticate';
import request from 'request';
import yahooApiUrl from '../shared/yahooApi/apiUrl';
import validateAndPersistStock from '../shared/validations/validateAndPersistStock';
import Stock from '../models/stock';

let router = express();

router.get('/', authenticate, (req, res) => {
  let userId = req.currentUser.id;
  let counter = 0;
  let finalArr = [];

  Stock.where({userId: userId}).fetchAll({ columns: [ 'id', 'symbol', 'shares', 'dateBought' ]})
  .then(userStocks => {
    let stockSymbols = userStocks.map(stock => stock.attributes.symbol);
    let stocks = userStocks.models.map(stock => stock.attributes);

    if (stockSymbols.length > 0) {
      request(yahooApiUrl(stockSymbols), (error, response, body) => {
        let parseStocks = JSON.parse(body);
        let stockData = parseStocks.query.results.quote;
        stockData = stockData.length === undefined ? [stockData] : stockData;
        let mergeStockData = []

        for (let i = 0; i < stockSymbols.length; i++) {
          console.log(Object.assign(stockData[i], stocks[i]));
          mergeStockData.push(Object.assign(stockData[i], stocks[i]));
        }
        res.json(mergeStockData);
      })
    } else {
      res.status(400);
    }
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
