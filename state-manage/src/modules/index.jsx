import { combineReducers } from 'redux';
import { cart } from './cart';
import { interest } from './interest';

const rootReducer = combineReducers({
  cart,
  interest,
});

export default rootReducer;
