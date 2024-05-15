import MainLayout from '@/layout/MainLayout'
import React, { useState } from 'react'
import style from "./registration.module.css"
import { Grid } from '@mui/material'
import AddParivar from './AddParivar'

const Registration = () => {
    const [tab, setTab] = useState("1")
  return (
    <MainLayout>
       <Grid container spacing={5} >
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                    <div className={style.card} onClick={() => setTab("1")}>
                       <div className={style.cardBody}>
                       <div><input type="checkbox" className={style.checkbox} checked={tab =="1"} onChange={() => setTab("1")}/></div>
                        <div>Add Parivar (New Family)</div>
                       </div>
                    </div>

                    </Grid>
                    <Grid item xs={5}>
                    <div className={style.card} onClick={() => setTab("2")}>
                       <div className={style.cardBody}>
                       <div><input type="checkbox" className={style.checkbox} checked={tab =="2"} onChange={() => setTab("2")}/></div>
                        <div>Add Member (New Member)</div>
                       </div>
                    </div>

                    

                    </Grid>
                    <Grid item xs={1}></Grid>
                    </Grid>


     {tab == "1" && <AddParivar />}
     
    </MainLayout>
  )
}

export default Registration
