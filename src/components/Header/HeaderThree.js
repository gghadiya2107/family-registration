import React from 'react'
import style from './Header.module.css'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { MdArrowDropDown } from "react-icons/md";
const HeaderThree = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={style.threeAppBar} >
        <Toolbar style={{minHeight : "50px"}}>
            <div className={style.threeOuter}>
                <div className={style.inputOuter}>
                    <input className={style.input} type='text' placeholder='Search - Keyword, Phrase'/>
                    <button className={style.search}>Search</button>
                </div>
               
            </div>
          <Typography component="div" sx={{ flexGrow: 1, marginBottom: 1 ,color :"#813600", fontWeight : "600"}}>
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
          
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default HeaderThree
