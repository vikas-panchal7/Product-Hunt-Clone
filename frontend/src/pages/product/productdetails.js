import * as React from "react";
import Header from "../../components/header";
import Product from "../../components/product";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

import { Comments } from "../../components/comment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../redux/actions/productActions";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

export const ProductsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, details, error } = productDetails;
  const productlist = useSelector((state) => state.productList);
  const { loading: loader, products, error: loadererror } = productlist;
  React.useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  return (
    <div style={{ marginTop: 80 }}>
      {loading && <CircularProgress />}
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Product
            id={details._id}
            title={details.name}
            tagline={details.tagline}
            url={details.url}
          />
          <Grid item xs>
            <Item justifycontent='flex-right'>
              <img
                src='https://ph-files.imgix.net/c927e6d2-5802-43de-9bc4-8468819f7462.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=676&h=380&fit=max&bg=0fff&dpr=1'
                alt='a'
                width='100%'
                height='100%'
              />
            </Item>
          </Grid>
          <Comments />
        </Grid>
        <Grid item xs={5}>
          <Item justifycontent='flex-right'>
            <p>Description</p>
            <p>{details.description}</p>
          </Item>
          <Divider textAlign='left'>
            <b>Similar Products</b>
          </Divider>
          {loading && <CircularProgress />}
          {products.map((product) => (
            <Product
              id={product._id}
              title={product.name}
              tagline={product.tagline}
              url={product.url}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
