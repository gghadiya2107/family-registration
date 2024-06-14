import SelectDropdown from '@/components/SelectDropdown';
import MainLayout from '@/layout/MainLayout'
import { Box, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const EditMember = () => {
    const { t } = useTranslation("translation");
    const router = useRouter();
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({})

    useEffect(() => {
        if(router?.query?.state){
            const stateObject = JSON.parse(router?.query?.state) || "";
            setUserData(stateObject)
            router.replace(router.pathname)
        }      
    }, [router])
    

    

  return (
    <MainLayout>
      <Box>
      <Grid container spacing={3} >
      <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={"Select type of editing"}
              name="district"
              options={[]}
            //   options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
            //   value={formData?.district}
            //   onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value })) }}
              requried
            />


          </Grid>
        </Grid>
        </Box> 
    </MainLayout>
  )
}

export default EditMember
