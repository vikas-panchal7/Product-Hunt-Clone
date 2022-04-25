import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";

const filter = [
  "Tech",
  "Productivity",
  "Marketing",
  "Education",
  "Entertainment",
  "Finance",
  "Development",
  "Photography",
  "Design",
  "Other",
];
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
    <Box display='flex' justifyContent='center'>
      <FormGroup>
        {filter.map((filter, index) => (
          <FormControlLabel
            control={
              <Checkbox
                value={filter}
                onChange={handlechek}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            }
            key={index}
            label={filter}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
