// actions/someActions.js
import  { apiCall } from "../api";

import {
    GET_GENDER_SUCCESS,
    GET_GENDER_FALIURE,
    GET_RELATION_SUCCESS,
    GET_RELATION_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
// Action Creators
export const getRelationSuccess = (data) => ({
	type: GET_RELATION_SUCCESS,
	payload: data,
});

export const getRelationFaliure = (error) => ({
	type: GET_RELATION_FALIURE, 
	payload: error,
});


// Async Action to Fetch Data
export const getRelation = () => {
	return async (dispatch) => {

		try {
			const response = await apiCall.get(
				`/master-data?status=${encryptData(`true`)}&masterName=${encryptData("relation")}`
			);
			let responseData = decryptData(response?.data?.data)
			dispatch(getRelationSuccess(responseData));
		} catch (error) {
			dispatch(getRelationFaliure(error));
		}
	};
};
