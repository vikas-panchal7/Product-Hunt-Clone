import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import red from "@mui/material/colors/red";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const Product = (props) => {
  const navigate = useNavigate();
  const clickHandler = () => {
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
            background: "#fff9e6",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 50, height: 50 }}>
              <Img
                alt='A'
                src='https://media1.giphy.com/media/YWUpVw86AtIbe/200.webp?cid=ecf05e47psf69u1n7odvqtp154u7m86u0fzu7s8d0uaobq9e&rid=200.webp&ct=g'
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
                <p>
                  <FavoriteIcon style={{ color: "grey" }} />
                  {props.likes}
                </p>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Product;
