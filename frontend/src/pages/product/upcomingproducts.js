import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, Divider } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";

import Product from "../../components/product";
import { upcomingProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "transparent" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

export const UpcomingProducts = () => {
  const dispatch = useDispatch();
  const productUpcominglist = useSelector((state) => state.productUpcominglist);
  const { loading, products, error } = productUpcominglist;
  const [productarr, setProductarr] = React.useState([]);
  const [page, setpage] = React.useState(1);

  React.useEffect(() => {
    dispatch(upcomingProducts());
  }, [dispatch]);

  React.useEffect(() => {
    setProductarr(products);
  }, [products]);
  const handlepage = (event) => {
    if (event.currentTarget.value == -1 && page != 0) {
      setpage(Math.round(page + parseInt(event.currentTarget.value)));
    }
    if (event.currentTarget.value == 1 && page >= 0) {
      setpage(Math.round(page + parseInt(event.currentTarget.value)));
    }
    let limit = 2;
    const skip = limit * (page - 1);
    console.log(page, limit);
    if (page !== 0) {
      dispatch(upcomingProducts(limit, skip));
    }
  };

  return (
    <div>
      <Item justifycontent='flex-end'>
        <Divider textAlign='left'>
          <b>Upcoming Products</b>
        </Divider>
        {loading && <CircularProgress />}
        {productarr.map((product) => (
          <Product
            key={product._id}
            id={product._id}
            title={product.name}
            tagline={product.tagline}
            img={product.img}
            likes={product.likes.length}
          />
        ))}
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Button value='-1' onClick={handlepage}>
            <ArrowBackIosIcon />
          </Button>
          <Button value='1' onClick={handlepage}>
            <ArrowForwardIosIcon />
          </Button>
        </Box>
      </Item>
    </div>
  );
};
