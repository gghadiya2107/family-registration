// actions/someActions.js
import  { survayAnalysis } from "../api";

import {
    GET_WARD_SUCCESS,
    GET_WARD_FALIURE,
} from "../action_types";
// Action Creators
export const getWardSuccess = (data) => ({
	type: GET_WARD_SUCCESS,
	payload: data,
});

export const getWardFaliure = (error) => ({
	type: GET_WARD_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getWard = (body) => {
	return async (dispatch) => {

		try {
			const response = await survayAnalysis.get(
				`/urban-survey-dashboard/getWards?municipalId=${body?.municipalId}`
			);
			dispatch(getWardSuccess(response.data));
		} catch (error) {
			dispatch(getWardFaliure(error));
		}
	};
};
