// actions/someActions.js
import  { apiCall } from "../api";

import {
    GET_ECONOMIC_STATUS_SUCCESS,
    GET_ECONOMIC_STATUS_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
// Action Creators
export const getEconomicStatusSuccess = (data) => ({
	type: GET_ECONOMIC_STATUS_SUCCESS,
	payload: data,
});

export const getEconomicStatusFaliure = (error) => ({
	type: GET_ECONOMIC_STATUS_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getEconomicStatus = () => {
	return async (dispatch) => {

		try {
			const response = await apiCall.get(
				`/master-data?status=${encryptData(`true`)}&masterName=${encryptData("economicStatus")}`
			);
			let responseData = decryptData(response?.data?.data)
			dispatch(getEconomicStatusSuccess(responseData));
		} catch (error) {
			dispatch(getEconomicStatusFaliure(error));
		}
	};
};
