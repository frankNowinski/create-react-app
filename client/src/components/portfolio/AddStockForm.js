import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { addStock, addStockToPortfolio } from '../../actions/stockActions';
import validateInput from '../../utils/validations/addStockValidations';
import doesStockExists from '../../utils/validations/stockExistsValidation';

class AddStockForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: '',
      shares: '',
      errors: {},
      isLoading: false,
      invalid: false,
      userId: this.props.user.id
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkStockExists = this.checkStockExists.bind(this);
    this.checkSharesValid = this.checkSharesValid.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.props.addStock(this.state).then(stock => {
        console.log('In the add stock form');
        // this.props.addStockToPortfolio(stock);
      }).catch(err => {
        this.setState({ errors: err.response.data, isLoading: false });
      })
    }
  }

  // this.setState({ errors: {}, isLoading: true });
  // this.props.userSignupRequest(this.state).then(
  //   () => {
  //     this.props.addFlashMessage({
  //       type: 'success',
  //       text: 'You have signed up successfully. Welcome!'
  //     })
  //     this.context.router.push('/');
  //   },
  //   (err) => this.setState({ errors: err.response.data, isLoading: false})
  // );

  checkStockExists(e) {
    const symbol = e.target.value;

    if (symbol !== '') {
      doesStockExists(symbol).then(res => {
        let invalid, errors = this.state.errors, stock = res.data.query.results.quote;

        if (stock.Ask === null) {
          errors.symbol = `${symbol.toUpperCase()} is not a valid stock`;
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
    const shares = Number(e.target.value);

    let invalid, errors = this.state.errors;
    if (shares !== '') {
      if (!Number.isInteger(shares) || shares < 0 || shares === 0){
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

        <div className={classnames("row", { 'has-error': errors.shares })}>
          <label className="col-md-4 lead">Shares</label>

          <input
            type="text"
            name="shares"
            value={this.state.shares}
            className="col-md-5 form-control"
            onChange={this.onChange}
            onBlur={this.checkSharesValid}
          />

          {errors.shares && <span className="help-block">{errors.shares}</span>}
        </div>

        <div className="row text-center">
          <button type="submit" disabled={this.state.invalid} className="btn btn-primary">Add Stock</button>
        </div>
      </form>
    )
  }
}

AddStockForm.propTypes = {
  addStock: React.PropTypes.func.isRequired,
  addStockToPortfolio: React.PropTypes.func.isRequired
}

export default connect(null, { addStock, addStockToPortfolio })(AddStockForm);
