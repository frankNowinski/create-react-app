import React from 'react';
import StockItem from './StockItem';

class StockList extends React.Component {
  renderStocks() {
    return this.props.userStocks.map((stock, index) => {
      return (
        <div className="list-group" key={stock.id}>
          <StockItem stock={stock} index={index} deleteStock={this.props.deleteStock} />
        </div>
      )
    })
  }

  render() {
    return <div>{this.renderStocks()}</div>
  }
}

export default StockList;
