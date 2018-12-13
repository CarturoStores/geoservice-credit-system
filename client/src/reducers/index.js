import { combineReducers } from 'redux';
import userAuthReducer from './userAuthReducer';
// import addressReducer from './addressReducer';
// import creditReducer from './creditReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: userAuthReducer,
  errors: errorReducer
})