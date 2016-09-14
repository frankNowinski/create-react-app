import React from 'react';

class StockItem extends React.Component {
  render() {
    return (
      <div>
        <span className="lead">{this.props.stock.symbol}</span>
        <button onClick={this.props.deleteStock.bind(this, this.props.index, this.props.stock.id)} className="close"><span>&times;</span></button>
      </div>
    )
  }
}

StockItem.propTypes = {
  index: React.PropTypes.number.isRequired,
  stock: React.PropTypes.object.isRequired
}

export default StockItem;
