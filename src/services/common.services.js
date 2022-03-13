import { callAPI } from "./apiCaller";
import { baseUrl } from "../constants/common.constants";
import { getToken } from "../helpers/common.helpers"; 

let data = null;

export const COMMON_SERVICE = {
  "getCandidates": async(params) => {
    const configObj = {
      "method": "GET",
      "url":  `${baseUrl}/`,
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    };

    data = await callAPI(configObj);
    return data;
  }
};