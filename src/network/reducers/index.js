// reducers/index.js
import { combineReducers } from "redux";

import authDetails from "./auth";
import survayAnalysis from "./survayAnalysis";

const rootReducer = combineReducers({
	authDetails,
	survayAnalysis
});

export default rootReducer;
