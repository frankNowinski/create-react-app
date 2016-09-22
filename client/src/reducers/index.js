import { combineReducers } from 'redux';

import flashMessages from './flashMessages';
import auth from './auth';
import userStocks from './userStocks';
import currentStock from './currentStock';

export default combineReducers({
  flashMessages,
  auth,
  userStocks,
  currentStock
});
