import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from "@mui/material/Tooltip";
import IconButton from '@mui/material/IconButton';
import useGlobalState from '../store';
import { logoutUser } from '../store/actions';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navigation = () => {

  const {
    dispatch,
    state: {
      user: {
        details
      }
    }
  } = useGlobalState();

  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  }

  return (
    <div className='navigationBar' >
      <div className="leftMenu" >
        {
          details.role === "admin" &&
          <MenuIcon className="menuIcon" />
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
  )
}

export default Navigation;