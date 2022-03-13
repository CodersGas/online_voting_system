import AdminMenu from "../components/adminMenu";
import Layout from "../components/Layout";
import { Grid, Button } from "@mui/material";
import useGlobalState from "../store";
import AddIcon from "@mui/icons-material/Add";

const AdminHome = () => {

  const {
    state: {
      user: {
        details
      }
    }
  } = useGlobalState();

  return (
    <Layout>
      <Grid container className="containerGrid" spacing={2} >
        <Grid item md={2} className="adminMenuGrid" >
          <AdminMenu />
        </Grid>

        <Grid item md={10} xs={12} sm={12} >
          <div className="mainContentDiv" >
            <div className="upperContentDiv" >
              <p >
                Hello, {details.name} 👋
              </p>
            </div>

            <div className="lowerContentDiv" >

            </div>
          </div>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default AdminHome;