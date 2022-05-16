import React from "react";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
  PRODUCT_UPDATE_RESET,
} from "../../constants/productconstants";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BasicTable } from "../../components/basictable";
import Header from "../../components/header";
import { Postproduct } from "../index";
import Paginate from "../../components/pagination";
import Bar from "../../components/snackbar";
import { listmyProducts } from "../../redux/actions/productActions";

export const MyProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productlist = useSelector((state) => state.myproductList);
  const { loading, products, error, count } = productlist;
  const create = useSelector((state) => state.productCreate);
  const {
    success: productcreatesuccess,
    product: productcreate,
    error: productcreaterror,
  } = create;
  const update = useSelector((state) => state.productUpdate);
  const {
    success: productupdatesuccess,
    product: productupdate,
    error: productupdaterror,
  } = update;
  const deleteproduct = useSelector((state) => state.productDelete);
  const { success: productdeletesuccess, error: productdeleterror } =
    deleteproduct;

  const [productarr, setProductarr] = React.useState([]);
  const [sort, setsort] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const [limit, setlimit] = React.useState(5);

  React.useEffect(() => {
    if (!userInfo) {
      navigate("/loggin");
    }
    dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch({ type: PRODUCT_UPDATE_RESET });
    dispatch({ type: PRODUCT_DELETE_RESET });
  }, [userInfo]);

  React.useEffect(() => {
    dispatch(listmyProducts({ limit, skip, sort }));
  }, [dispatch, limit, skip, sort, create, update, deleteproduct]);

  const header = [
    "Name",
    "Tagline",
    "Description",
    "Product Type",
    "Product Category",
    "View",
    "Edit",
    "Delete",
  ];

  const rows = ["name", "tagline", "description", "type", "category"];
  return (
    <div style={{ marginTop: 80 }}>
      <Header />
      <div align='right'>
        <Postproduct />
      </div>
      {productcreaterror && (
        <Bar message={productcreaterror} severity='warning' />
      )}
      {productupdaterror && (
        <Bar message={productupdaterror} severity='warning' />
      )}
      {productdeleterror && (
        <Bar message={productdeleterror} severity='warning' />
      )}
      {productupdatesuccess && (
        <Bar message={"Product Updated SuccessFully"} severity='info' />
      )}
      {productcreatesuccess && (
        <Bar message={"Product Created SuccessFully"} severity='success' />
      )}
      {productdeletesuccess && (
        <Bar message={"Product Deleted SuccessFully"} severity='info' />
      )}
      <BasicTable
        tableheader={header}
        tablerows={rows}
        data={products}
        type={"product"}
      />
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
    </div>
  );
};
