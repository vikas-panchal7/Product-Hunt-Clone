import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Product from "../../components/product";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));
const UpcomingProducts = () => {
  return (
    <div>
      <Item justifycontent='flex-end'>
        <h4>Upcoming Products</h4>

        <Product
          id='624566b4b47b5502f1241628'
          title='Slack '
          tagline='The PowerFul Project Management Tool'
          img='uploads/avt1648711660649A655.png'
        />
        <Product
          id='624566b4b47b5502f1241628'
          title='Slack '
          tagline='The PowerFul Project Management Tool'
          img='uploads/avt1648711660649A655.png'
        />
      </Item>
    </div>
  );
};

export default UpcomingProducts;
