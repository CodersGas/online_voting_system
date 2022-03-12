import { getToken, getUserCookie } from "../helpers/common.helpers";

export default {
  user: {
    isLoggedIn: Boolean(getToken()) && Boolean(getUserCookie()),
    details: getUserCookie()
  }
};