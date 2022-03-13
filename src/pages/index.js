import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; 
import { AppRoutes } from "../constants/app.routes";
import useGlobalState from "../store";
import Login from "./login";

const Pages = () => {
  const {
    state
  } = useGlobalState();
  console.log('state ', state)

  const navigate = useNavigate();

  // useEffect(() => {
  //   if(!isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <Routes>
      {
        AppRoutes.AUTH.map((route, _) => (
          <Route 
            key={route.path}
            {...route}
          />
        ))
      }

      {/* {
        isLoggedIn &&
        <>
          {
            details.role === "admin" ?
            AppRoutes.ADMIN.map((route, _) => (
              <Route 
                key={route.path}
                {...route}
                render={() => {
                  if(!isLoggedIn) {
                    return <Navigate to="/login" />
                  }
                }}
              />
            ))
            :
            AppRoutes.USER.map((route, _) => (
              <Route 
                key={route.path}
                {...route}
                render={() => {
                  if(!isLoggedIn) {
                    return <Navigate to="/login" />
                  }
                }}
              />
            ))
          }
        </>
      }

      {
        !isLoggedIn && 
        <Route path="/login" element={ <Login /> } />
      } */}
    </Routes>
  )
}

export default Pages;