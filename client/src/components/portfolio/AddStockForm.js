import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { doesStockExists } from '../../actions/stockActions';

class AddStockForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: '',
      shares: '',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkStockExists = this.checkStockExists.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // this.props.getStock(this.state.symbol).then(stock => {
    //   if (stock.data.query.results.quote.Ask === null) {
    //     this.setState({ invalid: true });
    //   };
    // });
  }

  checkStockExists(e) {
    const field = e.target.name;
    const symbol = e.target.value;
    if (symbol !== '') {
      this.props.doesStockExists(symbol).then(res => {
        let invalid, errors = this.state.errors, stock = res.data.query.results.quote

        if (stock.Ask === null) {
          errors[field] = `${symbol.toUpperCase()} is not a valid stock`;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false
        }
        this.setState({ errors, invalid });
      })
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit} className="form-inline">
        <div className={classnames("row", { 'has-error': errors.symbol })}>
          <label className="col-md-4 lead">Symbol</label>
          <input
            type="text"
            name="symbol"
            value={this.state.symbol}
            className="col-md-5 form-control"
            onChange={this.onChange}
            onBlur={this.checkStockExists}
          />

          {errors.symbol && <span className="help-block">{errors.symbol}</span>}
        </div><br />

        <div className="row">
          <label className="col-md-4 lead">Shares</label>

          <input
            type="text"
            name="shares"
            value={this.state.shares}
            className="col-md-5 form-control"
            onChange={this.onChange}
          />
        </div>

        <div className="row text-center">
          <button type="submit" disabled={this.state.invalid} className="btn btn-primary">Add Stock</button>
        </div>
      </form>
    )
  }
}

export default connect(null, { doesStockExists })(AddStockForm);
