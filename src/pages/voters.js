import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Grid } from "@mui/material";
import AdminMenu from "../components/adminMenu";
import useGlobalState from "../store";
import TableComponent from "../components/table";
import { COMMON_SERVICE } from "../services/common.services";
import { setVotersData } from "../store/actions";

const voterHeader = ["S.no", "Name", "Email", "Phone", "Actions"];

const dummyVoter = [
  {
    "name": 'Ashish',
    "phone": "9958750734",
    "email": "abc@gmail.com"
  }
]

const Voters = () => {
  const {
    state: {
      voters
    },
    dispatch
  } = useGlobalState();

  const getAllVoters = async () => {
    try {
      const responseData = await COMMON_SERVICE.getVoters();

      if (responseData.success) {
        dispatch(setVotersData({
          voters: [...responseData.data]
        }));
      }
    } catch (error) {
      console.log("error in getAllVoters ", error);
    }
  }

  useEffect(() => {
    getAllVoters();
  }, []);

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
            </div>

            <div className="lowerContentDiv" >
              <TableComponent
                headerArray={voterHeader}
                dataArray={dummyVoter} // TODO:: replace dataArray param
                modalTitle=""
                fetchData={null}
                canEdit={false}
                canDelete={true}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Voters;