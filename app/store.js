import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import reducers from './reducers';

export default function configureStore(initialState) {
  const logger = createLogger();
  const promise = promiseMiddleware();
  const finalCreateStore = applyMiddleware(promise, logger)(createStore);
  const store = finalCreateStore(reducers, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
