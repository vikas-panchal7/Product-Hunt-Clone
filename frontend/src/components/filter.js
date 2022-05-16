import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Divider, Grid } from "@mui/material";

export default function Filters(props) {
  const [checked, setChecked] = React.useState([]);

  const handlechek = (event) => {
    const d = event.target.value;
    const data = checked.findIndex((item) => item == d);
    if (data === -1) checked.push(d);
    if (data != -1) checked.splice(data, 1);
    props.onGetData(checked);
  };
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Grid item xs={4}>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                value='Entertainment'
                onChange={handlechek}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            }
            key='Entertainment'
            label='Entertainment'
          />
          <FormControlLabel
            control={
              <Checkbox
                value='Finance'
                onChange={handlechek}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            }
            key='Finance'
            label='Finance'
          />

          <FormControlLabel
            control={
              <Checkbox
                value='Marketing'
                onChange={handlechek}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            }
            key='Marketing'
            label='Marketing'
          />
          <FormControlLabel
            control={
              <Checkbox
                value='Other'
                onChange={handlechek}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            }
            key='Other'
            label='Other'
          />
        </FormGroup>
      </Grid>
      <Grid item xs={4}>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                value='Tech'
                onChange={handlechek}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            }
            key='Tech'
            label='Tech'
          />
          <FormControlLabel
            control={
              <Checkbox
                value='Development'
                onChange={handlechek}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            }
            key='Development'
            label='Development'
          />

          <FormControlLabel
            control={
              <Checkbox
                value='Photography'
                onChange={handlechek}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            }
            key='Photography'
            label='Photography'
          />
        </FormGroup>
      </Grid>
      <Grid item xs={4}>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                value='Design'
                onChange={handlechek}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            }
            key='Design'
            label='Design'
          />
          <FormControlLabel
            control={
              <Checkbox
                value='Education'
                onChange={handlechek}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            }
            key='Education'
            label='Education'
          />

          <FormControlLabel
            control={
              <Checkbox
                value='Productivity'
                onChange={handlechek}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            }
            label='Productivity'
            key='Productivity'
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
