import { ADMIN_ROUTES } from "./admin.routes";
import { USER_ROUTES } from "./user.routes";
import { AUTH_ROUTES } from "./auth.routes";

import Login from "../pages/login";
import Candidates from "../pages/candidates";
import AdminHome from "../pages/adminHome";
import Voters from "../pages/voters";
import Parties from "../pages/parties";

export const AppRoutes = {
  ADMIN: [
    {
      path: ADMIN_ROUTES.home,
      exact: true,
      element: <AdminHome />
    },
    {
      path: ADMIN_ROUTES.candidates,
      exact: true,
      element: <Candidates />
    },
    {
      path: ADMIN_ROUTES.voters,
      exact: true,
      element: <Voters />
    },
    {
      path: ADMIN_ROUTES.parties,
      exact: true,
      element: <Parties />
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