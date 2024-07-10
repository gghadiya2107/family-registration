// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
 
    ADD_FAMILY_MEMBER_SUCCESS,
    ADD_FAMILY_MEMBER_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiPostFormData, ApiPostNoAuth } from "../apiData";
// Action Creators
export const addfamilymemberSuccess = (data) => ({
	type: ADD_FAMILY_MEMBER_SUCCESS,
	payload: data,
});

export const addfamilymemberFaliure = (error) => ({
	type: ADD_FAMILY_MEMBER_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const addfamilymember = (body,extra, startLoading, stopLoading) => {
	return async (dispatch) => {
startLoading()
		try {
			const formData = new FormData()
		formData.append('BonafideDocument', body?.dastavage)
		formData.append('CastDocument', body?.dastavage2)
		delete body.dastavage
		delete body.dastavage2
		formData.append('Member', encryptDataPost(JSON.stringify(body)))
			const response = await ApiPostFormData('/urbanregister/addfamilymember', formData)

			// const response = await apiCall.post(
			// 	`/urbanregister/addfamilymember`, encryptDataPost(JSON.stringify(body))
			// );
			// let responseData = decryptData(response?.data?.data)
            // console.log('responseData add member', responseData)
            toast.success( response?.message)
            extra()
			dispatch(addfamilymemberSuccess(response));
			stopLoading()
		} catch (error) {   
			stopLoading()
            console.log('error member', error)
            toast.error(error?.message)
			dispatch(addfamilymemberFaliure(error));
		}
	};
};
