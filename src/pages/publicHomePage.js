import { useEffect } from "react";
import Layout from "../components/Layout";
import useGlobalState from "../store";
import { setCandidatesData } from "../store/actions";
import { COMMON_SERVICE } from "../services/common.services";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box"
import CandidateCard from "../components/candidateCard";

const PublicHomePage = () => {
  const {
    state: {
      candidates
    },
    dispatch
  } = useGlobalState();

  const getAllCandidates = async () => {
    try {
      const responseData = await COMMON_SERVICE.getCandidates();

      if (responseData.success) {
        dispatch(setCandidatesData({
          candidates: [...responseData.data]
        }));
      } else {
        console.log("unable to fetch candidates list ", responseData);
      }
    } catch (error) {
      console.log("error in getAllCandidates public home page ", error);
    }
  }

  useEffect(() => {
    getAllCandidates();
  }, []);

  return (
    <Layout>
      <div className="bootstrapContainer" >
        <Box my={5} >
          <Grid container spacing={2} >
            {
              candidates.map((data, index) => (
                <CandidateCard key={index} data={data} />
              ))
            }
          </Grid>
        </Box>
      </div>
    </Layout>
  )
}

export default PublicHomePage;