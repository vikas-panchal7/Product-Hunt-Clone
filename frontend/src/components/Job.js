import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

//
const Job = (props) => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handlelike = (p) => {
    if (userInfo) {
      window.open(p, "_blank");
    } else {
      navigate("/loggin");
    }
  };

  return (
    <div>
      <Paper
        sx={{
          p: 2,
          margin: "4px",
          maxWidth: "93%",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          "&:hover": {
            background: "#E8E8E8",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 100, height: 100 }}>
              <Img alt='A' src={`${process.env
                        .REACT_APP_URL}/${props?.logo}`} />
            </ButtonBase>
          </Grid>
          <Grid item xs={8} sm container>
            <Grid
              item
              xs
              container
              direction='column'
              spacing={2}
              justifyContent={"space-between"}
            >
              <Grid item xs>
                <Typography
                  marginTop={"-10px"}
                  component='div'
                  fontSize={"15px"}
                  color={"CaptionText "}
                >
                  {props?.company}
                </Typography>
                <Typography
                  marginTop={"5px"}
                  component='div'
                  color={"CaptionText "}
                >
                  <b>{props?.title}</b>
                </Typography>
                <Typography
                  marginTop={"5px"}
                  marginBottom={"1px"}
                  component='div'
                  fontSize={"15px"}
                >
                  {props?.tagline}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1' component='div'>
                <Button
                  variant='outlined'
                  style={{
                    marginTop: "10px",
                    borderRadius: 10,
                    fontSize: "15px",
                    color: "#544d4d",
                  }}
                  color='warning'
                  onClick={(e) => {
                    handlelike(props.link);
                  }}
                >
                  <b>Apply</b>
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Job;
