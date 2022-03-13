import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography, TextField, Button, CircularProgress } from "@mui/material";
import useGlobalState from '../store';
import { setPositionsData } from "../store/actions";
import { ADMIN_SERVICE } from "../services/admin.services";

const ValidationSchema = yup.object().shape({
  name: yup.string().required("Please enter party name")
});

const AddPositionForm = ({
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
      positions
    },
    dispatch
  } = useGlobalState();

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      dispatch(setPositionsData({
        positions: [...positions, data] 
      }));

      // TODO:: change service depending on action type
      const resposneData = await ADMIN_SERVICE.addParty(data);

      if(resposneData.status === "success") {
        // TODO:: refetch the data. Just Call fetchData()
        dispatch(setPositionsData({
          positions: [...positions, data] 
        }));
      }else {
        console.log("error while adding partiy ", resposneData);
      }
      onClose();
    } catch (error) {
      console.log("error in add party form => ", error);
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
            Position Name
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
                placeholder="enter party name"
              />
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

export default AddPositionForm;