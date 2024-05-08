import React from 'react'
import style from './home.module.css'
import { Grid, Tooltip, Typography } from '@mui/material'
import { FaCheckSquare } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";
import { FaInbox } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { styled } from '@mui/material/styles';
import  { tooltipClasses } from '@mui/material/Tooltip';


let data = [
    {
        icon: <FaCheckSquare color='white' size={40}/>,
        title: "Acts/Rules",
        color: "#71a330"
    },
    {
        icon: <FaRegListAlt color='white' size={40}/>,
        title: "Notifications",
        color: "#dc6800"
    },
    {
        icon: <FaBars color='white' size={40}/>,
        title: "Tenders",
        color: "#008bbb"
    },
    {
        icon: <FiFileText color='white' size={40}/>,
        title: "Procedure",
        color: "#14b3b9"
    },
    {
        icon: <FaHandshake color='white' size={40}/>,
        title: "Mission",
        color: "#fba714"
    },
    {
        icon: <FaInbox color='white' size={40}/>,
        title: "Instructions",
        color: "#ca0c5c"
    },
    {
        icon: <FaUsers color='white' size={40}/>,
        title: "Meetings",
        color: "#3b2b6c"
    },
    {
        icon: <FaUsers color='white' size={40}/>,
        title: "Office Circuler",
        color: "#fba714"
    },
]

const Activities = () => {
    return (
        <>
            <div className={style.activites}>
                <Grid container spacing={5} >
                    <Grid item xs={1}></Grid>
                    <Grid item xs={12}  md={2} >
                        <h2 className={style.activityTitle}>
                            Activities

                        </h2>
                        <p className={style.activityDesc}>Be an active partner in nation-building. Participate in Groups, Tasks, Discussions, Polls, Blogs and Talks. Contribute Now!</p>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={0} >
                            {data?.map(v => (
                                
                                 <Grid item xs={12}  sm={5} md={1.7} className={style.activityCard} style={{backgroundColor : v?.color, padding : "10px 10px"}}>
                                    <div>
                                    {/* <FaCheckSquare color='white' size={40}/> */}
                                    {v?.icon}
                                        <p style={{color : "white"}}>{v?.title}</p>
                                    </div>
                                </Grid>
                            ))}


                        </Grid>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </div>

        </>
    )
}

export default Activities
