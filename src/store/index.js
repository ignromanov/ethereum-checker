import {createStore, compose, applyMiddleware} from 'redux'
import rootReducer from "./../reducers";
import logger from './../middlewares/logger'
import etherscanApi from './../middlewares/etherscanApi'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const enhancer = composeEnhancer(applyMiddleware(thunk, routerMiddleware(null), etherscanApi, logger))
  const store = createStore(rootReducer, enhancer);
  
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./../reducers', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }
  
  return store;
};

export default configureStore;