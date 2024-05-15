import React, { useState } from 'react'
import style from "./registration.module.css"
import { Grid } from '@mui/material'
import SelectDropdown from '@/components/SelectDropdown'
import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import useTranslation from 'next-translate/useTranslation';
const AddParivar = () => {
    const { t } = useTranslation('common');
    console.log(t('welcome')); // Log the translation result


    const [formData, setFormData] = useState({
        village : ""
    })

    const handleChange = (e) => {
const {value, name} = e.target
setFormData({...formData, [name] : value})
}
  return (
    <div style={{marginTop : "20px"}}>
         <h1>{t('welcome')}</h1>
       <Grid container spacing={3} >
                    <Grid item xs={3}>
                        <SelectDropdown 
                        title="Select Village"
                        name="village"
                        options={[
                          { value: "Himachal Pradesh", label: "Himachal Pradesh" },
                          { value: "Shimla", label: "Shimla" },
                        ]}
                        value={formData?.village}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}>
                        <InputFieldWithIcon 
                            title="makan number"
                            // icon={<IoIosDocument size={20} />}
                            placeholder=""
                            type="text"
                            name="makan"
                            // value={signUpData?.aadhaar}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <InputFieldWithIcon 
                            title="makan number"
                            // icon={<IoIosDocument size={20} />}
                            placeholder=""
                            type="text"
                            name="makan"
                            // value={signUpData?.aadhaar}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <InputFieldWithIcon 
                            title="makan number"
                            // icon={<IoIosDocument size={20} />}
                            placeholder=""
                            type="text"
                            name="makan"
                            // value={signUpData?.aadhaar}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <InputFieldWithIcon 
                            title="makan number"
                            // icon={<IoIosDocument size={20} />}
                            placeholder=""
                            type="text"
                            name="makan"
                            // value={signUpData?.aadhaar}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <InputFieldWithIcon 
                            title="makan number"
                            // icon={<IoIosDocument size={20} />}
                            placeholder=""
                            type="text"
                            name="makan"
                            // value={signUpData?.aadhaar}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <InputFieldWithIcon 
                            title="makan number"
                            // icon={<IoIosDocument size={20} />}
                            placeholder=""
                            type="text"
                            name="makan"
                            // value={signUpData?.aadhaar}
                            onChange={handleChange}
                        />
                    </Grid>
                    </Grid>
    </div>
  )
}

export default AddParivar
