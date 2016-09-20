import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (Validator.isNull(data.symbol)) {
    errors.symbol = 'Stock symbol is required';
  }

  if (data.symbol.indexOf(' ') >= 0) {
    errors.symbol = 'Symbol cannot contain a space';
  }

  if (Validator.isNull(data.shares)) {
    errors.shares = 'Must hold at least one share';
  }

  let shares = parseFloat(data.shares);

  if (isNaN(shares) || shares < 0 || shares === 0) {
    errors.shares = 'Must be a positive number';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
