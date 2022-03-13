import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography, TextField, Button, CircularProgress } from "@mui/material";
import useGlobalState from '../store';
import { setPartiesData } from "../store/actions";
import { ADMIN_SERVICE } from "../services/admin.services";

const ValidationSchema = yup.object().shape({
  time: yup.number().typeError("Please enter valid hours").required("Please enter valid hours")
});

const AddTimer = () => {

  const {
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(ValidationSchema)
  });

  const {
    dispatch
  } = useGlobalState();

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      // TODO:: remove this later
      dispatch(setPartiesData({
        timeStarted: true,
        timeCount: data.time
      }));

      // TODO:: change service depending on action type
      const resposneData = await ADMIN_SERVICE.startTimer({"timeStarted": true});

      if (resposneData.status === "success") {
        // TODO:: refetch the data. Just Call fetchData()
        dispatch(setPartiesData({
          timeStarted: true,
          timeCount: data.time
        }));
      } else {
        console.log("error while starting timer ", resposneData);
      }
    } catch (error) {
      console.log("error in start timer form => ", error);
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Grid conatiner >
        <Grid item md={12} xs={12} sm={12} >
          <Typography className="formLabel" >
            To Start voting, please add time in hours
          </Typography>

          <Controller
            name="time"
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
                placeholder="enter time in hours"
              />
            )}
          />
        </Grid>
      </Grid>
      <div className="modalActionsDiv" >
        <div className="timerButton" >
          <svg width="277" height="62">
            <defs>
              <linearGradient id="grad1">
                <stop offset="0%" stopColor="#FF8282" />
                <stop offset="100%" stopColor="#E178ED" />
              </linearGradient>
            </defs>
            <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="266" height="50"></rect>
          </svg>
          <button className="timerButtonTrigger" type="submit" >{loading ? "Starting" : "Start"}</button>
        </div>
      </div>
    </form >
  )
}

export default AddTimer;