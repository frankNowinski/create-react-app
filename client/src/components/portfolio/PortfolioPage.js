import React from 'react';
import { connect } from 'react-redux';
import { fetchStocks, removeStock } from '../../actions/stockActions';
import AddStockForm from './AddStockForm';
import StocksList from './StocksList';

class PortfolioPage extends React.Component {
  componentWillMount() {
    this.props.fetchStocks();
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('will recieve props');
  // }
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('should componetn update');
  //   return true;
  // }

  deleteStock(index, id) {
    this.props.removeStock(index, id);
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Your Portfolio</h2><hr />

        <div className="col-md-3">
          <AddStockForm />
        </div>

        <div className="col-md-9">
          <h1>Stock Data</h1>

          <ul className="list-group">
            <StocksList
              userStocks={this.props.userStocks}
              deleteStock={this.deleteStock.bind(this)} />
          </ul>
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
