import { combineReducers } from 'redux';
import portfolio from './portfolioReducer';
import assets from './assetReducer';
import purchases from './purchaseReducer';
import modals from './modalsReducer';

export default combineReducers({
  portfolio,
  assets,
  purchases,
  modals
});
