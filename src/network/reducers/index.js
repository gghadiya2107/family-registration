// reducers/index.js
import { combineReducers } from "redux";

import authDetails from "./auth";
import survayAnalysis from "./survayAnalysis";
import getDistrict from "./getDistrict";
import getMunicipalities from "./getMunicipalities";
import getWard from "./getWard";
import getEconomicStatus from "./economicStatus";

const rootReducer = combineReducers({
	authDetails,
	survayAnalysis,
	getDistrict,
	getMunicipalities,
	getWard,
	getEconomicStatus
});

export default rootReducer;
