// import express from 'express';
// import authenticate from '../middlewares/authenticate';
// import request from 'request';
//
// let router = express();
//
// function formatUrlForYahooYQL(symbol) {
//   return `http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22${symbol}%22%29&env=store://datatables.org/alltableswithkeys&format=json`;
// }
//
// router.get('/', (req, res) => {
//   request(formatUrlForYahooYQL(req.query.stock), (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//       res.send(body);
//     }
//   });
// });
//
// export default router;
