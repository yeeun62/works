// redux
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createAction } from "redux-actions";
// import promiseMiddlerware from "redux-promise";

// middlewares
import thunk from "redux-thunk";

import users from "./modules/users";
import purchase from "./modules/purchase";

// redux router
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

// combineReducers
const appReducer = combineReducers({
	users,
	purchase,
});

const RESET_REDUCER = "root/RESET_REDUCER";

export const resetReducer = createAction(RESET_REDUCER);

const rootReducer = (state, action) => {
	if (action.type === "root/RESET_REDUCER") {
		return appReducer(undefined, action);
	}
	return appReducer(state, action);
};

const env = process.env.REACT_APP_NODE_ENV;
const middlewares = [thunk.withExtraArgument({ history })];

const enhancer =
	env === "development"
		? composeWithDevTools(applyMiddleware(...middlewares))
		: compose(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);
export default store;
