// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    GET_FAMILY_BY_ID_SUCCESS,
    GET_FAMILY_BY_ID_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataGet, encryptDataPost } from "@/utils/encryptDecryot";
// Action Creators
export const getFamilyByIdSuccess = (data) => ({
	type: GET_FAMILY_BY_ID_SUCCESS,
	payload: data,
});

export const getFamilyByIdFaliure = (error) => ({
	type: GET_FAMILY_BY_ID_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getFamilyById = (family_id) => {
    console.log('family_id', family_id)
	return async (dispatch) => {

		try {
			const response = await apiCall.get(
				`/urbanregister/getFamilyById?family_id=${encryptDataGet(JSON.stringify(family_id))}`
			);

			let responseData = decryptData(response?.data?.data)
console.log('family_id', responseData)
			dispatch(getFamilyByIdSuccess(responseData));
		} catch (error) {
            console.log('error', error)
            toast.error(error?.response?.data?.message)
            console.log('error', error?.response?.data?.message)
			dispatch(getFamilyByIdFaliure(error));
		}
	};
};
