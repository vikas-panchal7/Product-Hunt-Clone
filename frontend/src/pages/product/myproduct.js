import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { BasicTable } from "../../components/basictable";
import Header from "../../components/header";
import { Postproduct } from "../index";
import { useNavigate } from "react-router-dom";
import {
  listmyProducts,
  listProducts,
} from "../../redux/actions/productActions";
import Paginate from "../../components/pagination";

export const MyProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const productlist = useSelector((state) => state.myproductList);
  const data = useSelector((state) => state.productCreate);
  const update = useSelector((state) => state.productDelete);
  const { loading, products, error, count } = productlist;

  const [productarr, setProductarr] = React.useState([]);
  const [sort, setsort] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const [limit, setlimit] = React.useState(5);

  const { userInfo } = userLogin;
  React.useEffect(() => {
    if (!userInfo) {
      navigate("/loggin");
    }
  }, [userInfo]);

  React.useEffect(() => {
    dispatch(listmyProducts({ limit, skip, sort }));
  }, [dispatch, limit, skip, sort, data, update]);

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
