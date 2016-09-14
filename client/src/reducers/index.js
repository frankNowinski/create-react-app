import { combineReducers } from 'redux';

import flashMessages from './flashMessages';
import auth from './auth';
import stocks from './stocks';

export default combineReducers({
  flashMessages,
  auth,
  stocks
});
