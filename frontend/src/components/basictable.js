import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Grid } from "@mui/material";
import { Popup } from "./popup";
import { Postproduct } from "../pages/index";

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

const originalRows = [
  { name: "Pizza", calories: 200, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Hot Dog", calories: 300, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Burger", calories: 400, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Hamburger", calories: 500, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Fries", calories: 600, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Ice Cream", calories: 700, fat: 6.0, carbs: 24, protein: 4.0 },
];

export function BasicTable(props) {
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");

  React.useEffect(() => {
    setRows(props.data);
  }, [props]);

  const requestSearch = (event) => {
    const filteredRows = props.data.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRows(filteredRows);
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
                    </TableCell>
                    <TableCell key={Math.random() + 1}>
                      {props.type === "product" && (
                        <Postproduct data={row} name={"Edit"} type={"Edit"} />
                      )}
                    </TableCell>
                    <TableCell key={Math.random() + 1}></TableCell>
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
