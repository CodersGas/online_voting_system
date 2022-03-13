import Layout from "../components/Layout";
import { Grid, Button } from "@mui/material";
import AdminMenu from "../components/adminMenu";
import AddIcon from "@mui/icons-material/Add";

const Voters = () => {

  return (
    <Layout>
      <Grid container className="containerGrid" spacing={2} >
        <Grid item md={2} className="adminMenuGrid" >
          <AdminMenu />
        </Grid>

        <Grid item md={10} xs={12} sm={12} >
          <div className="mainContentDiv" >
            <div className="upperContentDiv" >
              <p>
                Voters
              </p>

              <Button startIcon={<AddIcon />} variant="outlined" color="primary" className="addUserButton" >
                Add Voter
              </Button>
            </div>

            <div className="lowerContentDiv" >

            </div>
          </div>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Voters;