import Header from "@/components/Header";
import style from "./home.module.css";

import React from "react";
import Footer from "@/components/Footer";
import { Grid } from "@mui/material";
import Image from "next/image";
import Feature from "./Feature";
import TopSection from "./TopSection";
import Slider from "./Slider";
import AboutUs from "./AboutUs";



const HomePage = () => {
  return (
    <>
      <Header />
      <div className={style.main}>
       <TopSection />
        <Slider />
        <AboutUs />
        <Feature />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
