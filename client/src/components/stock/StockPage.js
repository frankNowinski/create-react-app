import React from 'react';
import { connect } from 'react-redux';

class StockPage extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.stock.symbol}</div>
        <div>{this.props.stock.shares}</div>
        <div>{this.props.stock.dateBought}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stock: state.currentStock
  }
}

export default connect(mapStateToProps)(StockPage);
