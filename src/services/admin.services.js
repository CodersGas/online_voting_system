import { callAPI } from "./apiCaller";
import { baseUrl } from "../constants/common.constants";
import { getToken } from "../helpers/common.helpers"; 

let data = null;

export const ADMIN_SERVICE = {
  "addEditCandidate": async(params) => {
    const configObj = {
      "method": "POST",
      "url":  `${baseUrl}/`,
      "data": params,
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    };

    data = await callAPI(configObj);
    return data;
  },
  "deleteCandidate": async(params) => {
    const configObj = {
      "method": "DELETE",
      "url":  `${baseUrl}/`,
      "data": params,
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    };

    data = await callAPI(configObj);
    return data;
  },
};