// actions/someActions.js
import { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
	SEPARATE_MEMBER_SUCCESS,
	SEPARATE_MEMBER_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiPostNoAuth } from "../apiData";
// Action Creators
export const separateMemberSuccess = (data) => ({
	type: SEPARATE_MEMBER_SUCCESS,
	payload: data,
});

export const separateMemberFaliure = (error) => ({
	type: SEPARATE_MEMBER_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const separateMember = (body, extra, startLoading = () => { }, stopLoading = () => { }) => {
	return async (dispatch) => {
		startLoading()
		try {
			const response = await ApiPostNoAuth('/urbanregister/separateMember', body)
			toast.success(response?.message)
			extra()
			dispatch(separateMemberSuccess(response));
			stopLoading()
		} catch (error) {
			console.log('error member', error)
			toast.error(error?.message)
			dispatch(separateMemberFaliure(error));
			stopLoading()
		}
	};
};
