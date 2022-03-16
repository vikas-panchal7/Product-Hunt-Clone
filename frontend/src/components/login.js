import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Header from "../screens/header";

const theme = createTheme();

const Login = () => {
  const [emailvalid, setemailvalid] = React.useState(true);
  const [passwordvalid, setpasswordvalid] = React.useState(true);
  const emailchangeHandler = (event) => {
    const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    const value = event.currentTarget.value.trim();
    !regex.test(value) ? setemailvalid(false) : setemailvalid(true);
  };
  const passwordchangeHandler = (event) => {
    const value = event.currentTarget.value.trim();
    value.length < 8 ? setpasswordvalid(false) : setpasswordvalid(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.get("http://localhost:4000/signup").then((res) => {
      console.log(res);
    });
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <React.Fragment>
      <Header />
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
                Login
              </Typography>
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
                  autoFocus
                  onBlur={emailchangeHandler}
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
                  autoComplete='current-password'
                  onBlur={passwordchangeHandler}
                  error={!passwordvalid && true}
                  helperText={
                    !passwordvalid &&
                    "Password Must be Minimum eight characters long"
                  }
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='#' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='/SignUp' variant='body2'>
                      {"Don't have an account? Sign Up"}
                    </Link>
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

export default Login;
