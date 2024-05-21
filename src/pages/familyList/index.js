import SelectDropdown from '@/components/SelectDropdown'
import MainLayout from '@/layout/MainLayout'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import style from './familyList.module.css'
import ViewBtn from '@/components/MoreBtn/ViewBtn'
import VerifyBtn from '@/components/MoreBtn/VerifyBtn'
import { useDispatch, useSelector } from 'react-redux'
import { getMunicipalities } from '@/network/actions/getMunicipalities'
import { getWard } from '@/network/actions/getWard'
import { getDistrict } from '@/network/actions/getDistrict'

const FamilyList = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch()
  const districtList = useSelector((state) => state.getDistrict?.data?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data?.data)
  const wardList = useSelector((state) => state.getWard?.data?.data)
  const [formData, setFormData] = useState({
    municipal : "",
    ward : ""
  })

  useEffect(() => {
    dispatch(getDistrict())
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name] : value})
  }
  return (
    <MainLayout>
        <Grid container spacing={3} >
        <Grid item xs={12} sm={4} md={4}>
        <SelectDropdown
                      title={t('district')}
                      name="district"
                      options={districtList?.map(v => ({ value: v?.districtCode, label: v?.districtName }))}
                      value={formData?.district}
                      onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value })) }}
                      // requried
                    />
           

        </Grid>
        <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
                title={t('selectVillage')}
                name="municipal"
                options={municipalList?.map(v => ({ value: v?.municipalId, label: v?.municipalName }))}

                value={formData?.municipal}
                onChange={(e) => {handleChange(e); dispatch(getWard({municipalId: e.target.value}))}}

                // requried
            />

        </Grid>
        <Grid item xs={12} sm={4} md={4}>
        <SelectDropdown
                title={t('selectWard')}
                name="ward"
                options={wardList?.map(v => ({ value: v?.wardNo, label: v?.wardName }))}

                value={formData?.ward}
                onChange={handleChange}
                // requried
            />
        </Grid>
        </Grid>

        <div className={style.tablewrapper} >
              <table className={style.table}>
                <thead className={style.thead}>
                  <tr className={style.tr}>
                    <th className={style.th}>HEAD OF FAMILY	</th>
                    <th className={style.th}>RATION NO.	</th>
                    <th className={style.th}>TOTAL MEMBERS	</th>
                    <th className={style.th}>ECONOMIC STATUS	</th>
                    <th className={style.th}>SOCIAL CATEGORY	</th>
                    <th className={style.th}>RELIGION</th>
                    <th className={style.th}>RESIDENT</th>
                    <th className={style.th}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                    <tr className={style.tr}>
                      <td className={style.td}>Kameshwar Singh	</td>
                      <td className={style.td}>HP2014111109510	</td>
                      <td className={style.td}>4</td>
                      <td className={style.td}>B.P.L	</td>
                      <td className={style.td}>General</td>
                      <td className={style.td}>Hindu</td>
                      <td className={style.td}>Urban</td>
                      <td className={style.td}><div className={style.btns}>
                        <ViewBtn title={"View"} onClick={() => {}} />
                        <VerifyBtn title={"Verify"} onClick={() => {}} />

                        </div></td>                    </tr>
                    <tr className={style.tr}>
                      <td className={style.td}>Kameshwar Singh	</td>
                      <td className={style.td}>HP2014111109510	</td>
                      <td className={style.td}>4</td>
                      <td className={style.td}>B.P.L	</td>
                      <td className={style.td}>General</td>
                      <td className={style.td}>Hindu</td>
                      <td className={style.td}>Urban</td>
                      <td className={style.td}><div className={style.btns}>
                        <ViewBtn title={"View"} onClick={() => {}} />
                        <VerifyBtn title={"Verify"} onClick={() => {}} />

                        </div></td>
                    </tr>
                 
                
                </tbody>
              </table>


            </div>
    </MainLayout>
  )
}

export default FamilyList
