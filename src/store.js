import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import machines from './reducers/machines.reducer';

const initialState = {};
const rootReducer = combineReducers({ machines: machines });
const middleware = [thunk];

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
