/* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { addStock } from '../../actions/stockActions';
import validateStock from '../../utils/validations/stockValidations';
import doesStockExists from '../../utils/validations/validateStockExists';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class AddStockForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: '',
      dateBought: moment(),
      shares: '',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this);
    this.onCalandarChange = this.onCalandarChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkStockExists = this.checkStockExists.bind(this);
    this.checkSharesValid = this.checkSharesValid.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onCalandarChange(date) {
    this.setState({ dateBought: date });
  }
  isValid() {
    const { errors, isValid } = validateStock(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.addStock(this.state).then(stock => {
        this.setState({ symbol: '', shares: '', dateBought: moment(), isLoading: false });
        $('#addStock').modal('hide');
      }).catch(err => {
        if (err.response !== undefined) {
          this.setState({ errors: err.response.data, isLoading: false });
        } else {
          this.setState({ isLoading: false });
        }
      });
    }
  }
  checkStockExists(e) {
    const symbol = e.target.value;
    let ownedSymbols = this.props.userStocks.map(stock => stock.symbol);

    if (symbol !== '') {
      doesStockExists(symbol).then(res => {
        let invalid, errors = this.state.errors, stock = res.data.query.results.quote;

        if (stock.Ask === null || symbol.indexOf(' ') >= 0) {
          errors.symbol = `${symbol.toUpperCase()} is not a valid stock`;
          invalid = true;
        } else if (ownedSymbols.includes(symbol)) {
          errors.symbol = `You already own ${symbol.toUpperCase()}`;
          invalid = true;
        } else {
          errors.symbol = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      })
    }
  }
  checkSharesValid(e) {
    const shares = parseFloat(e.target.value);
    let invalid, errors = this.state.errors;

    if (e.target.value !== '') {
      if (isNaN(shares) || shares < 0 || shares === 0){
        errors.shares = 'Must be a positive number';
        invalid = true;
      } else {
        errors.shares = '';
        invalid = errors.symbol === '' || errors.symbol === undefined ? false : true;
      }
      this.setState({ errors, invalid });
    }
  }
  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="row text-md-center">
          <button type="button" className="btn btn-primary btn-md" data-toggle="modal" data-target="#addStock">
          Add Stock
          </button>
        </div>

        <div className="modal fade" id="addStock" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
                <h4 className="modal-title text-md-center" id="myModalLabel">Add a stock to your portfolio</h4>
              </div>

              <div className="modal-body">
                <form onSubmit={this.onSubmit}>
                <div className={classnames("form-group", "row", { 'has-error': errors.symbol })}>
                <label className="col-sm-5 text-sm-center lead">Stock</label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      name="symbol"
                      value={this.state.symbol}
                      className="form-control"
                      onChange={this.onChange}
                      onBlur={this.checkStockExists}
                      placeholder="AAPL"
                    />

                    {errors.symbol && <span className="help-block">{errors.symbol}</span>}
                  </div>
                </div>

                <div className={classnames("form-group", "row", { 'has-error': errors.shares })}>
                  <label className="col-sm-5 text-sm-center lead">Shares</label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      name="shares"
                      value={this.state.shares}
                      className="form-control"
                      onChange={this.onChange}
                      onBlur={this.checkSharesValid}
                      placeholder="10"
                    />

                    {errors.shares && <span className="help-block">{errors.shares}</span>}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-5 text-sm-center lead">Date Bought</label>
                  <div className="col-sm-6">
                    <DatePicker
                      name="startDate"
                      className="form-control datepicker-calandar"
                      value={this.state.dateBought}
                      onChange={this.onCalandarChange}
                      selected={this.state.dateBought}
                      filterDate={this.isWeekday}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" disabled={this.state.invalid} className="btn btn-primary">Add Stock</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddStockForm.propTypes = {
  addStock: React.PropTypes.func.isRequired,
  userStocks: React.PropTypes.array.isRequired
}

export default connect(null, { addStock })(AddStockForm);
