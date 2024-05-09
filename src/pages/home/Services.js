import React from 'react'
import style from './home.module.css'
import { Grid } from '@mui/material';
import Image from 'next/image';
import { getImagePath } from '@/utils/CustomImagePath';

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
        title: "Update Ration Card",
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
                            <Grid item xs={12} sm={4} md={3}>
                            <div className={style.serviceCard}>
                                <div className={style.serviceCardBody}>
                                    <Image src={getImagePath(v?.image)} height={80} width={80} />
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
