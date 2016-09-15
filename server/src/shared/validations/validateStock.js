import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import request from 'request';
import Stock from '../../models/stock';
import formatUrlForYahooYQL from '../yahooApi/getStockData';
import parallel from 'async/parallel';

function validateInput(data) {
  let errors = {};

  if (Validator.isNull(data.body.symbol)) {
    errors.symbol = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default function validateStock(data) {
  const { symbol, shares } = data.body;
  let { errors } = validateInput(data);
  let userId = data.currentUser.id;

  parallel([
    function(callback) {
      Stock.where({ 'userId': userId }).fetchAll({columns: ['symbol']}).then(userStocks => {
        let stockSymbols = userStocks.models.map(stock => stock.attributes.symbol);

        if (stockSymbols.includes(symbol)) {
          errors.symbol = `You already own this stock`;
        };
        callback(null, errors);
      });
    },
    function(callback) {
      request(formatUrlForYahooYQL(symbol), (error, response, body) => {
        let stock = JSON.parse(body);

        if (stock.query.results.quote.Ask === null) {
          errors.symbol = 'Invalid stock';
        }
        callback(null, errors);
      });
    }
  ], function(err, errors) {
    return { errors }
  });
}
