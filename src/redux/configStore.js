import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import bucket from "./modules/bucket";
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const middleware = [thunk];

const enhancer = applyMiddleware(...middleware);

// 리듀서가 여러개일경우 컴바인리듀서를 통해서 함쳐줄수있다
const rootReducer = combineReducers({ bucket });

const store = createStore(rootReducer,enhancer);

export default store;