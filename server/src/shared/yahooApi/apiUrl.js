export default function yahooApiUrl(symbol) {
  return `http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22${symbol}%22%29&env=store://datatables.org/alltableswithkeys&format=json`;
}
