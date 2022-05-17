import React from "react";
import Header from "../../components/header";
import Hero from "../../components/home/hero/Hero";
import Footer from "../../components/home/footer/Footer";
import { About } from "..";
export const Home = () => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: 90 }}>
        <Hero />
        <div align='center'>
          <h1>Hunt Your Imagination</h1>

          <p>Product Hunt surfaces the best new products, every day.</p>
          <p>
            It's a place for product-loving enthusiasts to share and geek out
            about the latest mobile apps,
          </p>
          <p>websites, hardware projects, and tech creations.</p>
          <p>Email:producthunt@gmail.com</p>
        </div>
        <Footer />
      </div>
    </div>
  );
};
