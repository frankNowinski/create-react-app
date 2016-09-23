import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import request from 'request';
import Stock from '../../models/stock';
import yahooApiUrl from '../yahooApi/apiUrl';
import stockHistoryUrl from '../yahooApi/stockHistoryUrl';
import parallel from 'async/parallel';
import moment from 'moment';

function validateSymbolAndShares(symbol, shares) {
  return (!isEmpty(symbol) && !isEmpty(shares) && !isNaN(shares) || shares > 0 || shares !== 0)
}

export default function validateAndPersistStock(req, res) {
  const symbol = req.body.symbol;
  const shares = parseFloat(req.body.shares);
  const dateBought = moment(req.body.dateBought).format('YYYY-MM-DD');
  const userId = req.currentUser.id;
  let errors = {};

  parallel({
    alreadyOwned: function(callback) {
      Stock.where({ 'userId': userId }).fetchAll({ columns: ['symbol'] }).then(userStocks => {
        let stockSymbols = userStocks.models.map(stock => stock.attributes.symbol);
        stockSymbols.includes(symbol)
        if (stockSymbols.includes(symbol)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      });
    },
    stockExists: function (callback) {
      request(yahooApiUrl(symbol), (error, response, body) => {
        let parseStock = JSON.parse(body);
        let stockData = parseStock.query.results.quote;
        if (stockData.Ask === null) {
          errors.symbol = 'That stock ticker is invalid';
          callback(null, false);
        } else {
          callback(null, stockData);
        }
      });
    },
    valid: function (callback) {
      if (dateBought > moment().format() || !validateSymbolAndShares(symbol, shares)) {
        callback(null, false)
      } else {
        callback(null, true)
      }
    },
  }, function(errors, results) {
    if (!results.alreadyOwned && results.stockExists !== false && results.valid) {
      let stockData = results.stockExists;

      Stock.forge({
        symbol, shares, userId, dateBought
      }, { hasTimestamps: true }).save().then(stock => {
        results.stockExists.id = stock.attributes.id;
        results.stockExists.shares = stock.attributes.shares;
        results.stockExists.dateBought = stock.attributes.dateBought;
        res.json(results.stockExists);
      });
    } else {
      res.status(400);
    }
  });
}
