import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Button, Grid } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { Popup } from "./popup";
import { PostJob, Postproduct } from "../pages/index";
import { JobView } from "./jobview";

import { deleteProduct } from "../redux/actions/productActions";
import { deleteJob } from "../redux/actions/jobsActions";
import { PRODUCT_DELETE_RESET } from "../constants/productconstants";
import { JOBS_DELETE_RESET } from "../constants/jobsconstants";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  color: "black",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "55ch",
      },
    },
  },
}));

export function BasicTable(props) {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const { success } = useSelector((state) => state.productDelete);

  React.useEffect(() => {
    setRows(props.data);
  }, [props]);

  const requestSearch = (event) => {
    let filteredRows = [];
    if (props.type === "product") {
      filteredRows = props.data.filter((row) => {
        return (
          row.name.toLowerCase().includes(event.target.value.toLowerCase()),
          row.category.toLowerCase().includes(event.target.value.toLowerCase()),
          row.type.toLowerCase().includes(event.target.value.toLowerCase())
        );
      });
    }
    if (props.type === "jobs") {
      filteredRows = props.data.filter((row) => {
        return (
          row.companyname
            .toLowerCase()
            .includes(event.target.value.toLowerCase()),
          row.jobtitle.toLowerCase().includes(event.target.value.toLowerCase()),
          row.category.toLowerCase().includes(event.target.value.toLowerCase())
        );
      });
    }
    setRows(filteredRows);
  };

  const handleclick = (e) => {
    const result = window.confirm("Are You Sure Want To Delete ?");
    if (!result) return;
    props.type === "product" && dispatch(deleteProduct(e._id));
    props.type === "jobs" && dispatch(deleteJob(e._id));
    dispatch({ type: PRODUCT_DELETE_RESET });
    dispatch({ type: JOBS_DELETE_RESET });
  };

  return (
    <>
      <Grid margin='20px'>
        <Paper>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{
                border: "1px solid black",
                color: "black",
                paddingLeft: 2,
              }}
              placeholder='Search…'
              inputProps={{ "aria-label": "search" }}
              onChange={requestSearch}
            ></StyledInputBase>
          </Search>
          <TableContainer>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow key={Math.random() + 3}>
                  <TableCell key={Math.random() + 2}>
                    <b>S.no</b>
                  </TableCell>
                  {props?.tableheader?.map((row, index) => (
                    <TableCell key={index + 1}>
                      <b>{row}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, index) => (
                  <TableRow key={index + 2}>
                    <TableCell key={index + 1}>
                      <b>{index + 1}</b>
                    </TableCell>
                    {props?.tablerows?.map((r, subindex) => (
                      <TableCell
                        key={Math.random() + subindex}
                        style={{
                          maxWidth: 100, // percentage also works
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {Object.values(row)[subindex + 1]}
                      </TableCell>
                    ))}
                    <TableCell key={Math.random() + 1}>
                      {props.type === "product" && (
                        <Popup data={row} name={"View"} />
                      )}
                      {props.type === "jobs" && (
                        <JobView data={row} name={"View"} />
                      )}
                    </TableCell>
                    <TableCell key={Math.random() + 1}>
                      {props.type === "product" && (
                        <Postproduct data={row} name={"Edit"} type={"Edit"} />
                      )}
                      {props.type === "jobs" && (
                        <PostJob data={row} name={"Edit"} type={"Edit"} />
                      )}
                    </TableCell>
                    <TableCell key={Math.random() + 1}>
                      <Button
                        key={Math.random() + 1}
                        onClick={() => handleclick(row)}
                        sx={{
                          color: "red",
                          alignSelf: "right",
                        }}
                      >
                        <DeleteForeverIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </>
  );
}
