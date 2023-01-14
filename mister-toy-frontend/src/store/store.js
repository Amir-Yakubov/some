import { combineReducers, legacy_createStore as createStore, } from 'redux'

import { userReducer } from './user.reducer.js'
import { toyReducer } from './toy.reducer.js'


// const { createStore, combineReducers } = Redux
const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : () => { }

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer
})

export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
})
