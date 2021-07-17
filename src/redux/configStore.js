import { createStore, combineReducers } from 'redux';
import bucket from "./modules/bucket";
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

// 리듀서가 여러개일경우 컴바인리듀서를 통해서 함쳐줄수있다
const rootReducer = combineReducers({ bucket });

const store = createStore(rootReducer);

export default store;