import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LinkButton from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/header";
import Bar from "../../components/snackbar";
import { register } from "../../redux/actions/userActions";

const theme = createTheme();

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailvalid, setemailvalid] = React.useState(true);
  const [passwordvalid, setpasswordvalid] = React.useState(true);
  const [firstnamevalid, setfirstnamevalid] = React.useState(true);
  const [lastnamevalid, setlastnamevalid] = React.useState(true);
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  // React.useEffect(() => {
  //   if (userInfo) {
  //     navigate("/login");
  //   }
  // }, [userInfo, navigate]);

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
    const { firstName, lastName, email, password } = user;
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      if (firstName === "") setfirstnamevalid(false);
      if (lastName === "") setlastnamevalid(false);
      if (email === "") setemailvalid(false);
      if (password === "") setpasswordvalid(false);
    } else {
      dispatch(register({ ...user }));
    }
  };

  return (
    <React.Fragment>
      <Header />
      {error && <Bar message={error} severity='error' />}
      <div style={{ marginTop: 80 }}>
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
                Sign up
              </Typography>
              <Box
                component='form'
                noValidate
                sx={{ mt: 3 }}
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id='firstName'
                      label='First Name'
                      name='firstName'
                      value={user.firstName}
                      autoComplete='given-name'
                      autoFocus
                      onBlur={(event) => {
                        event.currentTarget.value.trim() !== "" &&
                          setfirstnamevalid(true);
                      }}
                      error={!firstnamevalid}
                      helperText={!firstnamevalid && "Please Provide FirstName"}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id='lastName'
                      label='Last Name'
                      name='lastName'
                      value={user.lastName}
                      autoComplete='family-name'
                      onBlur={(event) => {
                        event.currentTarget.value.trim() !== "" &&
                          setlastnamevalid(true);
                      }}
                      error={!lastnamevalid}
                      helperText={!lastnamevalid && "Please Provide FirstName"}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='email'
                      label='Email Address'
                      name='email'
                      value={user.email}
                      autoComplete='email'
                      onBlur={emailchangeHandler}
                      error={!emailvalid && true}
                      helperText={!emailvalid && "Please Enter Valid Email !!"}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type='password'
                      id='password'
                      autoComplete='new-password'
                      value={user.password}
                      onBlur={passwordchangeHandler}
                      error={!passwordvalid && true}
                      helperText={
                        !passwordvalid &&
                        "Password Must Contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
                      }
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading && <CircularProgress color='warning' />}
                  {!loading && "Sign Up"}
                </Button>
                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <LinkButton component={Link} to='/Login' variant='body2'>
                      Already have an account? Sign in
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
