import express from 'express';
import jwtDecode from 'jwt-decode';
import config from '../config';
import knex from 'knex'
import authenticate from '../middlewares/authenticate';
import request from 'request';
import yahooApiUrl from '../shared/yahooApi/apiUrl';
import stockHistoryUrl from '../shared/yahooApi/stockHistoryUrl';
import validateAndPersistStock from '../shared/validations/validateAndPersistStock';
import parallel from 'async/parallel';
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
        let stockData = body.query.results.quote;
        stockData = stockData.length === undefined ? [stockData] : stockData;

        for (let i = 0; i < stockSymbols.length; i++) {
          stockData[i].id = stocks[i].id;
          stockData[i].shares = stocks[i].shares;
          stockData[i].dateBought = stocks[i].dateBought;
        }
        res.json(stockData);
      })
    } else {
      res.status(400);
    }
  });
});

router.get('/:id', authenticate, (req, res) => {
  Stock.where({ id: req.params.id }).fetch().then(s => {
    let stock = s.attributes;

    parallel({
      stockData: function(callback) {
        request(yahooApiUrl(stock.symbol), (error, response, body) => {
          let stockData = body.query.results.quote;
          stockData.id = stock.id;
          stockData.shares = stock.shares;
          stockData.dateBought = stock.dateBought;
          callback(null, stockData);
        });
      },
      stockHistory: function(callback) {
        request(stockHistoryUrl(stock.symbol, stock.dateBought), (error, response, body) => {
          callback(null, body.query.results.quote);
        });
      }
    }, function(err, results) {
      results.stockData.stockHistory = results.stockHistory.reverse();
      res.json(results.stockData);
    })
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
