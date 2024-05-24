// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_WARD_SUCCESS,
    GET_WARD_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
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
			const response = await apiCall.get(
				`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.municipalId)}&masterName=${encryptData("ward")}`
			);
			let responseData = decryptData(response?.data?.data)

			dispatch(getWardSuccess(responseData));
		} catch (error) {
			dispatch(getWardFaliure(error));
		}
	};
};
