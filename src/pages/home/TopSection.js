import React from 'react'
import style from "./home.module.css";
import { Grid } from '@mui/material';
import Image from 'next/image';

const TopSection = () => {
  return (
    <Grid container spacing={3} >
          <Grid item xs={2}></Grid>
          <Grid item xs={4} display={"grid"} style={{ placeItems: "center" }}>
            <div className={style.left}>
              <h3 className={style.heading}>
                Panchayati Raj Parivar Register (Urban)
              </h3>
              <p className={style.desc}>
                Efficiently collect and manage urban household data to maintain
                an updated Parivar Register, ensuring accurate and essential
                demographic information for government and civic planning in
                your city.
              </p>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={style.left}>
              <Image
                src="/grid.png"
                alt="images"
                width="0"
                height="0"
                sizes="80vw"
                className={style.grid}
              />
            </div>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
  )
}

export default TopSection
