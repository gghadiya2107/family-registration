import React from 'react'
import style from './home.module.css'
import { Grid } from '@mui/material'
import Image from 'next/image'

let featureData = [
    {
        image: "/1.png",
        title: " Establishment Registred ",
        count: "7625K",
        desc: "The BOCW Act, 1996",
        color: "#2c498d"
    },
    {
        image: "/2.png",
        title: "Worker Registred ",
        count: "223.80K",
        desc: "The BOCW Act, 1996",
        color: "#dc6800"
    },
    {
        image: "/3.png",
        title: " Cess Collected ",
        count: "3912.41K",
        desc: "The BOCW Act, 1996",
        color: "#1997c2"
    },
    {
        image: "/4.png",
        title: " Welfare Scheme ",
        count: "19.47K",
        desc: "The BOCW Act, 1996",
        color: "#ca0c5c",
        last: true
    }
];
const Counting = () => {
  return (
    <div className={style.countingMain}>
            <Grid container spacing={3} mb={5}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Grid container spacing={3}>
                        {featureData?.map(v => (
                            <Grid item xs={3}>
                            <div className={v?.last ?style.countingCard1 :style.countingCard}>
                                <div className={style.countingCardBody}>
                                    <div className={style.countingCardImg}>
                                    <Image src={v?.image} height={50} width={50} />
                                    <h3 className={style.countingCardCount} style={{color : v?.color}}>{v?.count}</h3>
                                    </div>
                                    <h3 className={style.countingCardTitle}>{v?.title}</h3>
                                    <p className={style.countingCardDesc}>{v?.desc}</p>
                                </div>
                            </div>
                        </Grid>
                        ))}
                        
                    </Grid>
                </Grid>

                <Grid item xs={1}></Grid>


            </Grid>
    </div>
  )
}

export default Counting
