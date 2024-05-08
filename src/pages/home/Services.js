import React from 'react'
import style from './home.module.css'
import { Grid } from '@mui/material';
import Image from 'next/image';

let featureData = [
    {
        image: "/fe1.png",
        title: "Family Registration",
    },
    {
        image: "/ekyc.png",
        title: "Family Member eKYC",
    },
    {
        image: "/copy.png",
        title: "Copy of Parivar",
    },
    {
        image: "/family.png",
        title: "Update Family",
    },
    {
        image: "/member.png",
        title: "Update Member",
    },
    {
        image: "/rashan.png",
        title: "Update Rashan Card",
    },
];

const Services = () => {
    return (
        <>
            <h2 className={style.services} >Our Services</h2>
            <Grid container spacing={3} mb={5}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Grid container spacing={3}>
                        {featureData?.map(v => (
                            <Grid item xs={3}>
                            <div className={style.serviceCard}>
                                <div className={style.serviceCardBody}>
                                    <Image src={v?.image} height={80} width={80} />
                                    <h3 className={style.serviceCardTitle}>{v?.title}</h3>
                                    <p className={style.serviceCardDesc}>Registration & Amendment of Establishment under Building and Other Construction Work Act, 1996</p>
                                </div>
                            </div>
                        </Grid>
                        ))}
                        
                    </Grid>
                </Grid>

                <Grid item xs={1}></Grid>


            </Grid>
        </>
    )
}

export default Services
