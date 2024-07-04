// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_WARD_SUCCESS,
    GET_WARD_FALIURE,
    GET_UPDATE_MEMBER_HISTORY_SUCCESS,
    GET_UPDATE_MEMBER_HISTORY_FALIURE,
    GET_PARIVAR_NAKAL_SUCCESS,
    GET_PARIVAR_NAKAL_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
import removeEmpty from "@/utils/RemoveEmptyKey";
// Action Creators
export const getparivarnakalSuccess = (data) => ({
	type: GET_PARIVAR_NAKAL_SUCCESS,
	payload: data,
});

export const getparivarnakalFaliure = (error) => ({
	type: GET_PARIVAR_NAKAL_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getparivarnakal = (body) => {
	return async (dispatch) => {

		try {
			
			const response = await ApiGetNoAuth(`/urbanregister/getparivarnakal?`, removeEmpty(body));
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.municipalId)}&masterName=${encryptData("ward")}`
			// );
			// let responseData = decryptData(response?.data?.data)

			dispatch(getparivarnakalSuccess(response));
		} catch (error) {
            console.log("error",error)
			dispatch(getparivarnakalFaliure(error));
		}
	};
};
