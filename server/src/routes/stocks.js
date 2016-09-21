import express from 'express';
import jwtDecode from 'jwt-decode';
import config from '../config';
import knex from 'knex'
import authenticate from '../middlewares/authenticate';
import request from 'request';
import validateStockExists from '../shared/yahooApi/validateStock';
import validateAndPersistStock from '../shared/validations/validateAndPersistStock';
import Stock from '../models/stock';

let router = express();

router.get('/', authenticate, (req, res) => {
  let userId = req.currentUser.id;

  Stock.where({userId: userId}).fetchAll({ columns: [ 'id', 'symbol', 'shares' ]})
  .then(userStocks => {
    let stockSymbols = userStocks.models.map(stock => stock.attributes.symbol);
    if (stockSymbols.length > 0) {
      request(validateStockExists(stockSymbols.join('+')), (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let parseStocks = JSON.parse(body);
          let stockData = parseStocks.query.results.quote;
          stockData = stockData.length === undefined ? [stockData] : stockData;

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
  validateAndPersistStock(req, res);
});

router.delete('/:id', authenticate, (req, res) => {
  Stock.query().where('id', req.params.id).del()
  .then(stock => res.json( req.params.id ))
  .catch(err => res.status(500).json({ error: err }));
});

export default router;
