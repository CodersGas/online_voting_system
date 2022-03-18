import useGlobalState from "../store";
import Layout from "../components/Layout";
import Box from "@mui/material/Box";

const ElectionResult = () => {

  const {
    state: {
      parties
    }
  } = useGlobalState();

  const winner = {
    votes: 0,
    party: ""
  };

  parties.map((party, _) => {
    if (party.votes > winner.votes) {
      winner.votes = party.votes;
      winner.party = party.name;
    };
  });

  return (
    <Layout>
      <Box height={1} width={1} display="flex" justifyContent="center" alignItems="center" style={{gap: "1.5rem"}} >
        {
          (winner.party && winner.votes > 0) ?
            <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" style={{gap: "1.5rem"}}>
              <p className="winnerTitleText" > Election Winner</p>
              <p className="winnerName" >
                {winner.party}
              </p>

              <p className="winnerCount" >
                By {winner.votes} Votes
              </p>
            </Box>
            :
            <p>
              No winners !
            </p>
        }
      </Box>
    </Layout>
  )
}

export default ElectionResult;