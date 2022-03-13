import { deleteToken, deleteUserCookie, setUserCookie } from "../../helpers/common.helpers";
import { LOGOUT, LOGIN } from "../actionTypes";

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
    default:
      console.log(`Action type ${action.type} does not exist`);
  };
};