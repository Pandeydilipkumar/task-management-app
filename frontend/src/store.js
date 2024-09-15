import { createStore, combineReducers, applyMiddleware } from 'redux';
import { taskreducers } from './reducers/index';


const reducer = combineReducers({
    taskreducers: taskreducers,
})
export const store = createStore(reducer);