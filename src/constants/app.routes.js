import { ADMIN_ROUTES } from "./admin.routes";
import { USER_ROUTES } from "./user.routes";
import { AUTH_ROUTES } from "./auth.routes";

import Login from "../pages/login";

export const AppRoutes = {
  ADMIN: [
    {
      path: ADMIN_ROUTES.candidates,
      exact: true,
      element: ""
    },
    {
      path: ADMIN_ROUTES.voters,
      exact: true,
      element: ""
    },
  ],
  AUTH: [
    {
      path: AUTH_ROUTES.login,
      exact: true,
      element: <Login />
    }
  ],
  USER: [
    {
      path: USER_ROUTES.vote,
      exact: true,
      element: ""
    }
  ],
};