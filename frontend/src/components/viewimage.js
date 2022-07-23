import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import { useTheme } from "@mui/material/styles";

const ViewImage = (props) => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose(false);
  };

  return (
    <div>
      <Dialog
        sx={{
          backdropFilter: "blur(1px)",

          //other styles here
        }}
        PaperProps={{
          sx: {
            minHeight: "80%",
            maxHeight: "95%",
            minWidth: "50%",
            maxWidth: "60%",
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogContentText>
          <img
            src={`${process.env
                        .REACT_APP_URL}/${props.img}`}
            width='100%'
            height='100%'
            alt='A'
          />
        </DialogContentText>
      </Dialog>
    </div>
  );
};

export default ViewImage;
