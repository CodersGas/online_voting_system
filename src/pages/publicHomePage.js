import { useEffect } from "react";
import Layout from "../components/Layout";
import useGlobalState from "../store";
import { setCandidatesData } from "../store/actions";
import { COMMON_SERVICE } from "../services/common.services";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box"
import CandidateCard from "../components/candidateCard";

const candidateDummyData = [
  {
    "name": "Ashish",
    "party": "AAP",
    "position": "MP",
    "bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
  },
  {
    "name": "Ashish",
    "party": "AAP",
    "position": "MP",
    "bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
  },
  {
    "name": "Ashish",
    "party": "AAP",
    "position": "MP",
    "bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
  },
  {
    "name": "Ashish",
    "party": "AAP",
    "position": "MP",
    "bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
  },
];

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
              candidateDummyData.map((data, index) => (
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