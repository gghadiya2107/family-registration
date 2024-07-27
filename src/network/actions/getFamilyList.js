// actions/someActions.js

import {
    GET_FAMILY_LIST_SUCCESS,
    GET_FAMILY_LIST_FALIURE,
} from "../action_types";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getFamilyListSuccess = (data) => ({
	type: GET_FAMILY_LIST_SUCCESS,
	payload: data,
});

export const getFamilyListFaliure = (error) => ({
	type: GET_FAMILY_LIST_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getFamilyList = (body,startLoading=() => {}, stopLoading=() => {}) => {
	return async (dispatch) => {
console.log('body', body)
startLoading()
		try {
			let params = {}
            if(body?.district){
                params.district_id = body?.district
            }
            if(body?.municipal){
                params.municipal_id = body?.municipal
            }
            if(body?.ward){
                params.ward_id = body?.ward
            }
            if(body?.searchByParivar){
                params.searchByParivar = body?.searchByParivar
            }
            // if(body?.page){
            //     params.page = JSON.stringify(body?.page)
            // }
				console.log('params', params)
			
			const response = await ApiGetNoAuth(`/urbanregister/getFamilyList?page=${body?.page || 0}&${Object.keys(params).length > 0 ? "" : ""}`, params);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.municipalId)}&masterName=${encryptData("ward")}`
			// );
			// let responseData = decryptData(response?.data?.data)
console.log('response', response)
			dispatch(getFamilyListSuccess(response));
			stopLoading()
		} catch (error) {
			stopLoading()
			dispatch(getFamilyListFaliure(error));
		}
	};
};
