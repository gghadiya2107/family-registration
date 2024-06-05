// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
 
    ADD_FAMILY_MEMBER_SUCCESS,
    ADD_FAMILY_MEMBER_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiPostNoAuth } from "../apiData";
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
export const addfamilymember = (body,extra) => {
	return async (dispatch) => {

		try {
			const response = await ApiPostNoAuth('/urbanregister/addfamilymember', body)

			// const response = await apiCall.post(
			// 	`/urbanregister/addfamilymember`, encryptDataPost(JSON.stringify(body))
			// );
			// let responseData = decryptData(response?.data?.data)
            // console.log('responseData add member', responseData)
            toast.success( response?.message)
            extra()
			dispatch(addfamilymemberSuccess(response));
		} catch (error) {   
            console.log('error member', error)
            toast.error(error?.response?.data?.message)
			dispatch(addfamilymemberFaliure(error));
		}
	};
};
