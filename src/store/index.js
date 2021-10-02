import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {mainReducer} from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = applyMiddleware(thunk);
const store = createStore(
    mainReducer, composeWithDevTools(middleware)
);

export default store;
