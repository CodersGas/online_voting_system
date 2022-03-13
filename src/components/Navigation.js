import { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from "@mui/material/Tooltip";
import IconButton from '@mui/material/IconButton';
import useGlobalState from '../store';
import { logoutUser } from '../store/actions';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import AdminMenu from "./adminMenu";

const Navigation = () => {

  const {
    dispatch,
    state: {
      user: {
        details,
        isLoggedIn
      }
    }
  } = useGlobalState();

  const navigate = useNavigate();

  const [openNav, setOpenNav] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  }

  const toggleNavDrawer = () => setOpenNav(!openNav);

  return (
    <>
      <div className='navigationBar' >
        {
          isLoggedIn ?
            <div className="leftMenu" >
              {
                details.role === "admin" &&
                <MenuIcon className="menuIcon" onClick={toggleNavDrawer} />
              }
              <p className='navigationTitle' >
                Online Voting {details.role === "admin" ? "Admin Portal" : "System"}
              </p>
            </div>
            :
            <div></div>
        }

        {
          isLoggedIn ?
            <Tooltip
              arrow
              title="Logout"
            >
              < IconButton onClick={handleLogout} >
                <LogoutIcon className='logoutIcon' />
              </IconButton>
            </Tooltip>
            :
            <Link to="/login" className="logintext" >Login</Link>
        }
      </div >

      {
        < Drawer
          anchor="left"
          open={openNav}
          onClose={toggleNavDrawer}
        >
          <AdminMenu />
        </Drawer >
      }
    </>
  )
}

export default Navigation;