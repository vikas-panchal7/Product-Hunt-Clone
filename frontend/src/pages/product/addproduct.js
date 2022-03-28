import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Product from "../../components/product";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));
const AddProduct = () => {
  return (
    <div>
      <Item justifycontent='flex-end'>
        <h4>Upcoming Products</h4>

        <Product
          id='623c6fb9a89bf17f8abdc34c'
          title='Slack '
          tagline='The PowerFul Project Management Tool'
          likes='20'
        />
        <Product
          id='623c6fb9a89bf17f8abdc34c'
          title='Slack '
          tagline='The PowerFul Project Management Tool'
          likes='20'
        />
      </Item>
    </div>
  );
};

export default AddProduct;
