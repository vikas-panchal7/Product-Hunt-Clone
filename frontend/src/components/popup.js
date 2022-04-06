import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Login } from "../pages";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

export const Popup = (props) => {
  const [open, setOpen] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{
          my: 2,
          color: "black",
          display: "block",
          alignSelf: "right",
        }}
      >
        Open Popup
      </Button>
      <Dialog
        sx={{
          backdropFilter: "blur(0.5px)",

          //other styles here
        }}
        PaperProps={{
          sx: {
            minHeight: "90%",
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
          <Button onClick={handleClose}>
            <CloseIcon align='left'></CloseIcon>
          </Button>
        </DialogTitle>
        <DialogContent>
          <h1>jkjk</h1>
        </DialogContent>
      </Dialog>
    </div>
  );
};
