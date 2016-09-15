import express from 'express';
import jwtDecode from 'jwt-decode';
import config from '../config';
import knex from 'knex'
import authenticate from '../middlewares/authenticate';
import request from 'request';
import isEmpty from 'lodash/isEmpty';
import formatUrlForYahooYQL from '../shared/yahooApi/getStockData';
import waterfall from 'async/waterfall';
import Stock from '../models/stock';

let router = express();

router.get('/', authenticate, (req, res) => {
  let userId = req.currentUser.id;

  Stock.where({userId: userId}).fetchAll({ columns: [ 'id', 'symbol', 'shares' ]})
  .then(userStocks => {
    let stockSymbols = userStocks.models.map(stock => stock.attributes.symbol);
    if (stockSymbols.length > 0) {
      request(formatUrlForYahooYQL(stockSymbols.join('+')), (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let parseStocks = JSON.parse(body);
          let stockData = parseStocks.query.results.quote;

          for (let i = 0; i < stockData.length; i++) {
            stockData[i].shares = userStocks.models[i].attributes.shares
            stockData[i].id = userStocks.models[i].attributes.id
          }
          res.json(stockData);
        }
      });
    } else {
      res.status(500);
    }
  });
});

router.post('/', authenticate, (req, res) => {
  const { symbol, shares } = req.body;
  let userId = req.currentUser.id;
  let errors = {};

  waterfall([
    function(callback) {
      Stock.where({ 'userId': userId }).fetchAll({columns: ['symbol']}).then(userStocks => {
        let stockSymbols = userStocks.models.map(stock => stock.attributes.symbol);
        if (stockSymbols.includes(symbol)) {
          errors.symbol = 'You already own this stock';
        };
        callback(null, errors);
      });
    },
    function(errors, callback) {
      if (!isEmpty(symbol)) {
        request(formatUrlForYahooYQL(symbol), (error, response, body) => {
          let parseStocks = JSON.parse(body);
          let stockData = parseStocks.query.results.quote;

          if (stockData.Ask !== null && isEmpty(errors)) {
            Stock.forge({
              symbol, shares, userId
            }, { hasTimestamps: true }).save().then(stock => {
              stockData.shares = shares;
              stockData.id = stock.attributes.id;
              res.json(stockData);
            })
          } else {
            if (isEmpty(errors)) {
              errors.symbol = 'Invalid stock';
            }
            res.status(400);
          }
        });
      } else {
        res.status(400);
      }
    }
  ]);
});

router.delete('/:id', authenticate, (req, res) => {
  Stock.query().where('id', req.params.id).del()
  .then(stock => res.json( req.params.id ))
  .catch(err => res.status(500).json({ error: err }));
});

export default router;
