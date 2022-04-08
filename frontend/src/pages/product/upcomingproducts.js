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
  let limit = 2;
  const type = "upcoming";
  const dispatch = useDispatch();
  const productUpcominglist = useSelector((state) => state.productUpcominglist);
  const productLike = useSelector((state) => state.productLike);
  const { loading, products, error, page } = productUpcominglist;
  const [productarr, setProductarr] = React.useState([]);
  let pages = page;

  React.useEffect(() => {
    dispatch(upcomingProducts({ limit, pages }));
  }, [dispatch]);

  React.useEffect(() => {
    setProductarr(products);
  }, [products]);
  const handlepage = (event) => {
    if (pages === 1 && event.currentTarget.value == -1) {
      this.disabled = true;
    }
    if (event.currentTarget.value == -1 && pages > 1) {
      pages = pages - 1;
    }
    if (event.currentTarget.value == 1 && pages >= 1) {
      if (productarr.length <= 1) {
        return (this.disabled = true);
      }
      console.log("pages in");
      pages = pages + 1;
    }
    const skip = limit * (pages - 1);
    if (page !== 0) {
      dispatch(upcomingProducts({ limit, skip, pages }));
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
            liketype={type}
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
