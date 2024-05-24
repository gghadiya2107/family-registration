// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_QUALIFICATION_SUCCESS,
    GET_QUALIFICATION_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
// Action Creators
export const getQualificationSuccess = (data) => ({
	type: GET_QUALIFICATION_SUCCESS,
	payload: data,
});

export const getQualificationFaliure = (error) => ({
	type: GET_QUALIFICATION_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getQualification = () => {
	return async (dispatch) => {

		try {
			const response = await apiCall.get(
				`/master-data?status=${encryptData(`true`)}&masterName=${encryptData("qualification")}`
			);
			let responseData = decryptData(response?.data?.data)
			dispatch(getQualificationSuccess(responseData));
		} catch (error) {
			dispatch(getQualificationFaliure(error));
		}
	};
};
