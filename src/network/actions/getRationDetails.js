// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_RATION_DETAILS_SUCCESS,
    GET_RATION_DETAILS_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getRationDetailsSuccess = (data) => ({
	type: GET_RATION_DETAILS_SUCCESS,
	payload: data,
});

export const getRationDetailsFaliure = (error) => ({
	type: GET_RATION_DETAILS_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getRationDetails = (value) => {
	return async (dispatch) => {

		try {
			let params = {
				rationCardNo : value,
			}
			const response = await ApiGetNoAuth(`/master-data?`, params);
			// const response = await apiCall.get(
			// 	`/ration/fetch-details?rationCardNo=${encryptData(value)}`
			// );
			// let responseData = decryptData(response?.data?.data)
			dispatch(getRationDetailsSuccess(response));
		} catch (error) {
			dispatch(getRationDetailsFaliure(error?.response?.data?.message));
		}
	};
};
