import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = ({ children }) => {

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
        location.pathname !== "/login" && location.pathname !== "/register" &&
        <Navigation />
      }
      { children }
    </div>
  )
}

export default Layout;