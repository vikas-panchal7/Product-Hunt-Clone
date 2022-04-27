import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LinkButton from "@mui/material/Link";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import GoogleLogin from "react-google-login";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//
import { login } from "../../redux/actions/userActions";
import Header from "../../components/header";
import Bar from "../../components/snackbar";

import logingif from "../../assets/images/loggin.gif";

const theme = createTheme();

export const Loggin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [emailvalid, setemailvalid] = React.useState(true);
  const [passwordvalid, setpasswordvalid] = React.useState(true);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const emailchangeHandler = (event) => {
    const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    const value = event.currentTarget.value.trim();
    !regex.test(value) ? setemailvalid(false) : setemailvalid(true);
  };

  const passwordchangeHandler = (event) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const value = event.currentTarget.value.trim();
    !regex.test(value) ? setpasswordvalid(false) : setpasswordvalid(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = user;
    if (email === "" || password === "") {
      if (email === "") setemailvalid(false);
      if (password === "") setpasswordvalid(false);
    } else {
      dispatch(login({ ...user }));
    }
  };

  //login with google option
  const handleFailure = (result) => {
    return;
  };
  const handleLogin = (data) => {
    console.log(data.profileObj);
    const { email, name: firstName, googleId } = data.profileObj;
    dispatch(login({ email, firstName, googleId }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${logingif})`,
            maxHeight: "90%",
            maxWidth: "90%",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {error && (
              <Bar
                message={error}
                severity='error'
                vertical='top'
                horizontal='right'
              />
            )}

            <Avatar sx={{ m: 1, bgcolor: "warning.main" }}></Avatar>
            <Typography component='h1' variant='h5'>
              Login
            </Typography>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText='Log In With Google'
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={user.email}
                onBlur={emailchangeHandler}
                onChange={handleChange}
                error={!emailvalid && true}
                helperText={!emailvalid && "Please Enter Valid Email !!"}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={user.password}
                autoComplete='current-password'
                onBlur={passwordchangeHandler}
                onChange={handleChange}
                error={!passwordvalid && true}
                helperText={
                  !passwordvalid &&
                  "Password Must Contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
                }
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                disabled={!emailvalid || !passwordvalid}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading && <CircularProgress color='warning' />}
                {!loading && "Sign In"}
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <LinkButton component={Link} to='/register' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </LinkButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
