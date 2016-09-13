import { combineReducers } from 'redux';

import flashMessages from './flashMessages';
import auth from './auth';
import event from './event';

export default combineReducers({
  flashMessages,
  auth,
  event
});
