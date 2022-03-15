import { useState } from "react";
import Grid from "@mui/material/Grid"
import Avatar from "@mui/material/Avatar";
import useGlobalState from "../store";
import Button from "@mui/material/Button";
import { COMMON_SERVICE } from "../services/common.services";
import { updateVotedState } from "../store/actions";

const CandidateCard = ({ data }) => {

  const {
    state: {
      alreadyVoted,
      user: {
        isLoggedIn
      },
      parties,
      positions
    },
    dispatch
  } = useGlobalState();

  const [loading, setLoading] = useState(false);

  const handleCastVote = async () => {
    try {
      setLoading(true);
      const responseData = await COMMON_SERVICE.castVote({ "partyId": data.partyId });

      if (responseData.success) {
        console.log("vote cased successfully");

      }
    } catch (error) {
      console.log("error while casting vote ", error);
    }
    setLoading(false);
    dispatch(updateVotedState({
      alreadyVoted: true
    }));
  }

  return (
    <Grid item md={3} xs={12} sm={12} >
      <div className="cardContainer" >
        <div className="photoNameDiv" >
          <Avatar
            src={data.img}
            alt={data.name}
            className="candidateAvatar"
          />
          <p>
            {data.name}
          </p>
        </div>

        <div className="partyPositionDiv" >
          <div className="partyInfoDiv" >
            <p>
              Party
            </p>

            <p className="partyName" >
              { parties.filter(party => party._id == data.party)[0]["name"] }
            </p>
          </div>

          <div className="positionInfoDiv" >
            <p>
              Position
            </p>

            <p className="positionName">
              { positions.filter(position => position._id === data.position)[0]["name"] }
            </p>
          </div>
        </div>

        <div className="bioDiv" >
          <p>
            {data.bio}
          </p>
        </div>

        {
          isLoggedIn &&
          <>
            {
              alreadyVoted ?
                null
                :
                <div className="voteButtonDiv" >
                  <Button onClick={handleCastVote} variant="outlined" className="addUserButton voteButton" >
                    Vote
                  </Button>
                </div>
            }
          </>
        }
      </div>
    </Grid>
  )
}

export default CandidateCard;