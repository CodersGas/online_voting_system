import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography, TextField, MenuItem, Button, CircularProgress } from "@mui/material";
import useGlobalState from '../store';
import { setCandidatesData } from "../store/actions";
import { ADMIN_SERVICE } from "../services/admin.services";

const ValidationSchema = yup.object().shape({
  name: yup.string().required("Please enter name"),
  email: yup.string().email("Please enter valid email").required("Please enter email"),
  bio: yup.string().min(10, "Please enter at least 10 characters").required("Please enter bio"),
  position: yup.string().required("Please select position"),
  party: yup.string().required("Please select party")
});

const dummyParties = [
  {
    "key": 1,
    "value": 1,
    "name": "BJP"
  }, {
    "key": 2,
    "value": 2,
    "name": "AAP"
  },
];

const dummyPositions = [
  {
    "key": 1,
    "value": 1,
    "name": "MLA"
  }, {
    "key": 2,
    "value": 2,
    "name": "MP"
  },
];


const CandidateForm = ({
  onClose,
  actionType,
  editData,
  fetchData
}) => {

  const {
    control,
    handleSubmit,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(ValidationSchema)
  });

  const {
    state: {
      candidates
    },
    dispatch
  } = useGlobalState();

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      dispatch(setCandidatesData({
        candidates: [...candidates, data] 
      }));

      // TODO:: change service depending on action type
      const resposneData = await ADMIN_SERVICE.addCandidate(data);

      if(resposneData.status === "success") {
        // TODO:: refetch the data. Just Call fetchData()
        dispatch(setCandidatesData({
          candidates: [...candidates, data] 
        }));
      }else {
        console.log("error while adding candidate ", resposneData);
      }
      onClose();
    } catch (error) {
      console.log("error in candidate form => ", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if(actionType === "edit") {
      reset(editData); 
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Grid conatiner >
        <Grid item md={12} xs={12} sm={12} >
          <Typography className="formLabel" >
            Name
          </Typography>

          <Controller
            name="name"
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error }
            }) => (
              <TextField
                fullWidth
                value={value || ""}
                onChange={onChange}
                error={error?.message}
                helperText={error?.message}
                placeholder="enter name"
              />
            )}
          />
        </Grid>

        <Grid item md={12} xs={12} sm={12} >
          <Typography className="formLabel" >
            Email
          </Typography>

          <Controller
            name="email"
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error }
            }) => (
              <TextField
                fullWidth
                value={value || ""}
                onChange={onChange}
                error={error?.message}
                helperText={error?.message}
                placeholder="enter email"
              />
            )}
          />
        </Grid>

        <Grid item md={12} xs={12} sm={12} >
          <Typography className="formLabel" >
            Bio
          </Typography>

          <Controller
            name="bio"
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error }
            }) => (
              <TextField
                multiline
                rows={4}
                fullWidth
                value={value || ""}
                onChange={onChange}
                error={error?.message}
                helperText={error?.message}
                placeholder="enter bio"
              />
            )}
          />
        </Grid>

        <Grid item md={12} xs={12} sm={12} >
          <Typography className="formLabel" >
            Position
          </Typography>

          <Controller
            name="position"
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error }
            }) => (
              <TextField
                select
                fullWidth
                value={value || ""}
                onChange={(e) => setValue("position", e.target.value)}
                error={error?.message}
                helperText={error?.message}
                placeholder="Select Positon"
                label="Position"
              >
                {
                  dummyPositions.map((position) => (
                    <MenuItem key={position.key} value={position.value} >
                      {position.name}
                    </MenuItem>
                  ))
                }
              </TextField>
            )}
          />
        </Grid>

        <Grid item md={12} xs={12} sm={12} >
          <Typography className="formLabel" >
            Party
          </Typography>

          <Controller
            name="party"
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error }
            }) => (
              <TextField
                select
                fullWidth
                value={value || ""}
                onChange={(e) => setValue("party", e.target.value)}
                error={error?.message}
                helperText={error?.message}
                placeholder="Select Party"
                label="Party"
              >
                {
                  dummyParties.map((party) => (
                    <MenuItem key={party.key} value={party.value}>
                      {party.name}
                    </MenuItem>
                  ))
                }
              </TextField>
            )}
          />
        </Grid>
      </Grid>
      <div className="modalActionsDiv" >
        <Button onClick={onClose} color="primary" disabled={loading} >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
          endIcon={loading && <CircularProgress />}
          className="addUserButton"
          variant="outlined"
        >
          Submit
        </Button>
      </div>
    </form >
  )
}

export default CandidateForm;