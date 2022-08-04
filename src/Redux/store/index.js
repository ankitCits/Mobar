import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })
const initialState = {}
const middlewareData = [thunk, loggerMiddleware]

const store = createStore(reducer, initialState, compose(applyMiddleware(...middlewareData)))

export default store
