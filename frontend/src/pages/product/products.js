import * as React from "react";
import Header from "../../components/header";
import Product from "../../components/product";
import AddProduct from "./addproduct";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { listProducts } from "../../redux/actions/productActions";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Postproduct from "./postproduct";

export const Products = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productlist = useSelector((state) => state.productList);
  const { loading, products, error } = productlist;

  //console.log("ss", productlist);
  // const [data, setdata] = React.useState([]);
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
              id={product._id}
              title={product.name}
              tagline={product.tagline}
              likes={product.likes.length}
            />
          ))}
        </Grid>

        <Grid item xs={5}>
          <AddProduct />
          <Divider textAlign='left'>
            <b>New Products</b>
          </Divider>
          {loading && <CircularProgress />}
          {products.map((product) => (
            <Product
              id={product._id}
              title={product.name}
              tagline={product.tagline}
              likes={product.likes.length}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
