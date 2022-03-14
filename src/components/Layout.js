import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../config/firebase.config";

const Layout = ({ children }) => {

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      document.body.classList.add("animatedBackground");

      window.recaptchaVerifier = new RecaptchaVerifier("captcha-box", {
        "size": "invisible"
      }, auth);
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

      <div id="captcha-box" ></div>
    </div>
  )
}

export default Layout;