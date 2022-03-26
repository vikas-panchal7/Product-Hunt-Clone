import * as React from "react";
import Header from "../../components/header";
import Product from "../../components/product";
import AddProduct from "./addproduct";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { listProducts } from "../../redux/actions/productActions";

import { useDispatch, useSelector } from "react-redux";

export const Products = () => {
  const dispatch = useDispatch();
  const productlist = useSelector((state) => state.productList);
  const { loding, products, error } = productlist;

  console.log("ss", productlist);
  // const [data, setdata] = React.useState([]);
  React.useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div style={{ marginTop: 80 }}>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <h3>Your Next Favorite Thing</h3>
          {products.map((product) => (
            <Product
              id={product.id}
              title={product.name}
              description={product.tagline}
              likes={product.likes.length}
            />
          ))}
        </Grid>
        <Grid item xs={5}>
          <AddProduct />
          <Divider textAlign='left'>
            <b>New Products</b>
          </Divider>
          {products.map((product) => (
            <Product
              id={product.id}
              title={product.name}
              description={product.tagline}
              likes={product.likes.length}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
