import { combineReducers } from "redux";
import addresses from './addresses'
import transactions from './transactions'

export default combineReducers({ addresses, transactions });
