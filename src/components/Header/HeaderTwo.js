import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import style from './Header.module.css'

const HeaderTwo = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className={style.twoAppBar} >
          <Toolbar style={{ margin: "7px 0px" }}>
            <Box mr={2} style={{ marginBottom: 5 }}>
              <div className={style.logo}>
                <Image
                  src="/hp.png"
                  width="70"
                  height="70"
                  alt="Himachal Pradesh Logo"
                />
              </div>
            </Box>
            <Typography component="div" sx={{ flexGrow: 1, marginBottom: 1 }}>
              <div className={style.twoHead}>

                Family Register
              </div>
              <div className={style.twoDesc}>
                Urben Development Department
              </div>
            </Typography>


            <Typography className={style.twoRight} component="div" >
              <div className={style.mainImg}>
                <div className={style.outerImg}>
                  <Image
                    src="/nav1.png"
                    width="40"
                    height="40"
                    alt="Himachal Pradesh Logo"
                  />
                </div>
              </div>
              <span className={style.twoTitle}>Topics</span>
              <div className={style.menu} style={{width : "40vw"}}>
                <Grid container spacing={5} >
                  <Grid item xs={4}>
                    <p className={style.item}>Agriculture</p>
                    <p className={style.item}>Communications & IT</p>
                    <p className={style.item}>Environment & Forest</p>
                    <p className={style.item}>Foreign Affairs</p>
                    <p className={style.item}>Home Affairs </p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.item}>Art & Culture</p>
                    <p className={style.item}>Defence</p>
                    <p className={style.item}>Finance & Taxes</p>
                    <p className={style.item}>Administration</p>
                    <p className={style.item}>Housing</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.item}>Commerce</p>
                    <p className={style.item}>Education</p>
                    <p className={style.item}>Food & Public </p>
                    <p className={style.item}>Health & Family</p>
                    <p className={style.item}>Industries</p>

                  </Grid>
                </Grid>

              </div>
            </Typography>

            <Typography className={style.twoRight} component="div" >
              <div className={style.mainImg}>
                <div className={style.outerImg}>
                  <Image
                    src="/nav1.png"
                    width="40"
                    height="40"
                    alt="Himachal Pradesh Logo"
                  />
                </div>
              </div>
              <span className={style.twoTitle}>Services</span>
             
            </Typography>

            <Typography className={style.twoRight} component="div" >
              <div className={style.mainImg}>
                <div className={style.outerImg}>
                  <Image
                    src="/nav1.png"
                    width="40"
                    height="40"
                    alt="Himachal Pradesh Logo"
                  />
                </div>
              </div>
              <span className={style.twoTitle}> My Goverment</span>
              <div className={style.menu} style={{width : "40vw"}}>
                <Grid container spacing={5} >
                  <Grid item xs={4}>
                    <p className={style.item}>Constitution of India</p>
                    <p className={style.item}>Publications</p>
                    <p className={style.item}>Schemes</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.item}>Government Directory</p>
                    <p className={style.item}>Who's Who</p>
                    <p className={style.item}>Documents</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.item}>Indian Parliament</p>
                    <p className={style.item}>Acts</p>

                  </Grid>
                </Grid>

              </div>
            </Typography>

            <Typography className={style.twoRight} component="div" >
              <div className={style.mainImg}>
                <div className={style.outerImg}>
                  <Image
                    src="/nav1.png"
                    width="40"
                    height="40"
                    alt="Himachal Pradesh Logo"
                  />
                </div>
              </div>
              <span className={style.twoTitle}>People Groups</span>
              <div className={style.menu} style={{width : "12vw"}}>
                <Grid container spacing={5} >
                  <Grid item xs={12}>
                    <p className={style.item}>Community</p>
                    <p className={style.item}>Life Cycle</p>
                  </Grid>
                
                </Grid>

              </div>
            </Typography>

            <Typography className={style.twoRight} component="div" >
              <div className={style.mainImg}>
                <div className={style.outerImg}>
                  <Image
                    src="/nav1.png"
                    width="40"
                    height="40"
                    alt="Himachal Pradesh Logo"
                  />
                </div>
              </div>
              <span className={style.twoTitle}>India At A Glance</span>
              <div className={style.menu} style={{width : "40vw", right : "40%"}}>
                <Grid container spacing={5} >
                  <Grid item xs={4}>
                    <p className={style.item}>Profiles</p>
                    <p className={style.item}>National Symbls</p>
                    <p className={style.item}>People and Lifestyle</p>
                    <p className={style.item}>Where to Stay</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.item}>States of India</p>
                    <p className={style.item}>Culture & Heritage</p>
                    <p className={style.item}>Places to Visit</p>
                    <p className={style.item}>Modals of Travel</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.item}>My India My Pride</p>
                    <p className={style.item}>Districs of India</p>
                    <p className={style.item}>Nature Wonders </p>
                    <p className={style.item}>Travel Agents</p>

                  </Grid>
                </Grid>

              </div>
            </Typography>

          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default HeaderTwo
