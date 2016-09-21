import Stock from '../../models/stock';
import request from 'request';
import moment from 'moment';

function yahooURL(symbol, startDate, endDate) {
  return `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22${symbol}%22%20and%20startDate%20=%20%22${startDate}%22%20and%20endDate%20=%20%22${endDate}%22&diagnostics=true&env=store://datatables.org/alltableswithkeys&format=json`
};

function setDates(created_at) {
  let endDate = moment().format('YYYY-MM-DD'), startDate;

  if (created_at > moment().subtract(6, "days")) {
    startDate = moment().subtract(6, "days").format('YYYY-MM-DD');
  } else {
    startDate = moment(created_at).format('YYYY-MM-DD');
  }
  return {
    startDate: startDate,
    endDate: endDate
  }
}

export default function fetchStockData(userId) {
  Stock.where({ userId: userId}).fetchAll({ columns: [ 'id', 'symbol', 'shares', 'created_at' ]})
    .then(userStocks => {
      userStocks.models.map(stock => {
        let dateRange = setDates(stock.attributes.created_at);
        request(yahooURL(stock.attributes.symbol, dateRange.startDate, dateRange.endDate), (error, response, body) => {
          // console.log(JSON.parse(body));
          console.log(stock);
        })
      });
    });
}


// Stock.where({userId: userId}).fetchAll({ columns: [ 'id', 'symbol', 'shares', 'created_at' ]})
// .then(userStocks => {
//   let stockSymbols = userStocks.models.map(stock => stock.attributes.symbol);
    // let query = (stockSymbols.join('+'), "2016-09-05", "2016-09-15");
    // if (stockSymbols.length > 0) {
    //   request(query), (error, response, body) => {
    //     console.log(JSON.parse(body));
    //     if (!error && response.statusCode == 200) {
    //       let parseStocks = JSON.parse(body);
    //       let stockData = parseStocks.query.results.quote;
    //       stockData = stockData.length === undefined ? [stockData] : stockData;
    //
    //       for (let i = 0; i < stockData.length; i++) {
    //         stockData[i].shares = userStocks.models[i].attributes.shares
    //         stockData[i].id = userStocks.models[i].attributes.id
    //       }
    //       res.json(stockData);
    //     }
    //   }
      // request(formatUrlForYahooYQL(stockSymbols.join('+')), (error, response, body) => {
      //   if (!error && response.statusCode == 200) {
      //     let parseStocks = JSON.parse(body);
      //     let stockData = parseStocks.query.results.quote;
      //     stockData = stockData.length === undefined ? [stockData] : stockData;
      //
      //     for (let i = 0; i < stockData.length; i++) {
      //       stockData[i].shares = userStocks.models[i].attributes.shares
      //       stockData[i].id = userStocks.models[i].attributes.id
      //     }
      //     res.json(stockData);
      // });
  //   } else {
  //     res.status(500);
  //   }
  // });
  // });
