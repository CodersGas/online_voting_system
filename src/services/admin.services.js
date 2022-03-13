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
  "editCandidate": async(params) => {
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
  "addParty": async(params) => {
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
  "editParty": async(params) => {
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
  "deleteParty": async(params) => {
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
  "startTimer": async(params) => {
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
  "finishTimer": async(params) => {
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
  }
};