// reducers/index.js
import { combineReducers } from "redux";

import authDetails from "./auth";

const rootReducer = combineReducers({
	authDetails
});

export default rootReducer;
