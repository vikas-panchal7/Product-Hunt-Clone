import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { listProducts } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

export default function Footer(props) {
  const dispatch = useDispatch();
  const { loading, products, error, count } = useSelector(
    (state) => state.productList
  );

  React.useEffect(() => {
    console.log("from footter");
  }, [products]);
  const [page, setpage] = React.useState("");
  const [skip, setskip] = React.useState("");

  const handlepage = (item) => {
    item.selected && setpage(item.page);
    const temp = props.limit * (parseInt(page) - 1);
    setskip(temp);
    console.log("page & skip", page, skip);
  };
  return (
    <Stack spacing={2} alignItems={"center"}>
      <Pagination
        count={parseInt(count / props.limit)}
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
