import React from 'react'
import style from './Header.module.css'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { MdArrowDropDown } from "react-icons/md";
import { useSelector } from 'react-redux';
import { getCookieValues, removeCookie } from '@/utils/cookies';
import { useRouter } from 'next/router';
const HeaderThree = () => {
  // const userData = useSelector((state) => state.authDetails?.data);
  const router = useRouter()
  const userData = getCookieValues("userData")
  console.log('userData', userData)
  

  const logout = () => {
    removeCookie("userData");
    router.push("/")
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <script src="https://himstaging2.hp.gov.in/nodeapi/iframe/sso-iframe.js" defer=""></script>
      <AppBar className={style.threeAppBar} >
        <Toolbar style={{minHeight : "50px"}} className={style.mediaToolbar}>
            <div className={style.threeOuter}>
                <div className={style.inputOuter}>
                    <input className={style.input} type='text' placeholder='Search - Keyword, Phrase'/>
                    <button className={style.search}>Search</button>
                </div>
               
            </div>
          <Typography component="div" className={style.none} sx={{ flexGrow: 1, marginBottom: 1 ,color :"#813600", fontWeight : "600"}}>
            {/* Himachal Pradesh Panchayati Raj */}
          </Typography>

          <Typography component="div" className={style.most}>
            Most Searched
          </Typography>
          <Typography component="div" className={style.threeRight} >
          Birth Certificate
          </Typography>
          <Typography component="div" className={style.threeRight2} >
          Driving Licence
          </Typography>
          <Typography component="div" className={style.threeRight2} >
          Pan card
          </Typography>
          <Typography component="div" className={style.threeRightLogin} onClick={() => userData?.name ? logout() :getIframeSSO('10000080','login','Citizen')}>
           {userData?.name ? "Logout" : "Log In"}
          </Typography>
          

          
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default HeaderThree
