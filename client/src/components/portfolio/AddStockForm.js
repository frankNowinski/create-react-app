import React from 'react';
import { connect } from 'react-redux';

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
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form-inline">
        <div className="row">
          <label className="col-md-4 lead">Symbol</label>

          <input
            type="text"
            name="symbol"
            value={this.state.symbol}
            className="col-md-5 form-control"
            onChange={this.onChange}
          />
        </div>

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
          <button type="submit" className="btn btn-primary">Add Stock</button>
        </div>
      </form>
    )
  }
}

export default connect(null)(AddStockForm);
