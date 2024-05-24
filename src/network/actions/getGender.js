// actions/someActions.js
import  { apiCall } from "../api";

import {
    GET_GENDER_SUCCESS,
    GET_GENDER_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
// Action Creators
export const getGenderSuccess = (data) => ({
	type: GET_GENDER_SUCCESS,
	payload: data,
});

export const getGenderFaliure = (error) => ({
	type: GET_GENDER_FALIURE, 
	payload: error,
});


// Async Action to Fetch Data
export const getGender = () => {
	return async (dispatch) => {

		try {
			const response = await apiCall.get(
				`/master-data?status=${encryptData(`true`)}&masterName=${encryptData("gender")}`
			);
			let responseData = decryptData(response?.data?.data)
			dispatch(getGenderSuccess(responseData));
		} catch (error) {
			dispatch(getGenderFaliure(error));
		}
	};
};
