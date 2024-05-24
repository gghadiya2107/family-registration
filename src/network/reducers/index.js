// reducers/index.js
import { combineReducers } from "redux";

import authDetails from "./auth";
import survayAnalysis from "./survayAnalysis";
import getDistrict from "./getDistrict";
import getMunicipalities from "./getMunicipalities";
import getWard from "./getWard";
import getEconomicStatus from "./economicStatus";
import getCategory from "./getCategory";
import getMemberStatus from "./getMemberStatus";
import getQualification from "./getQualification";
import getProfession from "./getProfession";
import getReligion from "./getReligion";
import getGender from "./getGender";

const rootReducer = combineReducers({
	authDetails,
	survayAnalysis,
	getDistrict,
	getMunicipalities,
	getWard,
	getEconomicStatus,
	getCategory,
	getGender,
	getMemberStatus,
	getQualification,
	getProfession,
	getReligion
});

export default rootReducer;
