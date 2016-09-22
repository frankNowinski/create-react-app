import React from 'react';
import { connect } from 'react-redux';
import { fetchStocks, removeStock } from '../../actions/stockActions';
import AddStockForm from './AddStockForm';
import StocksList from './StocksList';
import StockPage from '../stock/StockPage';

class PortfolioPage extends React.Component {
  componentWillMount() {
    this.props.fetchStocks();
  }

  deleteStock(index, id) {
    this.props.removeStock(index, id);
  }

  render() {
    return (
      <div className="container">
        <h3 className="text-center display-1">Your Portfolio</h3><hr />

        <div className="col-md-4">
          <div className="row">
            <AddStockForm userStocks={this.props.userStocks} />
          </div><br />

          <div className="row">
            <StocksList
              userStocks={this.props.userStocks}
              deleteStock={this.deleteStock.bind(this)} />
          </div>
        </div>

        <div className="col-md-8">
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
