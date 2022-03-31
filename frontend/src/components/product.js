import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const Product = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlelike = (event) => {
    event.stopPropagation();
  };
  const clickHandler = (event) => {
    console.log(event);
    navigate(`/products/${props.id}`);
  };
  return (
    <div onClick={clickHandler}>
      <Paper
        sx={{
          p: 2,
          margin: "4px",
          maxWidth: 600,
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
              <Img
                alt={`http://localhost:4000/${props.img}`}
                src={`http://localhost:4000/${props.img}`}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={8} sm container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant='subtitle1' component='div'>
                  {props.title}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {props.tagline}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1' component='div'>
                <ButtonBase sx={{ width: 50, height: 50 }} onClick={handlelike}>
                  <FavoriteIcon style={{ color: "#ff4000", fontSize: 40 }} />
                </ButtonBase>
                {props.likes}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Product;
