import { useState } from "react";
import useGlobalState from "../store";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AUTH_SERVICE } from "../services/auth.service";
import { setUserLoginDetails } from "../store/actions";
import { setToken } from "../helpers/common.helpers";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

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
        "role": "user",
        "name": "Ashish Kumar",
      },
      "isLoggedIn": true
    };
    dispatch(setUserLoginDetails(
      {
        user: userInfo
      }
    ));
    if(userInfo.details.role === "user") {
      navigate("/home");
    }else {
      navigate("/");
    }

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
    <Layout>
      <div className="bootstrapContainer" >
        <div className="loginFormContainerDiv" >
          <p className="loginFormTitle" >Online Voting System</p>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <p className="loginFormTitle" >Login</p>
            <Grid container >
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

              <Box display="flex" justifyContent="flex-end" mt={3} width={1} >
                <Link to="/register" className="registerText" >
                  Register
                </Link>
              </Box>
            </Grid>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login;