import express from 'express';
import jwtDecode from 'jwt-decode';
import config from '../config';
import knex from 'knex'
import authenticate from '../middlewares/authenticate';
import request from 'request';

import Stock from '../models/stock';

let router = express();

function formatUrlForYahooYQL(symbols) {
  return `http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22${symbols}%22%29&env=store://datatables.org/alltableswithkeys&format=json`;
}

router.get('/', authenticate, (req, res) => {
  let userId = req.currentUser.id;

  // Stock.select('symbol').where('userId', userId).fetchAll().then(symbols => {
  //   console.log(symbols);
  // })

  Stock.where({userId: userId}).fetchAll({ columns: ['id', 'symbol', 'shares'] }).then(function(userStocks) {
    let stockSymbols = userStocks.models.map(stock => {
        return stock.attributes.symbol
    });

    request(formatUrlForYahooYQL(stockSymbols.join('+')), (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let parseStocks = JSON.parse(body);
        let stockData = parseStocks.query.results.quote

        for (let i = 0; i < stockData.length; i++) {
          stockData[i].shares = userStocks.models[i].attributes.shares
          stockData[i].id = userStocks.models[i].attributes.id
        }
        res.json( stockData );
      }
    });

  });

  // Stock.where('userId', userId).fetchAll().then(userStocks => {
  //   res.json( userStocks );
  // }).catch(function(err) {
  //   res.status(401).json({ error: 'Error querying stocks' });
  // });

});

router.post('/', authenticate, (req, res) => {
  const { symbol, shares } = req.body;
  let userId = req.currentUser.id;

  Stock.forge({
    symbol, shares, userId
  }, { hasTimestamps: true }).save()
    .then(stock => res.json( stock ))
    .catch(err => res.status(500).json({ error: err }));
});

router.delete('/:id', authenticate, (req, res) => {
  Stock.query().where('id', req.params.id).del()
  .then(stock => res.json( req.params.id ))
  .catch(err => res.status(500).json({ error: err }));
})

export default router;
