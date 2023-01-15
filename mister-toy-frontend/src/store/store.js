import { combineReducers, legacy_createStore as createStore, } from 'redux'

import { toyReducer } from './toy.reducer.js'
import { userReducer } from './user.reducer.js'
import { reviewReducer } from './review.reducer'

// const { createStore, combineReducers } = Redux
const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : () => { }

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    reviewModule: reviewReducer
})

export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
})
