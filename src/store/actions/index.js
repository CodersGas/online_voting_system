import { LOGIN, LOGOUT } from "../actionTypes";

export const setUserLoginDetails = (payload) => {
  return {
    type: LOGIN,
    payload
  };
};

export const logoutUser = (payload) => {
  return {
    type: LOGOUT,
    payload
  };
};