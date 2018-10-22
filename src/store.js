import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducerOrders from './reducers/Products';
import reducerAuth from './reducers/Auth'

const reducer = combineReducers({
    store: reducerOrders,
    auth: reducerAuth
})

const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store