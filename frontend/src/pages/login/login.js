import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LinkButton from "@mui/material/Link";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleLogin from "react-google-login";

//
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//
import { login } from "../../redux/actions/userActions";
import Header from "../../components/header";
import Bar from "../../components/snackbar";

const theme = createTheme();

export const Login = () => {
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
    alert("something went Wrong");
  };
  const handleLogin = (data) => {
    console.log(data);
  };
  ///
  return (
    <React.Fragment>
      <Header />
      <div style={{ marginTop: 80 }}>
        {error && <Bar message={error} severity='error' />}
        <ThemeProvider theme={theme}>
          <Container component='main' maxWidth='xs'>
            <CssBaseline />

            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading && <CircularProgress color='warning' />}
                  {!loading && "Sign In"}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to='' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <LinkButton component={Link} to='/SignUp' variant='body2'>
                      {"Don't have an account? Sign Up"}
                    </LinkButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
};
