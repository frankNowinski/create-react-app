import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import request from 'request';
import Stock from '../../models/stock';
import formatUrlForYahooYQL from '../yahooApi/formatUrlForYahooYQL';
import waterfall from 'async/waterfall';
import moment from 'moment';

function symbolAndSharesValid(symbol, shares) {
  return (!isEmpty(symbol) && !isEmpty(shares) && !isNaN(shares) || shares > 0 || shares !== 0)
}

export default function validateAndPersistStock(req, res) {
  const { symbol } = req.body;
  const shares = parseFloat(req.body.shares);
  const dateBought = moment(req.body.dateBought).format('YYYY-MM-DD');
  let userId = req.currentUser.id;
  let errors = {};

  return waterfall([
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
      if (dateBought > moment().format()) {
        errors.dateBought = 'You cannot buy a stock that preceeds today.'
      }
      callback(null, errors)
    },
    function(errors, callback) {
      if (symbolAndSharesValid(symbol, shares)){
        request(formatUrlForYahooYQL(symbol), (error, response, body) => {
          let parseStocks = JSON.parse(body);
          let stockData = parseStocks.query.results.quote;

          if (stockData.Ask !== null && isEmpty(errors)) {
            Stock.forge({
              symbol, shares, userId, dateBought
            }, { hasTimestamps: true }).save().then(stock => {
              stockData.id = stock.attributes.id;
              stockData.shares = stock.attributes.shares;
              stockData.dateBought = dateBought;
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
}
