import React from 'react'
import style from './footer.module.css'
import { Grid } from '@mui/material'
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import Image from 'next/image';


const FooterTwo = () => {
    return (
        <div className={style.footer}>
            <Grid container spacing={3} >
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <h3 className={style.title}>About Us</h3>
                            <p className={style.desc}>Family register is an Entitlement based Management System which is being developed into an integrated State Social Registry. It consists of family registry, beneficiary management system, beneficiary registry, direct benefit platform and a grievance redressal system.</p>
                       <div className={style.social}>
                        <FaTwitter className={style.icon} />
                        <FaFacebookF className={style.icon}/>
                        <FaGithub className={style.icon}/>
                        <FaDribbble className={style.icon}/>
                        <FaLinkedinIn className={style.icon}/>
                        <TfiYoutube className={style.icon}/>
                       </div>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={2}>
                            <h3 className={style.title}>Links</h3>
                            <p className={style.descLink}>Knowledge Base</p>
                            <p className={style.descLink}>Career</p>
                            <p className={style.descLink}>Press Releases</p>
                            <p className={style.descLink}>Terms of Services</p>
                            <p className={style.descLink}>Privacy Policy</p>
                        </Grid>
                        <Grid item xs={1}></Grid>

                        <Grid item xs={4}>
                            <h3 className={style.title}>Contact Us</h3>

                            <p className={style.desc}>HIMACHAL PRADESH INFORMATION TECHNOLOGY DEPARTMENT



                            </p>
                            <p className={style.desc} style={{ margin: "10px 0" }}>Phone. <a href="tel:+911772628914">+91 1772628914</a>
                                <br /> Email. <a href="mailto:dirit-hp@nic.in">dirit-hp@nic.in</a></p>
                            <p className={style.desc}>
                                Office Visiting Hours: <br />
                                Monday to Friday (010:00 AM to 06:00 PM)
                            </p>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={1}></Grid>


            </Grid>

            <div className={style.divider}>
                <hr className={style.hr}/>
            </div>

            <div style={{width:"80%", margin : "auto", marginBottom : "-20px"}}>
            <Grid container spacing={3} mt={4}>
                <Grid item xs={2} className={style.fBorder} style={{paddingTop : 0}}>
                <Image src="/f1.png" width={100} height={80} className={style.fImg} />
                </Grid>
                <Grid item xs={2} className={style.fBorder} style={{paddingTop : 0}}    >
                <Image src="/f2.png" width={100} height={80} className={style.fImg} />
                </Grid>
                <Grid item xs={2} className={style.fBorder} style={{paddingTop : 0}}    >
                <Image src="/f3.png" width={100} height={80} className={style.fImg} />
                </Grid>
                <Grid item xs={2} className={style.fBorder} style={{paddingTop : 0}}    >
                <Image src="/f4.png" width={100} height={80} className={style.fImg} />
                </Grid>
                <Grid item xs={2} className={style.fBorder} style={{paddingTop : 0}}    >
                <Image src="/f5.png" width={100} height={80} className={style.fImg} />
                </Grid>
                <Grid item xs={2} className={style.fBorder1} style={{paddingTop : 0}}    >
                <Image src="/f6.png" width={100} height={80} className={style.fImg} />
                </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default FooterTwo
