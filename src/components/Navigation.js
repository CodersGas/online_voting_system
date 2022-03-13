import { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from "@mui/material/Tooltip";
import IconButton from '@mui/material/IconButton';
import useGlobalState from '../store';
import { logoutUser } from '../store/actions';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import AdminMenu from "./adminMenu";

const Navigation = () => {

  const {
    dispatch,
    state: {
      user: {
        details
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
        <div className="leftMenu" >
          {
            details.role === "admin" &&
            <MenuIcon className="menuIcon" onClick={toggleNavDrawer} />
          }
          <p className='navigationTitle' >
            Online Voting {details.role === "admin" ? "Admin Portal" : ""}
          </p>
        </div>
        <Tooltip
          arrow
          title="Logout"
        >
          <IconButton onClick={handleLogout} >
            <LogoutIcon className='logoutIcon' />
          </IconButton>
        </Tooltip>
      </div>

      {
        <Drawer
          anchor="left"
          open={openNav}
          onClose={toggleNavDrawer}
        >
          <AdminMenu />
        </Drawer>
      }
    </>
  )
}

export default Navigation;