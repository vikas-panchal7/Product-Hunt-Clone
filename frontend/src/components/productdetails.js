import * as React from "react";
import Header from "./header";
import Product from "./product";
import AddProduct from "../pages/product/addproduct";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { Comments } from "./comment";
import { styled } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f7f6f2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));
const data = [
  {
    title: "Brown eggs",
    type: "dairy",
    description: "Raw organic brown eggs in a basket",
    filename: "0.jpg",
    height: 600,
    width: 400,
    price: 28.1,
    rating: 4,
  },
  {
    title: "Sweet fresh stawberry",
    type: "fruit",
    description: "Sweet fresh stawberry on the wooden table",
    filename: "1.jpg",
    height: 450,
    width: 299,
    price: 29.45,
    rating: 4,
  },
  {
    title: "Asparagus",
    type: "vegetable",
    description: "Asparagus with ham on the wooden table",
    filename: "2.jpg",
    height: 450,
    width: 299,
    price: 18.95,
    rating: 3,
  },
  {
    title: "Green smoothie",
    type: "dairy",
    description:
      "Glass of green smoothie with quail egg's yolk, served with cocktail tube, green apple and baby spinach leaves over tin surface.",
    filename: "3.jpg",
    height: 600,
    width: 399,
    price: 17.68,
    rating: 4,
  },
  {
    title: "Raw legums",
    type: "vegetable",
    description: "Raw legums on the wooden table",
    filename: "4.jpg",
    height: 450,
    width: 299,
    price: 17.11,
    rating: 2,
  },
  {
    title: "Baking cake",
    type: "dairy",
    description:
      "Baking cake in rural kitchen - dough  recipe ingredients (eggs, flour, sugar) on vintage wooden table from above.",
    filename: "5.jpg",
    height: 450,
    width: 675,
    price: 11.14,
    rating: 4,
  },
  {
    title: "Pesto with basil",
    type: "vegetable",
    description: "Italian traditional pesto with basil, chesse and oil",
    filename: "6.jpg",
    height: 450,
    width: 299,
    price: 18.19,
    rating: 2,
  },
  {
    title: "Hazelnut in black ceramic bowl",
    type: "vegetable",
    description:
      "Hazelnut in black ceramic bowl on old wooden background. forest wealth. rustic style. selective focus",
    filename: "7.jpg",
    height: 450,
    width: 301,
    price: 27.35,
    rating: 0,
  },
  {
    title: "Fresh stawberry",
    type: "fruit",
    description: "Sweet fresh stawberry on the wooden table",
    filename: "8.jpg",
    height: 600,
    width: 399,
    price: 28.59,
    rating: 4,
  },
  {
    title: "Lemon and salt",
    type: "fruit",
    description: "Rosemary, lemon and salt on the table",
    filename: "9.jpg",
    height: 450,
    width: 299,
    price: 15.79,
    rating: 5,
  },
  {
    title: "Homemade bread",
    type: "bakery",
    description: "Homemade bread",
    filename: "10.jpg",
    height: 450,
    width: 301,
    price: 17.48,
    rating: 3,
  },
  {
    title: "Legums",
    type: "vegetable",
    description: "Cooked legums on the wooden table",
    filename: "11.jpg",
    height: 600,
    width: 399,
    price: 14.77,
    rating: 0,
  },
  {
    title: "Fresh tomato",
    type: "vegetable",
    description: "Fresh tomato juice with basil",
    filename: "12.jpg",
    height: 600,
    width: 903,
    price: 16.3,
    rating: 2,
  },
  {
    title: "Healthy breakfast",
    type: "fruit",
    description:
      "Healthy breakfast set. rice cereal or porridge with berries and honey over rustic wood background",
    filename: "13.jpg",
    height: 450,
    width: 350,
    price: 13.02,
    rating: 2,
  },
  {
    title: "Green beans",
    type: "vegetable",
    description: "Raw organic green beans ready to eat",
    filename: "14.jpg",
    height: 450,
    width: 300,
    price: 28.79,
    rating: 1,
  },
  {
    title: "Baked stuffed portabello mushrooms",
    type: "bakery",
    description:
      "Homemade baked stuffed portabello mushrooms with spinach and cheese",
    filename: "15.jpg",
    height: 600,
    width: 400,
    price: 20.31,
    rating: 1,
  },
  {
    title: "Strawberry jelly",
    type: "fruit",
    description: "Homemade organic strawberry jelly in a jar",
    filename: "16.jpg",
    height: 400,
    width: 600,
    price: 14.18,
    rating: 1,
  },
  {
    title: "Pears juice",
    type: "fruit",
    description: "Fresh pears juice on the wooden table",
    filename: "17.jpg",
    height: 600,
    width: 398,
    price: 19.49,
    rating: 4,
  },
  {
    title: "Fresh pears",
    type: "fruit",
    description: "Sweet fresh pears on the wooden table",
    filename: "18.jpg",
    height: 600,
    width: 398,
    price: 15.12,
    rating: 5,
  },
  {
    title: "Caprese salad",
    type: "vegetable",
    description:
      "Homemade healthy caprese salad with tomato mozzarella and basil",
    filename: "19.jpg",
    height: 400,
    width: 600,
    price: 16.76,
    rating: 5,
  },
  {
    title: "Oranges",
    type: "fruit",
    description:
      "Orange popsicle ice cream bars made from fresh oranges.  a refreshing summer treat.",
    filename: "20.jpg",
    height: 450,
    width: 274,
    price: 21.48,
    rating: 4,
  },
  {
    title: "Vegan food",
    type: "vegetable",
    description: "Concept of vegan food",
    filename: "21.jpg",
    height: 450,
    width: 299,
    price: 29.66,
    rating: 4,
  },
  {
    title: "Breakfast with muesli",
    type: "dairy",
    description: "Concept of healthy breakfast with muesli",
    filename: "22.jpg",
    height: 450,
    width: 299,
    price: 22.7,
    rating: 2,
  },

  {
    title: "Tomatoes",
    type: "fruit",
    description: "Organic tomatoes made with love",
    filename: "46.jpg",
    height: 450,
    width: 675,
    price: 26.03,
    rating: 4,
  },
  {
    title: "Basil",
    type: "vegetable",
    description: "Concept of vegan food with basil",
    filename: "47.jpg",
    height: 450,
    width: 678,
    price: 15.19,
    rating: 4,
  },
  {
    title: "Fruits bouquet",
    type: "fruit",
    description: "Abstract citrus fruits bouquet on blue background",
    filename: "48.jpg",
    height: 600,
    width: 401,
    price: 18.18,
    rating: 1,
  },
  {
    title: "Peaches on branch",
    type: "fruit",
    description:
      "Peaches on branch with leaves and glasses with peach juice and limonade with ice cubes in aluminum tray over old metal table. dark rustic style. top view.",
    filename: "49.jpg",
  },
];
export const ProductsDetails = () => {
  const products = data.map((product) => (
    <Product
      id={product.id}
      title={product.title}
      description={product.description}
      url={product.url}
    />
  ));
  return (
    <div style={{ marginTop: 80 }}>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Product
            id='hi'
            title='Title'
            description='description line'
            url='hello'
          />
          <Grid item xs>
            <Item justifyContent='flex-right'>
              <img
                src='https://ph-files.imgix.net/c927e6d2-5802-43de-9bc4-8468819f7462.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=676&h=380&fit=max&bg=0fff&dpr=1'
                width='100%'
                height='100%'
              />
            </Item>
          </Grid>
          <Comments />
        </Grid>
        <Grid item xs={5}>
          <Item justifyContent='flex-right'>
            <p>Description</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor.. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aenean luctus ut est sed faucibus. Duis bibendum ac ex vehicula
              laoreet. Suspendisse congue vulputate lobortis. Pellentesque at
              interdum tortor..
            </p>
          </Item>
          <Divider textAlign='left'>
            <b>Similar Products</b>
          </Divider>
          {products}
        </Grid>
      </Grid>
    </div>
  );
};
