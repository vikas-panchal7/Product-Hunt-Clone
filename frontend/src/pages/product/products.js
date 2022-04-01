import * as React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/header";
import Product from "../../components/product";
import { Postproduct, UpcomingProducts } from "../index";
import { listProducts } from "../../redux/actions/productActions";

export const Products = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const productlist = useSelector((state) => state.productList);
  const { loading, products, error } = productlist;

  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div style={{ marginTop: 80 }}>
      <Header />
      {userInfo && (
        <div align='right'>
          <Postproduct />
        </div>
      )}

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <h3>Your Next Favorite Thing</h3>
          {loading && <CircularProgress />}
          {products.map((product) => (
            <Product
              key={product._id}
              key={product._id}
              id={product._id}
              title={product.name}
              tagline={product.tagline}
              img={product.img}
              likes={product.likes.length}
            />
          ))}
        </Grid>

        <Grid item xs={5}>
          <UpcomingProducts />
          <Divider textAlign='left'>
            <b>New Products</b>
          </Divider>
          {loading && <CircularProgress />}
          {products.map((product) => (
            <Product
              key={product._id}
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
