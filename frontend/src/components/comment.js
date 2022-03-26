import React from "react";
import ReactDOM from "react-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import { borderLeft, Box } from "@mui/system";
import { Button } from "@mui/material";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export const Comments = () => {
  return (
    <div style={{ padding: 14 }} className='App'>
      <h1>Comments</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          border: "1px solid grey",
          padding: "10px",
        }}
      >
        <TextField
          fullWidth
          color='warning'
          size='small'
          placeholder='What Do Yo Think About This Product'
          InputProps={{ style: { fontSize: 13 } }}
        />
        &nbsp;&nbsp;
        <Button variant='outlined' size='small' color='warning'>
          Send
        </Button>
      </Box>
      <Paper style={{ padding: "40px 20px" }}>
        <Grid
          container
          wrap='nowrap'
          spacing={2}
          sx={{ flexDirection: "column", borderLeft: "1px solid grey" }}
        >
          <Grid item>
            <Avatar alt='Remy Sharp' src={imgLink} />
          </Grid>
          <Grid justifyContent='left' item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor..{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>{" "}
            <Grid
              justifyContent='left'
              item
              xs
              zeroMinWidth
              sx={{
                paddingLeft: 10,
                borderLeft: "1px solid",
              }}
            >
              <Grid item>
                <Avatar alt='Remy Sharp' src={imgLink} />
              </Grid>
              <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
              <p style={{ textAlign: "left" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus. Duis bibendum ac ex vehicula
                laoreet. Suspendisse congue vulputate lobortis. Pellentesque at
                interdum tortor..{" "}
              </p>
              <p style={{ textAlign: "left", color: "gray" }}>Reply</p>
            </Grid>
            <Grid
              justifyContent='left'
              item
              xs
              zeroMinWidth
              sx={{
                paddingLeft: 10,
                borderLeft: "1px solid",
              }}
            >
              <Grid item>
                <Avatar alt='Remy Sharp' src={imgLink} />
              </Grid>
              <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
              <p style={{ textAlign: "left" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus. Duis bibendum ac ex vehicula
                laoreet. Suspendisse congue vulputate lobortis. Pellentesque at
                interdum tortor..{" "}
              </p>
              <p style={{ textAlign: "left", color: "gray" }}>
                posted 1 minute ago
              </p>
            </Grid>
          </Grid>
        </Grid>
        <Divider variant='fullWidth' style={{ margin: "30px 0" }} />
        <Grid container wrap='nowrap' spacing={2}>
          <Grid item>
            <Avatar alt='Remy Sharp' src={imgLink} />
          </Grid>
          <Grid justifyContent='left' item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
        <Divider variant='fullWidth' style={{ margin: "30px 0" }} />
      </Paper>
    </div>
  );
};
