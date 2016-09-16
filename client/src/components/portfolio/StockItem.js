import React from 'react';

class StockItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { dailyGain: '' };
  }

  render() {
    const dailyGain = this.props.stock.PreviousClose;
    return (
      <tr>
        <td>{this.props.stock.Name}</td>
        <td>{this.props.stock.Ask}</td>
        <td>{this.props.stock.PercentChange}</td>
        <td>{this.props.stock.shares}</td>
        <td>{dailyGain}</td>
        <td><button onClick={this.props.deleteStock.bind(this, this.props.index, this.props.stock.id)} className="close text-xs-center"><span>&times;</span></button></td>
      </tr>
    )
  }
}

StockItem.propTypes = {
  index: React.PropTypes.number.isRequired,
  stock: React.PropTypes.object.isRequired
}

export default StockItem;
