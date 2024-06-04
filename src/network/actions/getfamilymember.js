// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    GET_FAMILY_MEMBER_SUCCESS,
    GET_FAMILY_MEMBER_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataGet, encryptDataPost } from "@/utils/encryptDecryot";
// Action Creators
export const getfamilymemberSuccess = (data) => ({
	type: GET_FAMILY_MEMBER_SUCCESS,
	payload: data,
});

export const getfamilymemberFaliure = (error) => ({
	type: GET_FAMILY_MEMBER_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getfamilymember = (family_id) => {
    console.log('family_id', family_id)
	return async (dispatch) => {

		try {
			const response = await apiCall.get(
				`/urbanregister/getfamilymember?family_id=${encryptDataGet(JSON.stringify(family_id))}`
			);
			let responseData = decryptData(response?.data?.data)
            console.log('response getfamilymember', responseData)
console.log('family_id', responseData)
			dispatch(getfamilymemberSuccess(responseData));
		} catch (error) {
            console.log('error', error)
            toast.error(error?.response?.data?.message)
            console.log('error', error?.response?.data?.message)
			dispatch(getfamilymemberFaliure(error));
		}
	};
};
