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
import Job from "./Job";

//

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

export const JobView = (props) => {
  console.log("job view", props);
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
          {" 👋 Your Job View"}

          <Button onClick={handleClose}>
            <CloseIcon align='left'></CloseIcon>
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Job
                  key={props.data._id}
                  title={props.data.jobtitle}
                  tagline={props.data.companytagline}
                  company={props.data.companyname}
                  logo={props.data.logo}
                  link={props.data.joblink}
                />
              </Grid>

              <Grid item xs={12} marginLeft='7px'>
                <div>Tagline</div>
                <div>{props.data.companytagline}</div>
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
                  Company Name: <b>{props.data.companyname}</b>
                </div>

                <div>
                  Job Title : <b>{props.data.jobtitle}</b>
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
                      props.data?.logo || "uploads/avt1650979607692A861.png"
                    } `}
                    alt='A'
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
