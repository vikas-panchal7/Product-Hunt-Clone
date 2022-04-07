import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";

export default function Paginate(props) {
  const productlist = useSelector((state) => state.productList);
  const { loading, products, error, count } = productlist;
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    let limit = props.limit || 2;
    setPage(value);
    const skip = limit * (value - 1);
    dispatch(listProducts({ limit, skip }));
  };

  return (
    <Stack spacing={2} alignItems={"center"} marginTop={7}>
      <Pagination
        count={Math.round(count / props.limit) || 0}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}
