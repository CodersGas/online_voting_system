import Navigation from "./Navigation";


const Layout = ({ children }) => {

  return (
    <div className="layoutDiv" >
      <Navigation />
      { children }
    </div>
  )
}

export default Layout;