import React from 'react';
import StockItem from './StockItem';

class StockList extends React.Component {
  renderStocks() {
    console.log(this.props.userStocks);
    return this.props.userStocks.map((stock, index) => {
      console.log(stock.id);
      return (
        <StockItem key={stock.id} stock={stock} index={index} deleteStock={this.props.deleteStock}/>
      )
    })
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Company</th>
            <th>Price</th>
            <th>Percent Change</th>
            <th>Shares</th>
            <th>Daily Gain</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.renderStocks()}
        </tbody>
      </table>
    )
  }
}

export default StockList;
