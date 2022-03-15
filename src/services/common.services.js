import { callAPI } from "./apiCaller";
import { baseUrl } from "../constants/common.constants";
import { getToken } from "../helpers/common.helpers"; 

let data = null;

export const COMMON_SERVICE = {
  "getCandidates": async(params) => {
    const configObj = {
      "method": "GET",
      "url":  `${baseUrl}candidates`,
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    };

    data = await callAPI(configObj);
    return data;
  },
  "getVoters": async(params) => {
    const configObj = {
      "method": "GET",
      "url":  `${baseUrl}voters`,
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    };

    data = await callAPI(configObj);
    return data;
  },
  "getParties": async(params) => {
    const configObj = {
      "method": "GET",
      "url":  `${baseUrl}parties`,
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    };

    data = await callAPI(configObj);
    return data;
  },
  "getPositions": async(params) => {
    const configObj = {
      "method": "GET",
      "url":  `${baseUrl}positions`,
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    };

    data = await callAPI(configObj);
    return data;
  },
  "castVote": async(params) => {
    const configObj = {
      "method": "POST",
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