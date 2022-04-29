import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
//import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import LinkButton from "@mui/material/Link";
//
import Product from "./product";
import { Link } from "@mui/material";

//

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

export const JobView = (props) => {
  console.log("post", props);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant='outlined'
        color='warning'
        size='small'
        onClick={handleClickOpen}
        sx={{
          my: 2,
          color: "black",
          display: "block",
          alignSelf: "right",
        }}
      >
        {props.name}
      </Button>
      <Dialog
        sx={{
          backdropFilter: "blur(1px)",

          //other styles here
        }}
        PaperProps={{
          sx: {
            minHeight: "200",
            maxHeight: "90%",
            minWidth: "45%",
            maxWidth: "50%",
            backgroundColor: "#F0F0F0",
          },
        }}
        //fullWidth={true}
        //maxWidth={"md"}
        //fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title' align='center'>
          {" Your Product View"}

          <Button onClick={handleClose}>
            <CloseIcon align='left'></CloseIcon>
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Product
                  key={props.data._id}
                  id={props.data._id}
                  title={props.data.name}
                  tagline={props.data.tagline}
                  img={props.data.img}
                  likes={props.data.likes.length}
                />
              </Grid>

              <Grid item xs={12} marginLeft='7px'>
                <div>Description</div>
                <div>{props.data.description}</div>
              </Grid>

              <Grid
                item
                xs={12}
                marginLeft='5px'
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <div>
                  Total Likes : <b>{props.data.likes?.length}</b>
                </div>
                <div>For Live View Click on Product</div>
                <div>
                  Total Comments : <b>{props.data.comment?.length}</b>
                </div>
              </Grid>

              <Grid
                item
                xs={12}
                marginLeft='5px'
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-around"}
              >
                <div>
                  <img
                    style={{
                      height: "150px",
                      width: "150px",
                    }}
                    src={`http://192.168.200.122:5000/${
                      props.data.img || "uploads/avt1650979607692A861.png"
                    } `}
                    alt='A'
                  />
                </div>
                <div>
                  <img
                    style={{
                      height: "150px",
                      width: "150px",
                    }}
                    src={`http://192.168.200.122:5000/${
                      props.data.img1 || "uploads/avt1650979607692A861.png"
                    } `}
                    alt='B'
                  />
                </div>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
