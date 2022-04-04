import * as React from "react";
import Header from "../../components/header";
import Product from "../../components/product";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

//
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//
import { listProductDetails } from "../../redux/actions/productActions";
import { Comments } from "../../components/comment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f6f2",
  "&:hover": {
    background: "#F0F0F0",
  },
  ...theme.typography.body2,
  padding: theme.spacing(1.3),
  width: "95%",
}));

export const ProductsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, details, error } = productDetails;
  const productlist = useSelector((state) => state.productList);
  const { loading: loader, products, error: loadererror } = productlist;

  return (
    <div style={{ marginTop: 80 }}>
      {loading && <CircularProgress />}
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Product
            key={details._id}
            id={details._id}
            title={details.name}
            tagline={details.tagline}
            img={details.img}
            url={details.url}
            likes={details.likes?.length || 0}
          />
          <Grid>
            <Item justifycontent='flex-right'>
              <img
                src={`http://192.168.200.122:5000/${details.img1}`}
                alt='A'
                width='100%'
                height='100%'
              />
            </Item>
          </Grid>
          <Comments id={details._id} comments={details.comment} />
        </Grid>
        <Grid item xs={5}>
          <Item justifycontent='flex-right'>
            <b>Description</b>
            <p>{details.description}</p>
          </Item>
          <Divider textAlign='left'>
            <b>Similar Products</b>
          </Divider>
          {loader && <CircularProgress />}
          {products?.map((product) => (
            <Product
              key={product._id}
              id={product._id}
              title={product.name}
              tagline={product.tagline}
              url={product.url}
              img={product.img}
              likes={product.likes.length || 0}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
