import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

/**
 * Creates and configures the store
 * @param {initialState} initialState an optional initial state
 * @return {Object} the created store
 */
export default function configureStore(initialState) {
  const logger = createLogger()
  const finalCreateStore = applyMiddleware(promise, logger)(createStore)
  const store = finalCreateStore(reducers, initialState)
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
