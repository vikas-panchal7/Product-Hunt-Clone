import * as React from "react";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";

import { PostJob } from "../index";
import Header from "../../components/header";
import Job from "../../components/Job";
import Paginate from "../../components/pagination";
export const Jobs = () => {
  const limit = 4;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const productlist = useSelector((state) => state.productList);
  const { loading, products, error } = productlist;
  const productCreate = useSelector((state) => state.productCreate);

  const [jobsarr, setjobarr] = React.useState([]);
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
    <div>
      <Header />
      <div style={{ marginTop: 80 }}>
        <Grid container spacing={2}>
          <Grid item xs={7} borderRadius={"10px"} bgcolor='#fcfaf2'>
            <Box
              sx={{ minWidth: 80 }}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Divider textAlign='right'>
                <p>Your Dream Job Could be here 👇 </p>
              </Divider>

              <FormControl variant='standard' size='small'>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  // value={sort}
                  // defaultValue={sort}
                  // onChange={handleChange}
                  disableUnderline
                >
                  <MenuItem value={-1}>Featured</MenuItem>
                  <MenuItem value={1}>Newest</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {loading && <CircularProgress />}
            {jobsarr.map((jobs, index) => (
              <Product />
            ))}
            <Paginate limit={limit} />
          </Grid>

          <Grid item xs={5}>
            <Box
              sx={{ minWidth: 80 }}
              display={"flex"}
              flexDirection={"row"}
              justifyContent='right'
            >
              <PostJob />
            </Box>
            <Divider textAlign='left'>
              <b>New Products</b>
            </Divider>
            {/*  <UpcomingProducts />
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
          ))} */}
            <Job></Job>
            <Job></Job>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
