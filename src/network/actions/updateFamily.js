// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    GET_FAMILY_BY_ID_SUCCESS,
    GET_FAMILY_BY_ID_FALIURE,
    UPDATE_FAMILY_SUCCESS,
    UPDATE_FAMILY_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataGet, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiGetNoAuth, ApiPostNoAuth } from "../apiData";
// Action Creators
export const updateFamilySuccess = (data) => ({
	type: UPDATE_FAMILY_SUCCESS,
	payload: data,
});

export const updateFamilyFaliure = (error) => ({
	type: UPDATE_FAMILY_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const updateFamily = (family_id, body, extraUpdate) => {
    console.log('family_id', family_id , body)
	return async (dispatch) => {

		try {
			
			const response = await ApiPostNoAuth(`/urbanregister/updateFamily?family_id=${encryptDataGet(family_id)}`, body);
// 			const response = await apiCall.get(
// 				`/urbanregister/updateFamily?family_id=${encryptDataGet(JSON.stringify(family_id))}`
// 			);

// 			let responseData = decryptData(response?.data?.data)
// console.log('family_id', responseData)
console.log('family_id', response)

extraUpdate()
			dispatch(updateFamilySuccess(response));
		} catch (error) {
            console.log('error', error)
            toast.error(error?.message)
			dispatch(updateFamilyFaliure(error));
		}
	};
};
