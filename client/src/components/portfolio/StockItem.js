import React from 'react';
import { connect } from 'react-redux';
import { getStock } from '../../actions/stockActions';
import { Link } from 'react-router';
import Lens from 'react-lens';
import classnames from 'classnames';
import EditIcon from 'react-icons/lib/ti/edit';
import DeleteIcon from 'react-icons/lib/ti/delete';

class StockItem extends React.Component {
  onClick(e) {
    e.preventDefault();
    this.props.getStock(this.props.stock.id);
  }

  render() {
    return (
      <Link to="/stocks" onClick={this.onClick.bind(this)} className="list-group-item list-group-item-action">
        <h5 className="list-group-item-heading text-md-center">{this.props.stock.Name}</h5><hr />

        <div className="row">
          <div className="col-sm-10">
            <div>
              <span>Price:{' '}</span>
              <Lens filter="currency">{parseFloat(this.props.stock.Ask)}</Lens>
            </div>
            <div>
              <span>Shares: </span>{this.props.stock.shares}
            </div>
            <div>
              <span>Percent Change:{' '}</span>
              <span className={classnames("list-group-item-text", "stock-item-input", { 'has-error': parseFloat(this.props.stock.PercentChange) < 0, 'success': parseFloat(this.props.stock.PercentChange) > 0 })}>{parseFloat(this.props.stock.PercentChange).toFixed(2)}%</span>
            </div>
          </div>

          <div className="col-sm-2">
            <div>
              <button className="close text-xs-center"><EditIcon /></button>
            </div><br />
            <div>
              <button onClick={this.props.deleteStock.bind(this, this.props.index, this.props.stock.id)} className="close text-xs-center"><DeleteIcon /></button>
            </div>
          </div>
        </div>
        <hr />
        <div className="row text-xs-center">
          <span><strong>Days Gain:{' '}</strong></span>
          <span className={classnames({ 'has-error': this.props.stock.dailyGain < 0, 'success': this.props.stock.dailyGain > 0})}><Lens filter="currency">{this.props.stock.dailyGain}</Lens></span>
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
