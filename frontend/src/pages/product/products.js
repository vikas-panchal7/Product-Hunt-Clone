import * as React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/header";
import Product from "../../components/product";
import { Postproduct, UpcomingProducts } from "../index";
import { listProducts } from "../../redux/actions/productActions";
import Bar from "../../components/snackbar";
import Paginate from "../../components/pagination";

export const Products = () => {
  const limit = 4;
  const type = "list";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const productlist = useSelector((state) => state.productList);
  const { loading, products, error } = productlist;
  const productCreate = useSelector((state) => state.productCreate);

  const [productarr, setProductarr] = React.useState([]);
  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, productCreate]);

  React.useEffect(() => {
    setProductarr(products);
  }, [products]);

  const [sort, setsort] = React.useState(-1);

  const handleChange = (event) => {
    setsort(event.target.value);
    dispatch(listProducts({ sort }));
  };

  return (
    <div style={{ marginTop: 80 }}>
      <Header />
      {userInfo && (
        <div align='right'>
          <Postproduct />
        </div>
      )}
      {error && <Bar message={error} severity='warning' />}
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Box
            sx={{ minWidth: 80 }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Divider textAlign='right'>
              <b>Your Next Favourite Things</b>
            </Divider>
            <FormControl variant='standard' size='small'>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={sort}
                defaultValue={sort}
                onChange={handleChange}
                disableUnderline
              >
                <MenuItem value={-1}>Featured</MenuItem>
                <MenuItem value={1}>Newest</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
          <Paginate limit={limit} />
        </Grid>

        <Grid item xs={5}>
          <UpcomingProducts />
          <Divider textAlign='left'>
            <b>New Products</b>
          </Divider>
          {loading && <CircularProgress />}
          {productarr.map((product, index) => (
            <Product
              key={product._id + index}
              id={product._id}
              title={product.name}
              tagline={product.tagline}
              img={product.img}
              likes={product.likes.length}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
