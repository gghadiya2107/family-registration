// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    DELETE_FAMILY_MEMBER_SUCCESS,
    DELETE_FAMILY_MEMBER_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataGet, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiGetNoAuth, ApiPostNoAuth } from "../apiData";
// Action Creators
export const deleteFamilyMemberSuccess = (data) => ({
	type: DELETE_FAMILY_MEMBER_SUCCESS,
	payload: data,
});

export const deleteFamilyMemberFaliure = (error) => ({
	type: DELETE_FAMILY_MEMBER_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const deleteFamilyMember = (familyMemberId,  extraAferDelete) => {
    console.log('familyMemberId', familyMemberId )
	return async (dispatch) => {

		try {
			
			const response = await ApiPostNoAuth(`/urbanregister/DeleteFamilyMember?family_member_id=${encryptDataGet(familyMemberId)}`, {});
			toast.success(response?.message)

console.log('familyMemberId', response)
extraAferDelete()

			dispatch(deleteFamilyMemberSuccess(response));
		} catch (error) {
            console.log('error', error)
            toast.error(error?.message)
			dispatch(deleteFamilyMemberFaliure(error));
		}
	};
};
