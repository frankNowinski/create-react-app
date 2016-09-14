import React from 'react';
import StockItem from './StockItem';

class StockList extends React.Component {

  renderStocks() {
    return this.props.userStocks.map((stock, index) => {
      return (
        <li key={stock.id} className="list-group-item">
          <StockItem stock={stock} index={index} deleteStock={this.props.deleteStock}/>
        </li>
      )
    })
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <ul className="list-group">
          { this.renderStocks() }
        </ul>
      </div>
    )
  }
}

export default StockList;
