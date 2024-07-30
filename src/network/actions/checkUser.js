// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    CHECK_USER_SUCCESS,
    CHECK_USER_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiPostNoAuth } from "../apiData";
// Action Creators
export const checkUserSuccess = (data) => ({
	type: CHECK_USER_SUCCESS,
	payload: data,
});

export const checkUserFaliure = (error) => ({
	type: CHECK_USER_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const checkUser = (body,extra) => {
	return async (dispatch) => {

		try {
			const response = await ApiPostNoAuth('/urbanregister/check-user', body)
            console.log('checkUserData', response)
			dispatch(checkUserSuccess(response));
            toast.success( response?.message)
            extra()
		} catch (error) {   
            console.log('error member', error)
            toast.error(error?.message)
			dispatch(checkUserFaliure(error));
		}
	};
};
