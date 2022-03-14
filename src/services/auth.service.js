import { callAPI } from "./apiCaller";
import { baseUrl } from "../constants/common.constants";
 
let data = null;

export const AUTH_SERVICE = {
  "login": async(params) => {
    const configObj = {
      "method": "POST",
      "url":  `${baseUrl}/`,
      "data": params,
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };

    data = await callAPI(configObj);
    return data;
  },
  "register": async(params) => {
    const configObj = {
      "method": "POST",
      "url":  `${baseUrl}/user/register`,
      "data": params,
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };

    data = await callAPI(configObj);
    return data;
  }
};