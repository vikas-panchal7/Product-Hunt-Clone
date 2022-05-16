import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Paginate(props) {
  const handleChange = (event, value) => {
    let limit = props.limit || 2;
    const skip = limit * (value - 1);
    props.getPage({ limit, skip, value });
  };

  return (
    <Stack spacing={2} alignItems={"center"} marginTop={7}>
      <Pagination
        count={Math.ceil(props.count / props.limit) || 0}
        page={props.page}
        onChange={handleChange}
      />
    </Stack>
  );
}
