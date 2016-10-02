import React from 'react';
import { connect } from 'react-redux';
import { updateStock } from '../../actions/stockActions';
import classnames from 'classnames';
import moment from 'moment';
import DatePicker from 'react-datepicker';

class EditStockPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.stock.id,
      shares: this.props.stock.shares,
      dateBought: moment(),
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this);
    this.onCalandarChange = this.onCalandarChange.bind(this);
    this.checkSharesValid = this.checkSharesValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
  onCalandarChange(date) {
    this.setState({ dateBought: date });
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });

    this.props.updateStock(this.props.index, this.state).then(stock => {
      this.setState({ shares: '', dateBought: this.state.dateBought, isLoading: false });
    }).catch(err => {
      if (err.response !== undefined) {
        this.setState({ errors: err.response.data, isLoading: false });
      } else {
        this.setState({ isLoading: false });
      }
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="list-group-item list-group-item-action">
        <h5 className="list-group-item-heading text-md-center">{this.props.stock.Name}</h5><hr />

        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className={classnames("form-group", "row", { 'has-error': errors.shares })}>
              <label className="col-sm-4 text-sm-center">Shares</label>
              <div className="col-sm-7">
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
              <label className="col-sm-4 text-sm-center">Date Bought</label>
              <div className="col-sm-7">
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
          </div>

          <div className="row text-xs-center">
            <div className="col-xs-6">
              <button type="submit" disabled={this.state.invalid} className="btn btn-primary">Save</button>
            </div>
            <div className="col-xs-6">
              <button className="btn btn-secondary" onClick={this.props.toggleEditStockForm}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

EditStockPage.propTypes = {
  index: React.PropTypes.number.isRequired,
  stock: React.PropTypes.object.isRequired,
  toggleEditStockForm: React.PropTypes.func.isRequired,
  updateStock: React.PropTypes.func.isRequired
}

export default connect(null, { updateStock })(EditStockPage);
