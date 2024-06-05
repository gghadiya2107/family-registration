// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    ADD_FAMILY_SUCCESS,
    ADD_FAMILY_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiPostNoAuth } from "../apiData";
// Action Creators
export const addFamilySuccess = (data) => ({
	type: ADD_FAMILY_SUCCESS,
	payload: data,
});

export const addFamilyFaliure = (error) => ({
	type: ADD_FAMILY_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const addFamily = (body,setState) => {
	return async (dispatch) => {

		try {
			const response = await ApiPostNoAuth('/urbanregister/addfamily', body)
			// const response = await apiCall.post(
			// 	`/urbanregister/addfamily`, encryptDataPost(JSON.stringify(body))
			// );
			console.log('response adddFamily', response)
			// let responseData = decryptData(response?.data?.data)
			setState("2")
            toast.success( response?.message)
			dispatch(addFamilySuccess(response));
		} catch (error) {   
            console.log('error', error)
            toast.error(error?.message)
			dispatch(addFamilyFaliure(error));
		}
	};
};
