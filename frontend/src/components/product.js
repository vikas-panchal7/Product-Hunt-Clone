import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { createProductLike } from "../redux/actions/productActions";
import { Stack } from "@mui/material";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const Product = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handlelike = (event) => {
    event.stopPropagation();
    if (userInfo) {
      dispatch(createProductLike({ id: props.id, type: props.liketype }));
    } else {
      navigate("/loggin");
    }
  };

  const clickHandler = (event) => {
    navigate(`/product/details/${props.id}`);
  };
  return (
    <div onClick={clickHandler}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
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
              <Img alt='A' src={`http://192.168.200.122:5000/${props.img}`} />
            </ButtonBase>
          </Grid>
          <Grid item xs={8} sm container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant='subtitle1'
                  component='div'
                  color={"CaptionText "}
                >
                  {props.title}
                </Typography>
                <Typography variant='body2' component='div' gutterBottom>
                  {props.tagline}
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Paper variant='outlined'>
                <ButtonBase
                  sx={{
                    width: 50,
                    height: 50,
                    // p: "32px",
                    // border: "1px solid grey",
                    // borderRadius: "0.5em",
                  }}
                  onClick={handlelike}
                >
                  <Stack
                    direction={"column"}
                    display={"flex"}
                    marginTop={"-15px"}
                    justifyContent={"space-between"}
                  >
                    <ArrowDropUpIcon
                      style={{
                        color: "#ff4000",
                        fontSize: 50,
                      }}
                    />
                    <Typography
                      component='div'
                      marginTop={"-15px"}
                      style={{ color: "#ff4000" }}
                    >
                      {props.likes}
                    </Typography>
                  </Stack>
                </ButtonBase>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Product;
