import React from "react";
import Header from "../../components/header";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
import cat from "../../assets/images/cat.png";
const theme = createTheme();
export const About = () => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: 80 }}>
        <ThemeProvider theme={theme}>
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
          </Container>
          <div align='center'>
            <Avatar
              src={cat}
              sizes='20px'
              style={{
                border: "2px solid  #DC5425",
                alignSelf: "left",
              }}
              sx={{ width: 100, height: 100 }}
            />
            <h1>About Product Hunt</h1>
            <p>Product Hunt surfaces the best new products, every day.</p>
            <p>
              It's a place for product-loving enthusiasts to share and geek out
              about the latest mobile apps,
            </p>
            <p>websites, hardware projects, and tech creations.</p>
            <p>Email:producthunt@gmail.com</p>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};
