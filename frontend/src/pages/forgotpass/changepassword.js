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
import OTPInput, { ResendOTP } from "otp-input-react";
import { color } from "@mui/system";

const theme = createTheme();

export const ChangePassword = () => {
  const [otp, setOtp] = React.useState("");
  const otpChange = (otps) => {
    setOtp(otps);
  };
  const handleSubmit = (event) => {
    console.log("ss", otp);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
            <LockResetIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Change Password
          </Typography>
        </Box>

        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Typography>ENTER OTP:-</Typography>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <OTPInput
                  value={otp}
                  onChange={otpChange}
                  autoFocus
                  OTPLength={5}
                  otpType='number'
                  disabled={false}
                  inputStyles={{ border: " 1px solid orange" }}
                />
                <br></br>
                <ResendOTP
                  onResendClick={() => console.log("Resend clicked")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  sx={{ mt: 2 }}
                  color='warning'
                  required
                  placeholder='Enter New Password'
                  fullWidth
                  margin='dense'
                  name='New Password'
                  label='New Password'
                  type='New Password'
                  id='New Password'
                  autoComplete='New Password'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  color='warning'
                  required
                  margin='dense'
                  fullWidth
                  name='Confirm New Password'
                  label='Confirm New Password'
                  type='Confirm New Password'
                  id='Confirm New Password'
                  autoComplete='Confirm New Password'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                color='warning'
                fullWidth
                variant='outlined'
                sx={{ mt: 2, mb: 1 }}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
