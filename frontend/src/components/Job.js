import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createProductLike } from "../redux/actions/productActions";
import { Button } from "@mui/material";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const Job = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handlelike = (event) => {
    /* event.stopPropagation();
    if (userInfo) {
      dispatch(createProductLike({ id: props.id, type: props.liketype }));
    } else {
      navigate("/login");
    } */
  };

  const clickHandler = (event) => {
    /*  navigate(`/product/details/${props.id}`); */
  };
  return (
    <div onClick={clickHandler}>
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
            <ButtonBase sx={{ width: 50, height: 50 }}>
              <Img alt='A' src={`http://192.168.200.122:5000/${props?.img}`} />
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
                  marginTop={"-15px"}
                  component='div'
                  color={"CaptionText "}
                >
                  {props?.title} Title
                </Typography>
                <Typography
                  marginTop={"5px"}
                  component='div'
                  color={"CaptionText "}
                >
                  {props?.title} <b>Title</b>
                </Typography>
                <Typography
                  marginTop={"5px"}
                  marginBottom={"-5px"}
                  component='div'
                >
                  {props?.tagline} Tagline
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
                >
                  <b>apply</b>
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
