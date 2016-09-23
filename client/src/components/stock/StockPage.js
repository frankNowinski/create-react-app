import React from 'react';
import { connect } from 'react-redux';
import StockChart from './StockChart.js';

class StockPage extends React.Component {

  render() {
    return (
      <div>
        <StockChart stock={this.props.stock}/>
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
