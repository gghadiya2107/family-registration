// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    ADD_FAMILY_SUCCESS,
    ADD_FAMILY_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataPost } from "@/utils/encryptDecryot";
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
export const addFamily = (body) => {
	return async (dispatch) => {

		try {
			const response = await apiCall.post(
				`/urbanregister/addfamily`, encryptDataPost(JSON.stringify(body))
			);
			let responseData = decryptData(response?.data?.data)
            toast.success( responseData?.message)
			dispatch(addFamilySuccess(responseData));
		} catch (error) {   
            console.log('error', error)
            toast.error(error?.response?.data?.message)
            console.log('error', error?.response?.data?.message)
			dispatch(addFamilyFaliure(error));
		}
	};
};
