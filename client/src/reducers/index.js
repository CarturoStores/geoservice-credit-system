import { combineReducers } from 'redux';
import userAuthReducer from './userAuthReducer';
// import addressReducer from './addressReducer';
import profileReducer from './profileReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: userAuthReducer,
  errors: errorReducer,
  profile: profileReducer,
})