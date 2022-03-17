import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../config/firebase.config";
import useGlobalState from "../store";
import { setPartiesData, setPositionsData } from "../store/actions";
import { COMMON_SERVICE } from "../services/common.services";

const Layout = ({ children }) => {

  const {
    state: {
      user: {
        isLoggedIn,
        details
      },
      parties,
      positions,
    },
    dispatch
  } = useGlobalState();

  const location = useLocation();

  const getAllParties = async () => {
    try {
      const responseData = await COMMON_SERVICE.getParties();

      if (responseData.success) {
        dispatch(setPartiesData({
          parties: [...responseData.data]
        }));
      }
    } catch (error) {
      console.log("error in getAllParties ", error);
    }
  }

  const getAllPositions = async () => {
    try {
      const responseData = await COMMON_SERVICE.getPositions();

      if (responseData.success) {
        dispatch(setPositionsData({
          positions: [...responseData.data]
        }));
      }
    } catch (error) {
      console.log("error in getAllPositions ", error);
    }
  }

  const getHasAlreadyVoted = async() => {
    try {
      const responseData = await COMMON_SERVICE.getHasAlreadyVoted({ "userId": details.userId });

      if (responseData.success) {
        dispatch(setPositionsData({
          alreadyVoted: responseData.data.hasAlreadyVoted
        }));
      }
    } catch (error) {
      console.log("error in getHasAlreadyVoted ", error);
    } 
  }

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      document.body.classList.add("animatedBackground");

      window.recaptchaVerifier = new RecaptchaVerifier("captcha-box", {
        "size": "invisible"
      }, auth);
    }else {
      document.body.classList.remove("animatedBackground");
    }

    if(isLoggedIn && details.role === "user") {
      getHasAlreadyVoted(); 
    }
  }, [location]);

  useEffect(() => {
    if(!parties.length && !positions.length) {
      getAllParties();
      getAllPositions();
    }
  }, []);

  return (
    <div className="layoutDiv" >
      {
        <Navigation />
      }
      { children }

      <div id="captcha-box" ></div>
    </div>
  )
}

export default Layout;