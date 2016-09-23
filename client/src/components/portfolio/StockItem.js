import React from 'react';
import { connect } from 'react-redux';
import { getStock } from '../../actions/stockActions';
import { Link } from 'react-router';
import Lens from 'react-lens';
import classnames from 'classnames';

class StockItem extends React.Component {
  onClick(e) {
    e.preventDefault();
    this.props.getStock(this.props.stock.id);
  }

  render() {
    return (
      <Link to="/stocks" onClick={this.onClick.bind(this)} className="list-group-item list-group-item-action">
        <button onClick={this.props.deleteStock.bind(this, this.props.index, this.props.stock.id)} className="close text-xs-center"><span>&times;</span></button>
        <h5 className="list-group-item-heading text-md-center">{this.props.stock.Name}</h5><hr />

        <div className="row">
          <div className="col-md-5">
            <p className="list-group-item-text">Price:{ ' ' }
              <Lens filter="currency">{parseFloat(this.props.stock.Ask)}</Lens>
            </p>
          </div>

          <div className="col-md-7">
            <p className="list-group-item-text">Percent Change:{ ' ' }
              <span className={classnames("list-group-item-text", { 'has-error': parseFloat(this.props.stock.PercentChange) < 0, 'success': parseFloat(this.props.stock.PercentChange) > 0 })}>{parseFloat(this.props.stock.PercentChange).toFixed(2)}%</span>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <p className="list-group-item-text">Shares: {this.props.stock.shares}</p>
          </div>

          <div className="col-md-7">
            <p className="list-group-item-text">Days Gain:{ ' ' }
              <span className={classnames({ 'has-error': this.props.stock.dailyGain < 0, 'success': this.props.stock.dailyGain > 0})}><Lens filter="currency">{this.props.stock.dailyGain}</Lens></span>
            </p>
          </div>
        </div>
      </Link>
    )
  }
}

StockItem.propTypes = {
  index: React.PropTypes.number.isRequired,
  stock: React.PropTypes.object.isRequired,
  getStock: React.PropTypes.func.isRequired
}

export default connect(null, { getStock })(StockItem);
