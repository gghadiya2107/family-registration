// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_DISTRICT_SUCCESS,
    GET_DISTRICT_FALIURE,
} from "../action_types";
import {  encryptDataGet } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
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
			let params = {
				status : "true",
				masterName : "district"
			}
			const response = await ApiGetNoAuth(`/master-data?`, params);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&masterName=${encryptData("district")}`
			// );
			// let responseData = decryptData(response?.data?.data)
			dispatch(getDistrictSuccess(response));
		} catch (error) {
			dispatch(getDistrictFaliure(error));
		}
	};
};
