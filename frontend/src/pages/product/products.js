import * as React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useDispatch, useSelector } from "react-redux";

import Bar from "../../components/snackbar";
import Paginate from "../../components/pagination";
import Header from "../../components/header";
import Product from "../../components/product";
import { Postproduct, UpcomingProducts } from "../index";
import { listProducts } from "../../redux/actions/productActions";

export const Products = () => {
  const type = "list";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const productlist = useSelector((state) => state.productList);
  const { loading, products, error, count } = productlist;
  const productCreate = useSelector((state) => state.productCreate);

  const [productarr, setProductarr] = React.useState([]);
  const [sort, setsort] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const [limit, setlimit] = React.useState(4);
  React.useEffect(() => {
    dispatch(listProducts({ limit, skip, sort }));
  }, [dispatch, productCreate, limit, skip, sort]);

  React.useEffect(() => {
    setProductarr(products);
  }, [products]);

  const handleChange = (event) => {
    setSkip(0);
    setPage(1);
    setsort(event.target.value);
  };

  return (
    <div style={{ marginTop: 80 }}>
      <Header />
      {error && <Bar message={error} severity='warning' />}
      <Grid container spacing={2} padding={"40px"}>
        <Grid item xs={12} md={7} sm={12}>
          <Box
            sx={{ minWidth: 80 }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            marginBottom='1.5em'
          >
            <Divider textAlign='right' style={{ fontSize: "30px" }}>
              <b>Your Next Favourite Things </b>
            </Divider>
            <FormControl variant='outlined' size='small'>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={sort}
                color={"warning"}
                defaultValue={sort}
                onChange={handleChange}
              >
                <MenuItem value={1}>Featured</MenuItem>
                <MenuItem value={-1}>Newest</MenuItem>
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
          <Paginate
            limit={limit}
            count={count}
            page={page}
            getPage={(p) => {
              setPage(p.value);
              setlimit(p.limit);
              setSkip(p.skip);
            }}
          />
        </Grid>

        <Grid item xs={12} md={5} sm={12}>
          <UpcomingProducts />
          <div style={{ marginTop: "30px" }}>
            <Divider textAlign='left' style={{ fontSize: "30px" }}>
              <b>New Products</b>
            </Divider>
          </div>
          {loading && <CircularProgress />}
          {productarr.sort().map((product, index) => (
            <Product
              key={product._id + index}
              id={product._id}
              title={product.name}
              tagline={product.tagline}
              img={product.img}
              likes={product.likes.length}
              liketype={type}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
