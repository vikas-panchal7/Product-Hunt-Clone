import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Bar = (props) => {
  const [state, setState] = React.useState({
    open: true,
    vertical: props.vertical ? props.vertical : "top",
    horizontal: "center",
    severity: props.severity ? props.severity : "warning",
  });

  const { vertical, horizontal, open, severity } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar
        sx={{
          minWidth: 400,
          height: "28%",
        }}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={props.timeout ? props.timeout : 3000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity={props.severity ? props.severity : "info"}
          sx={{ width: "100%" }}
        >
          {props.message ? props.message : "Something Went Wrong"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Bar;
