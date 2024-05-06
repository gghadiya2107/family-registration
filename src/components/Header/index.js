import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import style from "./Header.module.css";

import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ height: 60, background: "#1976d2" }} position="fixed">
        <Toolbar>
          <Box mr={2} style={{ marginBottom: 5 }}>
            <div className={style.logo}>
              <Image
                src="/hp.png"
                width="45"
                height="45"
                alt="Himachal Pradesh Logo"
              />
            </div>
          </Box>
          <Typography component="div" sx={{ flexGrow: 1, marginBottom: 1 }}>
            Himachal Pradesh Panchayati Raj
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
