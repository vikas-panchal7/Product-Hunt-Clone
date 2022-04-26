import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Header from "../../components/header";
import { Avatar, Divider } from "@mui/material";
import { styled } from "@mui/material";
import { Paper } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserProfile,
  getUserDetails,
} from "../../redux/actions/userActions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "transparent" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

const Input = styled("input")({
  display: "none",
});

export const Profile = () => {
  const formData = new FormData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateProfile = useSelector((state) => state.updateProfile);
  const data = localStorage.getItem("userInfo");
  const userDetails = useSelector((state) => state.userDetails);

  const { user, loading, error } = userDetails;

  React.useEffect(() => {
    if (!data) {
      navigate("/");
    }

    dispatch(getUserDetails());
  }, [updateProfile, data, navigate]);

  const [firstnamevalid, setfirstnamevalid] = React.useState(true);
  const [lastnamevalid, setlastnamevalid] = React.useState(true);
  const [users, setUser] = React.useState({});

  const onSelectImage = (event) => {
    formData.append("avtar", event.target.files[0]);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...users,
      [name]: value,
    });
  };

  React.useEffect(() => {
    if (user) {
      setUser({
        ...users,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [user]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName } = users;
    if (firstName === "" || lastName === "") {
      if (firstName === "") setfirstnamevalid(false);
      if (lastName === "") setlastnamevalid(false);
    } else {
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      dispatch(updateUserProfile(formData));
    }
  };

  return (
    <>
      <Header />
      <div style={{ marginTop: 80 }}>
        {loading && <CircularProgress />}
        <Grid item>
          <div align='center'>
            <h3>Your Details</h3>
            <Avatar
              alt={user?.firstName}
              src={`http://192.168.200.122:5000/${user?.avtar}`}
              sx={{
                width: 150,
                height: 150,
                marginRight: "10px",
              }}
              style={{
                border: "2px solid  #DC5425",
              }}
            />
            &nbsp; &nbsp;
            <Grid item xs={12}>
              <Stack>
                <label htmlFor='contained-button-file'>
                  <Input
                    accept='image/*'
                    id='contained-button-file'
                    type='file'
                    onChange={onSelectImage}
                  />
                  <Button
                    variant='outlined'
                    color='warning'
                    size='small'
                    component='span'
                  >
                    upload Image
                  </Button>
                </label>
              </Stack>
            </Grid>
            &nbsp;&nbsp;
            <Typography
              variant='h5'
              component='div'
              style={{ color: "#33322f" }}
              fontWeight='5rem'
            >
              {user?.firstName}&nbsp;
              {user?.lastName}
            </Typography>
            <Typography style={{ color: "#a6a097" }}>{user?.email}</Typography>
          </div>
        </Grid>

        {user && (
          <Grid item xs={12}>
            <div align='center'>
              <h3>Edit Your Details</h3>
              <Box
                component='form'
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 3 }}
              >
                <Grid
                  item
                  xs={6}
                  display='flex'
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                >
                  <Grid item sm={6}>
                    <TextField
                      fullWidth
                      required
                      id='firstName'
                      label='First Name'
                      name='firstName'
                      defaultValue={user.firstName || ""}
                      autoComplete='given-name'
                      size='small'
                      color='warning'
                      margin='dense'
                      onBlur={(event) => {
                        event.currentTarget.value.trim() !== "" &&
                          setfirstnamevalid(true);
                      }}
                      error={!firstnamevalid}
                      helperText={!firstnamevalid && "Please Provide FirstName"}
                      onChange={handleChange}
                    />
                  </Grid>
                  &nbsp;
                  <Grid item sm={6}>
                    <TextField
                      fullWidth
                      required
                      id='lastName'
                      label='Last Name'
                      name='lastName'
                      size='small'
                      color='warning'
                      defaultValue={user.lastName || ""}
                      autoComplete='family-name'
                      margin='dense'
                      onBlur={(event) => {
                        event.currentTarget.value.trim() !== "" &&
                          setlastnamevalid(true);
                      }}
                      error={!lastnamevalid}
                      helperText={!lastnamevalid && "Please Provide LastName"}
                      onChange={handleChange}
                    />
                  </Grid>
                  &nbsp;
                </Grid>
                <Button
                  type='submit'
                  color='warning'
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update Profile
                </Button>
              </Box>
            </div>
          </Grid>
        )}
      </div>
    </>
  );
};
