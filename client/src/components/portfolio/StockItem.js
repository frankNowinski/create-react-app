import React from 'react';
import { connect } from 'react-redux';
import { getStock, removeStock } from '../../actions/stockActions';
import { Link } from 'react-router';
import Lens from 'react-lens';
import classnames from 'classnames';
import EditIcon from 'react-icons/lib/ti/edit';
import DeleteIcon from 'react-icons/lib/ti/delete';
import EditStockPage from './EditStockPage';

class StockItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showEditForm: false };
    this.toggleEditStockForm = this.toggleEditStockForm.bind(this);
  }
  onClick(e) {
    e.preventDefault();
    this.props.getStock(this.props.stock.id);
  }
  editStock(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showEditForm: true });
  }
  deleteStock(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.removeStock(this.props.stock.id, this.props.index);
  }
  toggleEditStockForm(e) {
    e.preventDefault();
    this.setState({ showEditForm: false });
  }
  renderStockItem() {
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
              <button onClick={this.editStock.bind(this)} className="close text-xs-center"><EditIcon /></button>
            </div><br />
            <div>
              <button onClick={this.deleteStock.bind(this)} className="close text-xs-center"><DeleteIcon /></button>
            </div>
          </div>
        </div><hr />

        <div className="row text-xs-center">
          <span><strong>Days Gain:{' '}</strong></span>
          <span className={classnames({ 'has-error': this.props.stock.dailyGain < 0, 'success': this.props.stock.dailyGain > 0})}><Lens filter="currency">{this.props.stock.dailyGain}</Lens></span>
        </div>
      </Link>
    )
  }
  render() {
    return (
      <div>
        {this.state.showEditForm ?
          <EditStockPage
            toggleEditStockForm={this.toggleEditStockForm}
            index={this.props.index}
            stock={this.props.stock}
          /> : this.renderStockItem() }
      </div>
    )
  }
}

StockItem.propTypes = {
  index: React.PropTypes.number.isRequired,
  stock: React.PropTypes.object.isRequired,
  getStock: React.PropTypes.func.isRequired
}

export default connect(null, { getStock, removeStock })(StockItem);
