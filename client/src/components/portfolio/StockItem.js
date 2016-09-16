import React from 'react';

const StockItem = (props) => {
  return (
    <tr>
      <td>{props.stock.Name}</td>
      <td>{props.stock.Ask}</td>
      <td>{props.stock.PercentChange}</td>
      <td>{props.stock.shares}</td>
      <td>{props.stock.dailyGain}</td>
      <td><button onClick={props.deleteStock.bind(this, props.index, props.stock.id)} className="close text-xs-center"><span>&times;</span></button></td>
    </tr>
  )
}

StockItem.propTypes = {
  index: React.PropTypes.number.isRequired,
  stock: React.PropTypes.object.isRequired
}

export default StockItem;
