import React from 'react';

const StockItem = (props) => {
  console.log(props.stock);
  return (
    <div className="row">
      <div className="col-md-1">{props.stock.symbol}</div>
      <div className="col-md-1">{props.stock.Ask}</div>
      <div className="col-md-1">{props.stock.Price}</div>
      <div className="col-md-1">{props.stock.PercentChange}</div>
      <div className="col-md-1">{props.stock.YearHigh}</div>
      <div className="col-md-1">{props.stock.OneyrTargetPrice}</div>
      <div className="col-md-1">{props.stock.PERatio}</div>
      <div className="col-md-1">{props.stock.PreviousClose}</div>
      <div className="col-md-1">{props.stock.Volume}</div>
      <div className="col-md-1">{props.stock.shares}</div>

      <button onClick={props.deleteStock.bind(this, props.index, props.stock.id)} className="close col-md-1"><span>&times;</span></button>
    </div>
  )
}

StockItem.propTypes = {
  index: React.PropTypes.number.isRequired,
  stock: React.PropTypes.object.isRequired
}

export default StockItem;
