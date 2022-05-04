import React from "react";
import Header from "../../components/header";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
const theme = createTheme();
export const Mentors = () => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: 80 }}>
        <ThemeProvider theme={theme}>
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <h1>Product Hunt Mentors</h1>
          </Container>
          <div style={{ margin: "50px" }}>
            <p>
              Product Hunt Mentors allows you to book 1 to 1 meetings with
              industry experts on a range of topics including product building,
              social media, PR, design, engineering and more.
            </p>

            <p>
              How it works: You can read more about each mentor in their short
              bios, then click “Book a Call” to select a time that suits you
              from their online calendars. Each mentor sets their own fee in
              accordance with their experiences. (Full disclaimer: Product Hunt
              takes a percentage).
            </p>

            <p>
              If you’d like to become a mentor yourself, please apply here. Or
              if you’d like to book a session with an expert mentor, you can
              scroll our list below. More mentors will we added over time. If
              you have any questions,
            </p>
            <p> Please email : producthunt@gmail.com.</p>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};
