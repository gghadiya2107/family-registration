import React from 'react'
import style from "./home.module.css";
import { Grid } from '@mui/material';
import Image from 'next/image';
import Slider from './Slider';

const TopSection = () => {
  return (
    <Grid container spacing={2} >
          <Grid item xs={1}></Grid>
          <Grid item xs={4} display={"grid"} style={{ placeItems: "center" }}>
            <div className={style.left}>
              <h3 className={style.heading}>
                Family Register (Urben Development Department)
              </h3>
              <p className={style.desc}>
                Efficiently collect and manage urban household data to maintain
                an updated Parivar Register, ensuring accurate and essential
                demographic information for government and civic planning in
                your city.
              </p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Slider />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
  )
}

export default TopSection
