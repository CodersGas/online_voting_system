import { Link, useLocation } from "react-router-dom";

const AdminMenu = () => {

  const { pathname } = useLocation();
  console.log(pathname)

  return (
    <div className="adminMenuDiv" >
      <Link to="/" className={pathname === "/" ? "selectedMenu" : ""} >
        <p>Home</p>
      </Link>

      <Link to="/candidates" className={pathname === "/candidates" ? "selectedMenu" : ""} >
        <p>Candidates</p>
      </Link>

      <Link to="/voters" className={pathname === "/voters" ? "selectedMenu" : ""} >
        <p>Voters</p>
      </Link>
    </div>
  )
}

export default AdminMenu;