// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_MUNICIPAL_SUCCESS,
    GET_MUNICIPAL_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
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
			const response = await apiCall.get(
				`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.districtCode)}&masterName=${encryptData("municipal")}`
			);
			let responseData = decryptData(response?.data?.data)

			dispatch(getMunicipalSuccess(responseData));
		} catch (error) {
			dispatch(getMunicipalFaliure(error));
		}
	};
};
