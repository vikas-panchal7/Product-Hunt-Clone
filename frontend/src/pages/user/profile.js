import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Header from "../../components/header";
import { Avatar, Divider } from "@mui/material";
import { styled } from "@mui/material";
import { Paper } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "transparent" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

const Input = styled("input")({
  display: "none",
});

export const Profile = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: 80 }}>
        <Item>
          <Grid container spacing={5} marginLeft={2}>
            <Grid item xs={5}>
              <h3 align='center'>Edit Your Details</h3>
              <Box component='form' noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='firstName'
                      label='First Name'
                      name='firstName'
                      autoComplete='given-name'
                      size='small'
                      autoFocus
                      margin='dense'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='lastName'
                      label='Last Name'
                      name='lastName'
                      size='small'
                      autoComplete='family-name'
                      margin='dense'
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Stack direction='row' alignItems='center' spacing={2}>
                      <label htmlFor='contained-button-file'>
                        <Input
                          accept='image/*'
                          id='contained-button-file'
                          type='file'
                        />
                        <Button variant='contained' component='span'>
                          Image
                        </Button>
                      </label>
                    </Stack>
                  </Grid>
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>
              </Box>
            </Grid>

            <Grid item xs={7}>
              <div align='center'>
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
                  variant='h4'
                  component='div'
                  style={{ color: "#ffffff" }}
                  fontWeight='5rem'
                >
                  Vikas Panchal
                </Typography>
                <Typography variant='h6' style={{ color: "#ffffff" }}>
                  Email:panchalvikas292000@gmail.com
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Item>
      </div>
    </>
  );
};
