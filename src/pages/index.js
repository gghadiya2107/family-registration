import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Login from "./login";
import HomePage from "./home";
import { Box } from "@mui/material";


export default function Home() {
  return (
    <>
      <Box className="backdrop" />
          <div id="iframeContainer" className="iframe-container" style={{height : "90%"}}></div>
      <HomePage />
    </>
  );
}
