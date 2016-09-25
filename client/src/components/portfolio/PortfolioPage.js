import React from 'react';
import { connect } from 'react-redux';
import { fetchStocks, removeStock } from '../../actions/stockActions';
import AddStockForm from './AddStockForm';
import StocksList from './StocksList';
import TotalDailyReturn from './TotalDailyReturn';
import StockPage from '../stock/StockPage';
import isEmpty from 'lodash/isEmpty';

class PortfolioPage extends React.Component {
  componentWillMount() {
    this.props.fetchStocks();
  }

  deleteStock(index, id) {
    this.props.removeStock(index, id);
  }

  totalReturn() {
    let gains = this.props.userStocks.map(stock => {
      stock.dailyGain = (stock.LastTradePriceOnly - stock.PreviousClose) * stock.shares;
      return stock.dailyGain;
    });
    if (!isEmpty(gains)) {
      return parseFloat(gains.reduce((prev, curr) => prev + curr)).toFixed(2)
    }
  }

  render() {
    return (
      <div className="container">
        <h3 className="text-center display-1">Your Portfolio</h3><hr />

        <div className="col-md-3">
          <div className="row">
            <StocksList
              userStocks={this.props.userStocks}
              deleteStock={this.deleteStock.bind(this)} />
          </div>
        </div>

        <div className="col-md-8">
          <div className="row">
            <AddStockForm userStocks={this.props.userStocks} />
          </div><br />
          <TotalDailyReturn totalReturn={this.totalReturn()} />
          <StockPage />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userStocks: state.userStocks
  }
}

PortfolioPage.propTypes = {
  fetchStocks: React.PropTypes.func.isRequired,
  removeStock: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, { fetchStocks, removeStock })(PortfolioPage);
