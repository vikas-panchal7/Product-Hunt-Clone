import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockResetIcon from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import LinkButton from "@mui/material/Link";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import catimg from "../../assets/images/cat.png";
import { forgotPassword } from "../../redux/actions/userActions";
const theme = createTheme();

export const ForgotPassword = () => {
  const [emailvalid, setemailvalid] = React.useState(true);
  const [email, setemail] = React.useState("");
  const [submit, setsubmit] = React.useState(false);
  const dispatch = useDispatch();
  const emailchangeHandler = (event) => {
    const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    const value = event.currentTarget.value.trim();
    !regex.test(value) ? setemailvalid(false) : setemailvalid(true);
    emailvalid && setemail(event.currentTarget.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "") setemailvalid(false);
    emailvalid && dispatch(forgotPassword({ email: email }));
    setsubmit(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />

        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={catimg}
            sizes='20px'
            style={{
              border: "2px solid  #DC5425",
              alignSelf: "left",
            }}
            sx={{ width: 100, height: 100 }}
          ></Avatar>
          <Typography component='h1' variant='h5' sx={{ mt: 1 }}>
            Reset Password
          </Typography>
          {!submit && (
            <Typography component='h5' sx={{ mt: 1, color: "gray" }}>
              Enter your email address below and we'll send you a link to reset
              your password.
            </Typography>
          )}
        </Box>
        {!submit && (
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ minHeight: "400px" }}
          >
            <br />

            <FormControl fullWidth>
              <TextField
                color='warning'
                onChange={emailchangeHandler}
                placeholder='Please Enter Your Email '
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                error={!emailvalid && true}
                helperText={!emailvalid && "Please Enter Valid Email !!"}
              />
            </FormControl>
            <Button
              type='submit'
              color='warning'
              fullWidth
              variant='outlined'
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        )}
        {submit && (
          <Box sx={{ border: "1px solid orange", borderRadius: "5px", mt: 3 }}>
            <Typography component='div' sx={{ margin: 1, color: "gray" }}>
              Check your inbox for the next steps. If you don't receive an
              email, and it's not in your spam folder this could mean you signed
              up with a different address.
            </Typography>
          </Box>
        )}
        <Grid container sx={{ mt: 1 }}>
          <Grid item xs>
            <LinkButton component={Link} to='/loggin' variant='body2'>
              {"Sign In"}
            </LinkButton>
          </Grid>
          <Grid item>
            <LinkButton component={Link} to='/register' variant='body2'>
              {"Don't have an account? Sign Up"}
            </LinkButton>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
