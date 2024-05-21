// actions/someActions.js
import  { survayAnalysis } from "../api";

import {
    GET_MUNICIPAL_SUCCESS,
    GET_MUNICIPAL_FALIURE,
} from "../action_types";
// Action Creators
export const getMunicipalSuccess = (data) => ({
	type: GET_MUNICIPAL_SUCCESS,
	payload: data,
});

export const getMunicipalFaliure = (error) => ({
	type: GET_MUNICIPAL_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getMunicipalities = (body) => {
	return async (dispatch) => {

		try {
			const response = await survayAnalysis.get(
				`/urban-survey-dashboard/getMunicipalities?districtCode=${body?.districtCode}`
			);
			dispatch(getMunicipalSuccess(response.data));
		} catch (error) {
			dispatch(getMunicipalFaliure(error));
		}
	};
};
