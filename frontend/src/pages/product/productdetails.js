import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
//
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../redux/actions/productActions";

//
import { Comments } from "../../components/comment";
import Header from "../../components/header";
import Product from "../../components/product";
import ViewImage from "../../components/viewimage";

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
  const type = "list";
  const dispatch = useDispatch();

  const [imgopen, setimgopen] = React.useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, details, error } = productDetails;
  const productlist = useSelector((state) => state.productList);
  const { loading: loader, products, error: loadererror } = productlist;
  const createComment = useSelector((state) => state.productComment);
  const productLike = useSelector((state) => state.productLike);

  React.useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id, createComment, productLike]);
  const imghandler = (data) => {
    setimgopen(data);
  };
  const clickhandler = (event) => {
    setimgopen(true);
  };
  return (
    <div style={{ marginTop: 80 }}>
      {loading && <CircularProgress />}
      <Header />

      {imgopen && <ViewImage img={details.img1} onClose={imghandler} />}
      <Grid container spacing={2} padding={"30px"}>
        <Grid item xs={12} sm={12} md={7}>
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
                src={`${process.env
                        .REACT_APP_URL}/${details.img1}`}
                alt='A'
                width='100%'
                height='100%'
                onClick={clickhandler}
              />
            </Item>
          </Grid>
          <Typography
            gutterBottom
            variant='subtitle1'
            component='div'
            color={"CaptionText "}
            sx={{ fontSize: "15px", fontFamily: "sans-serif" }}
          >
            {details.description}
          </Typography>

          {loading && <CircularProgress />}
          <Comments id={details._id} comments={details.comment} />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Divider textAlign='left' style={{ fontSize: "30px" }}>
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
              liketype={type}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
