import React from 'react';

class StockItem extends React.Component {
  componentWillMount() {
    // console.log('Get stocks');
  }

  render() {
    const dailyGain = this.props.stock.PreviousClose;
    return (
      <a href="#" className="list-group-item list-group-item-action">
      <button onClick={this.props.deleteStock.bind(this, this.props.index, this.props.stock.id)} className="close text-xs-center"><span>&times;</span></button>
        <h5 className="list-group-item-heading text-md-center">{this.props.stock.Name}</h5><hr />

        <div className="row">
          <div className="col-md-5">
            <p className="list-group-item-text">Price: {this.props.stock.Ask}</p>
          </div>

          <div className="col-md-7">
            <p className="list-group-item-text">Percent Change: {this.props.stock.PercentChange}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <p className="list-group-item-text">Shares: {this.props.stock.shares}</p>
          </div>

          <div className="col-md-7">
            <p className="list-group-item-text">Days Gain: {this.props.stock.dailyGain}</p>
          </div>
        </div>
      </a>
    )
  }
}

StockItem.propTypes = {
  index: React.PropTypes.number.isRequired,
  stock: React.PropTypes.object.isRequired
}

export default StockItem;
