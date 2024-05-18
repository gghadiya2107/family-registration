'use client';
import MainLayout from '@/layout/MainLayout'
import React, { useState } from 'react'
import style from "./registration.module.css"
import { Grid } from '@mui/material'
import AddParivar from './AddParivar'
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { getImagePath } from '@/utils/CustomImagePath';

const Registration = () => {
   const [state, setState] = useState("1")

   const { t } = useTranslation("translation");

    const [tab, setTab] = useState("1")
  return (
    <MainLayout>
      {state =="1" && <Grid container spacing={5} >
                    <Grid item md={1.5}></Grid>
                    <Grid item xs={12} md={4.5}>
                    <div className={style.card} onClick={() => setTab("1")}>
                       <div className={style.cardBody}>
                       <div><input type="checkbox" className={style.checkbox} checked={tab =="1"} onChange={() => setTab("1")}/></div>
                        <div>{t('addParivar')}</div>
                        <Image src={getImagePath("/family.png")} height={50} width={50} style={{marginLeft : "20px"}} />
                       </div>
                    </div>

                    </Grid>
                    <Grid item xs={12} md={4.5}>
                    <div className={style.card} onClick={() => setTab("2")}>
                       <div className={style.cardBody}>
                       <div><input type="checkbox" className={style.checkbox} checked={tab =="2"} onChange={() => setTab("2")}/></div>
                        <div>{t('addMember')}</div>
                        <Image src={getImagePath("/person.png")} height={50} width={50} style={{marginLeft : "20px"}}/>

                       </div>
                    </div>

                    

                    </Grid>
                    <Grid item md={1.5}></Grid>
                    </Grid>}


     {tab == "1" && <AddParivar setState={setState} state={state} />}
     
    </MainLayout>
  )
}

export default Registration
