import React from 'react'
import style from "./registration.module.css"
import { Grid } from '@mui/material'
import KeyValueDetails from '@/components/KeyValueDetails'
import SubmitButton from '@/components/SubmitBtn'


const FamilyDetails = () => {
  return (
    <div style={{ marginTop: "20px" }}>

                        <div className={style.heading}>Confirm Family Details</div>
                        <Grid container spacing={3} >

                            <Grid item xs={12} sm={4} md={3} >
                                <KeyValueDetails title="परिवार नंबर" value="1037588" />

                            </Grid>
                            <Grid item xs={12} sm={4} md={3} >
                                <KeyValueDetails title="मुखिया का नाम" value="गौरांग घाडिया" />

                            </Grid>
                            <Grid item xs={12} sm={4} md={3} >
                                <KeyValueDetails title="परिवार का मोबाइल नंबर" value="9016193206" />

                            </Grid>
                            <Grid item xs={12} sm={4} md={3} >
                                <KeyValueDetails title="मकान नंबर" value="301" />

                            </Grid>
                            <Grid item xs={12} sm={4} md={3} >
                                <KeyValueDetails title="परिवार की आर्थिक स्थिति" value="ऐ पि ऐल" />

                            </Grid>
                            <Grid item xs={12} sm={4} md={3} >
                                <KeyValueDetails title="बी पी एल संख्या" value="87689" />

                            </Grid>
                            <Grid item xs={12} sm={4} md={3} >
                                <KeyValueDetails title="वर्ग" value="आजा" />

                            </Grid>
                            <Grid item xs={12} sm={4} md={3} >
                                <KeyValueDetails title="उप-वर्ग" value="-" />

                            </Grid>
                            <Grid item xs={12} sm={4} md={3} >
                                <KeyValueDetails title="राशन कार्ड नंबर" value="698698" />

                            </Grid>
                            <Grid item xs={12} sm={4} md={3} >
                                <KeyValueDetails title="दस्तावेज़" value="आधार कार्ड पीडीऍफ़" />

                            </Grid>
                            <Grid item xs={12} sm={12} >
                                <KeyValueDetails title="टिपण्णी" value="ये परिवार तारीख 10-04-2024 को इस पंचायत में दर्ज किया गया है" />
                            </Grid>

                        </Grid>
                        <div className={style.tablewrapper}>
                            <table className={style.table}>
                                <thead className={style.thead}>
                                    <tr className={style.tr}>
                                        <th className={style.th}>Sr. No.</th>
                                        <th className={style.th}>Member's Name</th>
                                        <th className={style.th}>Guardian's Name</th>
                                        <th className={style.th}>Age</th>
                                        <th className={style.th}>Document</th>
                                        <th className={style.th}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={style.tr}>
                                        <td className={style.td}>1</td>
                                        <td className={style.td}>Ramesh Kumar</td>
                                        <td className={style.td}>S/o Radhe Shyam</td>
                                        <td className={style.td}>67</td>
                                        <td className={style.td}>pdf</td>
                                        <td className={style.td}>Check Details</td>
                                    </tr>
                                    <tr className={style.tr}>
                                        <td className={style.td}>2</td>
                                        <td className={style.td}>Ram Singh</td>
                                        <td className={style.td}>S/o Shyam Singh</td>
                                        <td className={style.td}>54</td>
                                        <td className={style.td}>pdf</td>
                                        <td className={style.td}>Check Details</td>
                                    </tr>
                                    <tr className={style.tr}>
                                        <td className={style.td}>3</td>
                                        <td className={style.td}>Rita Kumari</td>
                                        <td className={style.td}>W/o Ramesh kumar</td>
                                        <td className={style.td}>63</td>
                                        <td className={style.td}>pdf</td>
                                        <td className={style.td}>Check Details</td>
                                    </tr> <tr className={style.tr}>
                                        <td className={style.td}>4</td>
                                        <td className={style.td}>Manoj Singh</td>
                                        <td className={style.td}>S/o Shyam Singh</td>
                                        <td className={style.td}>27</td>
                                        <td className={style.td}>pdf</td>
                                        <td className={style.td}>Check Details</td>
                                    </tr>
                                </tbody>
                            </table>
                      

                        </div>

                        <div className={style.save}>
                            <SubmitButton label="Edit Details" />
                            <SubmitButton label="Confirm & Add Family" style={{ marginLeft: "20px" }} />
                        </div>
                    </div>
  )
}

export default FamilyDetails
