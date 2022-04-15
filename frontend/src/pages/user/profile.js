import React from "react";

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

  const userDetails = useSelector((state) => state.userDetails);
  const updateProfile = useSelector((state) => state.updateProfile);
  const { user, loading, error } = userDetails;
  const data = localStorage.getItem("userInfo");

  const [firstnamevalid, setfirstnamevalid] = React.useState(true);
  const [lastnamevalid, setlastnamevalid] = React.useState(true);
  const [users, setUser] = React.useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  React.useEffect(() => {
    if (!data) {
      navigate("/");
    }
    dispatch(getUserDetails());
  }, [updateProfile,data, navigate]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName } = user;
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
        <Item>
          {loading && <CircularProgress />}
          <Grid container spacing={5}>
            <Grid item xs={5}>
              <div align='center'>
                <h3>Edit Your Details</h3>
                <Box
                  component='form'
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 3 }}
                >
                  <Grid item xs={12}>
                    <TextField
                      required
                      id='firstName'
                      label='First Name'
                      name='firstName'
                      defaultValue={user?.firstName}
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
                  <Grid item xs={12}>
                    <TextField
                      required
                      id='lastName'
                      label='Last Name'
                      name='lastName'
                      size='small'
                      color='warning'
                      defaultValue={user?.lastName}
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
                          size='small'
                          component='span'
                        >
                          Avtar
                        </Button>
                      </label>
                    </Stack>
                  </Grid>
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save
                  </Button>
                </Box>
              </div>
            </Grid>

            <Grid item xs={5} borderLeft={"2px solid grey"}>
              <div align='center'>
                <h3>Your Details</h3>
                <Avatar
                  src='/static/images/avatar/1.jpg'
                  sx={{
                    width: 120,
                    height: 120,
                    marginRight: "10px",
                  }}
                  style={{
                    border: "3px solid  white",
                  }}
                />
                <Typography
                  variant='h5'
                  component='div'
                  style={{ color: "#f77f3e" }}
                  fontWeight='5rem'
                >
                  {user?.firstName}&nbsp;
                  {user?.lastName}
                </Typography>
                <Typography variant='h6' style={{ color: "#f77f3e" }}>
                  Email:{user?.email}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Item>
      </div>
    </>
  );
};
