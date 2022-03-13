import { deleteToken, deleteUserCookie, setUserCookie } from "../../helpers/common.helpers";
import { LOGOUT, LOGIN, SET_PARTIES_DATA, SET_VOTERS_DATA, SET_CANDIDATES_DATA, SET_POSITIONS_DATA } from "../actionTypes";

export default (state, action) => {
  console.log(action);
  switch(action.type) {
    case LOGOUT:
      deleteToken();
      deleteUserCookie();
      return {
        ...state,
        user: { isLoggedIn: false, details: false }
      };
    case LOGIN:
      setUserCookie(action.payload.user.details);
      return { ...state, ...action.payload };
    case SET_PARTIES_DATA:
    case SET_VOTERS_DATA:
    case SET_CANDIDATES_DATA:
    case SET_POSITIONS_DATA:
      return { ...state, ...action.payload };
    default:
      console.log(`Action type ${action.type} does not exist`);
  };
};