import { combineReducers } from 'redux';
// Import individual reducers
import * as userReducers from './users/users';

let rootReducer = combineReducers(userReducers);

export default rootReducer;