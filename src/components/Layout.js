import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import useGlobalState from "../store";

const Layout = ({ children }) => {

  const {
    state: {
      user: {
        isLoggedIn
      }
    }
  } = useGlobalState();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      document.body.classList.add("animatedBackground");
    }else {
      document.body.classList.remove("animatedBackground");
    }
  }, [location]);

  return (
    <div className="layoutDiv" >
      {
        isLoggedIn &&
        <Navigation />
      }
      { children }
    </div>
  )
}

export default Layout;