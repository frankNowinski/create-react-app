import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (Validator.isNull(data.symbol)) {
    errors.symbol = 'Stock symbol is required';
  }

  if (Validator.isNull(data.shares) || data.shares === 0) {
    errors.shares = 'Must hold at least one share';
  }

  if (!Number.isInteger(Number(data.shares))) {
    errors.shares = 'This field must be a number';
  }

  if (Number(data.shares) < 0) {
    errors.shares = 'Must be a positive integer';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
