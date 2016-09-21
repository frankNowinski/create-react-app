import moment from 'moment';

function getStartDate(dateBought) {
  let startDate;

  if (moment(dateBought).isAfter(moment().subtract(6, "days"))) {
    startDate = moment().subtract(6, "days").format('YYYY-MM-DD');
  } else {
    startDate = moment(dateBought).format('YYYY-MM-DD');
  }
  return startDate;
}

export default function stockHistoryUrl(symbol, dateBought) {
  let endDate = moment().format('YYYY-MM-DD');

  return `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22${symbol}%22%20and%20startDate%20=%20%22${getStartDate(dateBought)}%22%20and%20endDate%20=%20%22${endDate}%22&diagnostics=true&env=store://datatables.org/alltableswithkeys&format=json`
}
