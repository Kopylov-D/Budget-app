import { combineReducers } from 'redux';
import authReducer from './auth';
import accountingReducer from './accounting'
import statReducer from './stat'

export default combineReducers({
  auth: authReducer,
  accounting: accountingReducer,
  stat: statReducer
});
