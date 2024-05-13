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
import HeaderOne from "@/components/Header/HeaderOne";
import HeaderTwo from "@/components/Header/HeaderTwo";
import HeaderThree from "@/components/Header/HeaderThree";
import Activities from "./Activities";
import Services from "./Services";
import Counting from "./Counting";
import FooterOne from "@/components/Footer/FooterOne";
import FooterTwo from "@/components/Footer/FooterTwo";
import Layout from "@/layout";



const HomePage = () => {
  return (
    <>

      <Layout >
        <div className={style.main}>
          <TopSection />
          <Activities />
          <Services />
          <Counting />
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
