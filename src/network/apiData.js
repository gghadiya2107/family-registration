import { decryptData, encryptDataGet, encryptDataPost } from '@/utils/encryptDecryot';
import JsonToFormData from '@/utils/jsonToFormData';

const axios = require('axios').default;
export const BaseURL = process.env.NEXT_PUBLIC_API_BASE_URL ;

function checkForKey(obj, substring) {
  for (let key in obj) {
    if (key.includes(substring)) {
      return true; // Found a key that includes the substring
    }
  }
  return false; // No key includes the substring
}

let defaultHeaders = {
    headers: {
		"Content-Type": "text/plain", 
	},
}

function objectToQueryString(obj) {
    const queryParams = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        queryParams.push(`${key}=${encryptDataGet(obj[key])}`);
      }
    }
    return queryParams.join('&');
  }

export const ApiPostNoAuth = (url, body) => {
  let includesLE = checkForKey(body, 'documentFiles');
  let includesLE2 = checkForKey(body, 'consentDocName');
  let includesLE3 = checkForKey(body, 'TransferMembers');
  let encryptedBody
  if(includesLE){
    let formData = new FormData();
formData.append("documentFiles",body?.documentFiles )
formData.append("memberUpdate",encryptDataPost(JSON.stringify(body?.memberUpdate)) )
    encryptedBody = formData
  }else if(includesLE2){
    let formData = new FormData();
    formData.append("consentDocName",body?.consentDocName )
    formData.append("AddFamily",encryptDataPost(JSON.stringify(body?.AddFamily)) )
   if(body?.SeparateMembers) formData.append("SeparateMembers",encryptDataPost(JSON.stringify(body?.SeparateMembers)) )
   if(body?.TransferMembers) formData.append("TransferMembers",encryptDataPost(JSON.stringify(body?.TransferMembers)) )
        encryptedBody = formData
  }else if(includesLE3){
    let formData = new FormData();
    formData.append("TransferMembers",encryptDataPost(JSON.stringify(body?.TransferMembers)) )
        encryptedBody = formData
  }
  else{

     encryptedBody =encryptDataPost(JSON.stringify(body))
  }
  console.log('encryptedBody', encryptedBody)
  
  return new Promise((resolve, reject) => {
    axios
      .post(
        BaseURL + url,
        encryptedBody,
        defaultHeaders
      )
      .then((responseJson) => {
        const data = decryptData(responseJson?.data?.data);
        console.log('data api', data)
        resolve( data);
      })

      .catch((error) => {
        console.log('data api', error)

        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('message') &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
  });
};

export const ApiGetNoAuth = (url, params={}) => {
    let apiUrl = url + objectToQueryString(params)
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + apiUrl, defaultHeaders)
      .then(async (responseJson) => {
        const data = decryptData(responseJson?.data?.data);
        resolve( data);
      })
      .catch((error) => {
        console.log('data api', error)
        if (
            error &&
            error.hasOwnProperty('response') &&
            error.response &&
            error.response.hasOwnProperty('data') &&
            error.response.data &&
            error.response.data.hasOwnProperty('message') &&
            error.response.data.error
          ) {
            reject(error.response.data);
          } else {
            reject(error);
          }
      });
  });
};


export const ApiGet = (type) => {
  const loginData = JSON.parse(localStorage.getItem('logindata'));
  const userType = !loginData ? 0 : loginData?.userType;
  let ext = '';

  if (userType === 0) {
    ext = 'user';
  } else if (userType === 2) {
    ext = 'store_owner';
  } else {
    ext = 'admin';
  }
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + ext + type, getHttpOptions())
      .then((responseJson) => {
        const decryptedData = AesDEncrypt(responseJson?.data?.data);
        resolve({
          ...responseJson,
          ...responseJson.data,
          data: JSON.parse(decryptedData)
        });
      })
      .catch((error) => {
        if (
          error &&
          error.response
        ) {
          if (error.response.status === 403 || error.response.status === 401) {
            signout();
          }
        } else {
          // console.log(error);
          reject(error.response.data);
        }
      });
  });
};

export const ApiPost = (type, userData) => {
  let ext = '';
  const loginData = JSON.parse(localStorage.getItem('logindata'));
  const userType = !loginData ? 0 : loginData?.userType;
  const encryptedBody = {
    data: AesEncrypt(JSON.stringify(userData))
  };

  if (userType === 0) {
    ext = 'user';
  } else if (userType === 2) {
    ext = 'store_owner';
  } else {
    ext = 'admin';
  }  
  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + ext + type, encryptedBody, getHttpOptions())
      .then((responseJson) => {
        const decryptedData = AesDEncrypt(responseJson?.data?.data);
        resolve({
          ...responseJson,
          ...responseJson.data,
          data: JSON.parse(decryptedData)
        });
      })
      .catch((error) => {
        if (
          error &&
          error.response
        ) {
          if (error.response.status === 403 || error.response.status === 401) {
            signout();
          }
        } else {
          // console.log(error);
          reject(error.response.data);
        }
      });

      //   if (
      //     error &&
      //     error.hasOwnProperty('response') &&
      //     error.response &&
      //     error.response.hasOwnProperty('data') &&
      //     error.response.data &&
      //     error.response.data.hasOwnProperty('error') &&
      //     error.response.data.error
      //   ) {
      //     reject(error.response.data);
      //   } else {
      //     reject(error.response.data);
      //   }
      // });
  });
};
