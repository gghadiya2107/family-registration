// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    ADD_FAMILY_SUCCESS,
    ADD_FAMILY_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiPostFormData, ApiPostNoAuth } from "../apiData";
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
export const addFamily = (body,extra,startLoading=()=>{}, stopLoading=()=>{}) => {
	return async (dispatch) => {
		startLoading()
		const formData = new FormData()
		formData.append('consentDocName', body?.dastavage)
		formData.append('CastDocument', body?.dastavage2)
		delete body.dastavage
		delete body.dastavage2
		formData.append('Family', encryptDataPost(JSON.stringify(body)))

		try {
			const response = await ApiPostFormData('/urbanregister/addfamily', formData)
			
			console.log('response adddFamily', response)
			
			extra()
            toast.success( response?.message)
			dispatch(addFamilySuccess(response));
			stopLoading()
		} catch (error) {   
			stopLoading()
            console.log('error', error)
            toast.error(error?.message)
			dispatch(addFamilyFaliure(error));
		}
	};
};
