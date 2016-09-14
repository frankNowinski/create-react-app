import { combineReducers } from 'redux';

import flashMessages from './flashMessages';
import auth from './auth';
import userStocks from './userStocks';

export default combineReducers({
  flashMessages,
  auth,
  userStocks
});
