// actions/someActions.js
import  { survayAnalysis } from "../api";

import {
    GET_DISTRICT_SUCCESS,
    GET_DISTRICT_FALIURE,
} from "../action_types";
// Action Creators
export const getDistrictSuccess = (data) => ({
	type: GET_DISTRICT_SUCCESS,
	payload: data,
});

export const getDistrictFaliure = (error) => ({
	type: GET_DISTRICT_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getDistrict = () => {
	return async (dispatch) => {

		try {
			const response = await survayAnalysis.get(
				`/urban-survey-dashboard/getDistricts`
			);
			dispatch(getDistrictSuccess(response.data));
		} catch (error) {
			dispatch(getDistrictFaliure(error));
		}
	};
};
