import React from 'react';
import { connect } from 'react-redux';
import doesStockExists from '../../utils/validations/validateStockExists';

class StockItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = { stock: this.props.stock }
  }

  componentWillMount() {
    doesStockExists(this.props.stock.symbol).then(stock => {
      this.setState={ stock: Object.assign(this.props.stock, stock.data.query.results.quote) };
    })
  }


  render() {
    console.log(this.state);
    return (
      <a href="#" className="list-group-item list-group-item-action">
      <button onClick={this.props.deleteStock.bind(this, this.props.index, this.props.stock.id)} className="close text-xs-center"><span>&times;</span></button>
        <h5 className="list-group-item-heading text-md-center">{this.state.stock.Name}</h5><hr />

        <div className="row">
          <div className="col-md-5">
            <p className="list-group-item-text">Price: {this.state.stock.Ask}</p>
          </div>

          <div className="col-md-7">
            <p className="list-group-item-text">Percent Change: {this.state.stock.PercentChange}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <p className="list-group-item-text">Shares: {this.state.stock.shares}</p>
          </div>

          <div className="col-md-7">
            <p className="list-group-item-text">Days Gain: {this.state.stock.Ask}</p>
          </div>
        </div>
      </a>
    )
  }
}

function mapStateToProps(state) {
  console.log(state);
  return state;
}

StockItem.propTypes = {
  index: React.PropTypes.number.isRequired,
  stock: React.PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(StockItem);
