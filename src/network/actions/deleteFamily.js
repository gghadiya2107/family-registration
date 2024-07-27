// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    DELETE_FAMILY_SUCCESS,
    DELETE_FAMILY_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataGet, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiGetNoAuth, ApiPostNoAuth } from "../apiData";
// Action Creators
export const deleteFamilySuccess = (data) => ({
	type: DELETE_FAMILY_SUCCESS,
	payload: data,
});

export const deleteFamilyFaliure = (error) => ({
	type: DELETE_FAMILY_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const deleteFamily = (familyMemberId,  extraAferDelete,startLoading=()=>{}, stopLoading=()=>{}) => {
    console.log('familyMemberId', familyMemberId )
	return async (dispatch) => {
startLoading()
		try {
			
			const response = await ApiPostNoAuth(`/urbanregister/DeleteFamily?family_id=${encryptDataGet(familyMemberId)}`, {});
			toast.success(response?.message)

console.log('familyMemberId', response)
extraAferDelete()

			dispatch(deleteFamilySuccess(response));
			stopLoading()
		} catch (error) {
			stopLoading()
            console.log('error', error)
            toast.error(error?.message)
			dispatch(deleteFamilyFaliure(error));
		}
	};
};
