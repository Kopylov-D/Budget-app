import { combineReducers } from 'redux';
import authReducer from './auth';
import accountingReducer from './accounting'

export default combineReducers({
  auth: authReducer,
  accounting: accountingReducer,
});
