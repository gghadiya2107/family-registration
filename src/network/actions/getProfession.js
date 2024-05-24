// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_PROFESSION_SUCCESS,
    GET_PROFESSION_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
// Action Creators
export const getProfessionSuccess = (data) => ({
	type: GET_PROFESSION_SUCCESS,
	payload: data,
});

export const getProfessionFaliure = (error) => ({
	type: GET_PROFESSION_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getProfession = () => {
	return async (dispatch) => {

		try {
			const response = await apiCall.get(
				`/master-data?status=${encryptData(`true`)}&masterName=${encryptData("profession")}`
			);
			let responseData = decryptData(response?.data?.data)
			dispatch(getProfessionSuccess(responseData));
		} catch (error) {
			dispatch(getProfessionFaliure(error));
		}
	};
};
