import { useState } from "react";
import useGlobalState from "../store";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AUTH_SERVICE } from "../services/auth.service";
import { setUserLoginDetails } from "../store/actions";
import { setToken } from "../helpers/common.helpers";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const ValidationSchema = yup.object().shape({
  email: yup.string().email("Please enter valid email").required("Please enter email"),
  password: yup.string().min(8, "Password length too short").max(16, "Password too long").required("Please enter the password")
});

const Login = () => {

  const {
    dispatch
  } = useGlobalState();

  const {
    control,
    handleSubmit
  } = useForm({
    resolver: yupResolver(ValidationSchema)
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    const userInfo = {
      "details": {
        "role": "response.data.role",
        "name": "response.data.name",
      },
      "isLoggedIn": true
    };
    dispatch(setUserLoginDetails(
      {
        user: userInfo
      }
    ));
    navigate("/candidates");

    // try{
    //   setLoading(true);
    //   const response = await AUTH_SERVICE.login(data);

    //   if(response.status === "success") {

    //     const userInfo = {
    //       "role": response.data.role,
    //       "name": response.data.name,
    //       "isLoggedIn": true
    //     };

    //     setToken(response.data.token);
    //     dispatch(setUserLoginDetails(
    //       {
    //         user: userInfo
    //       }
    //     ));
    //   }
    // }catch(error) {
    //   console.log("error in Login handleFormSubmit -> ", error);
    // } 
    setLoading(false);
  }

  return (
    <div className="bootstrapContainer" >
      <div className="loginFormContainerDiv" >
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Grid container spacing={4} >
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
              <Typography className="formLabel">
                Password
              </Typography>

              <Controller
                name="password"
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
                    placeholder="enter password"
                    inputProps={{
                      type: "password"
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item md={12} xs={12} sm={12} >
              <Button className="loginButton" type="submit" fullWidth endIcon={loading && <CircularProgress size={20} />} disabled={loading} >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  )
}

export default Login;