import React from 'react';

const StockItem = (props) => {
  return (
    <div>
      <span className="lead">{props.stock.symbol}</span>
      
      <button onClick={props.deleteStock.bind(this, props.index, props.stock.id)} className="close"><span>&times;</span></button>
    </div>
  )
}

StockItem.propTypes = {
  index: React.PropTypes.number.isRequired,
  stock: React.PropTypes.object.isRequired
}

export default StockItem;
