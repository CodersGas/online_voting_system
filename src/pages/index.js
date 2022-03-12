import { Navigate, Routes, Route } from "react-router-dom"; 
import { AppRoutes } from "../constants/app.routes";
import useGlobalState from "../store";
import Login from "./login";

const Pages = () => {
  const {
    state: {
      user: {
        isLoggedIn,
        details
      }
    }
  } = useGlobalState();

  return (
    <Routes>
      {
        AppRoutes.AUTH.map((route, _) => {
          <Route 
            key={route.path}
            {...route}
          />
        })
      }

      {
        isLoggedIn ?
        <>
          {
            details.role === "admin" ?
            AppRoutes.ADMIN.map((route, _) => (
              <Route 
                key={route.path}
                {...route}
              />
            ))
            :
            AppRoutes.USER.map((route, _) => (
              <Route 
                key={route.path}
                {...route}
              />
            ))
          }
        </>
        :
        <Route path="*" element={<Login />} />
      }
    </Routes>
  )
}

export default Pages;