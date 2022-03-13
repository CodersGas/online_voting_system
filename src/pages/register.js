import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AUTH_SERVICE } from "../services/auth.service";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const ValidationSchema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  phone: yup.string().length(10, "Please enter valid phone number").required("Please enter date of birth"),
  email: yup.string().email("Please enter valid email").required("Please enter email"),
  password: yup.string().min(8, "Password length too short").max(16, "Password too long").required("Please enter the password"),
  isRegistrationStarted: yup.bool(),
  otp: yup.string()
    .when("isRegistrationStarted", {
      is: true,
      then: yup.string().max(6, "Please enter correct OTP").required("Please enter OTP sent to your mobile & email")
    }),
});

const Register = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues
  } = useForm({
    resolver: yupResolver(ValidationSchema)
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    try {
      setValue("isRegistrationStarted", true);
      setLoading(true);
      const response = await AUTH_SERVICE.register(data);

      if (response.status === "success") {
        navigate("/login");
      }
    } catch (error) {
      console.log("error in Login handleFormSubmit -> ", error);
    }
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
            <p className="loginFormTitle" >Register</p>
            <Grid container >
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
                      error={Boolean(error?.message)}
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
                      error={Boolean(error?.message)}
                      helperText={error?.message}
                      placeholder="enter email"
                    />
                  )}
                />
              </Grid>
              <Grid item md={12} xs={12} sm={12} >
                <Typography className="formLabel" >
                  Phone
                </Typography>

                <Controller
                  name="phone"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      value={value || ""}
                      onChange={onChange}
                      error={Boolean(error?.message)}
                      helperText={error?.message}
                      placeholder="enter phone number"
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
                      error={Boolean(error?.message)}
                      helperText={error?.message}
                      placeholder="enter password"
                      inputProps={{
                        type: "password"
                      }}
                    />
                  )}
                />
              </Grid>

              {
                getValues("isRegistrationStarted") &&
                <Grid item md={12} xs={12} sm={12} >
                  <Typography className="formLabel">
                    OTP
                  </Typography>

                  <Controller
                    name="otp"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        fullWidth
                        value={value || ""}
                        onChange={onChange}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                        placeholder="enter otp"
                      />
                    )}
                  />
                </Grid>
              }

              <Grid item md={12} xs={12} sm={12} >
                <Button className="loginButton" type="submit" fullWidth endIcon={loading && <CircularProgress size={20} />} disabled={loading} >
                  Register
                </Button>
              </Grid>

              <Box display="flex" justifyContent="flex-end" mt={3} width={1} >
                <Link to="/login" className="registerText" >
                  Alreday have an account ? Login
                </Link>
              </Box>
            </Grid>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register;