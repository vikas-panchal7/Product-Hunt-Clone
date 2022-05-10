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
import { useNavigate, useParams } from "react-router-dom";
import { UserChangePassword } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const theme = createTheme();

export const ChangePassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.ChangePassword);
  const [password, setpassword] = React.useState("");
  const [passwordvalid, setpasswordvalid] = React.useState(true);
  const [confirmpasswordvalid, setconfirmpasswordvalid] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const passwordchangeHandler = (event) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const value = event.currentTarget.value.trim();
    !regex.test(value) ? setpasswordvalid(false) : setpasswordvalid(true);
    passwordvalid && setpassword(event.currentTarget.value.trim());
  };

  const confirmpasswordchangeHandler = (event) => {
    const value = event.currentTarget.value.trim();
    setconfirmpasswordvalid(false);
    password === value && setconfirmpasswordvalid(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    password === "" && setpasswordvalid(false);
    console.log(passwordvalid, confirmpasswordvalid);
    passwordvalid &&
      confirmpasswordvalid &&
      dispatch(UserChangePassword({ id: id, password: password }));
  };

  React.useEffect(() => {
    if (success) {
      navigate("/loggin", { replace: true });
    }
  }, [success, navigate]);

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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  sx={{ mt: 2 }}
                  color='warning'
                  require
                  placeholder='Enter New Password'
                  fullWidth
                  margin='dense'
                  name='New Password'
                  label='New Password'
                  type={showPassword ? "text" : "password"}
                  id='New Password'
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  autoComplete='New Password'
                  onChange={passwordchangeHandler}
                  error={!passwordvalid && true}
                  helperText={
                    !passwordvalid &&
                    "Password Must Contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
                  }
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
                  placeholder='Enter New Password'
                  name='Confirm New Password'
                  label='Confirm New Password'
                  type={showPassword ? "text" : "password"}
                  id='Confirm New Password'
                  autoComplete='Confirm New Password'
                  onChange={confirmpasswordchangeHandler}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!confirmpasswordvalid && true}
                  helperText={!confirmpasswordvalid && "Password Do Not Match"}
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
