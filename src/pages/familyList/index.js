import SelectDropdown from '@/components/SelectDropdown'
import MainLayout from '@/layout/MainLayout'
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import style from './familyList.module.css'
import ViewBtn from '@/components/MoreBtn/ViewBtn'
import VerifyBtn from '@/components/MoreBtn/VerifyBtn'
import { useDispatch, useSelector } from 'react-redux'
import { getMunicipalities } from '@/network/actions/getMunicipalities'
import { getWard } from '@/network/actions/getWard'
import { getDistrict } from '@/network/actions/getDistrict'
import { getFamilyList } from '@/network/actions/getFamilyList'
import ViewFamilyModal from './ViewFamilyModal'

const FamilyList = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch()
  const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const getFamilyListData = useSelector((state) => state.getFamilyList?.data)
  const [formData, setFormData] = useState({
    district: "",
    municipal: "",
    ward: "",
    })
    const [open, setOpen] = React.useState(false);
    const [viewData, setViewData] = useState({})
    const [page, setPage] = useState(1);
    console.log('getFamilyListData', getFamilyListData, page)

  console.log('open', open)
  const handleClickOpen = (v) => {
    setOpen(true);
    setViewData(v)
  };
  const handleClose = () => {
    setOpen(false);
    setViewData({})
  };

  useEffect(() => {
    dispatch(getDistrict())
  }, [])
  useEffect(() => {
    // if (getFamilyListData)
      // setPage(getFamilyListData?.number)
  }, [getFamilyListData])
  useEffect(() => {
    dispatch(getFamilyList(formData))
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handlePageChange = (event, value) => {
    setPage(value)
    console.log('value', value)
    dispatch(getFamilyList({...formData, page: value-1}))

  }
  return (
    <>
      <ViewFamilyModal open={open} handleClose={handleClose} viewData={viewData} />
      <MainLayout>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('district')}
              name="district"
              options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
              value={formData?.district}
              onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value })) }}
            />


          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('selectVillage')}
              name="municipal"
              options={municipalList?.map(v => ({ value: v?.id, label: v?.name }))}
              disabled={formData?.district != "" ? false : true}
              value={formData?.municipal}
              onChange={(e) => { handleChange(e); dispatch(getWard({ municipalId: e.target.value })) }}
            />

          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('selectWard')}
              name="ward"
              options={wardList?.map(v => ({ value: v?.id, label: v?.name }))}
              value={formData?.ward}
              disabled={formData?.district != "" && formData?.municipal != "" ? false : true}
              onChange={handleChange}
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
                {/* <th className={style.th}>SOCIAL CATEGORY	</th> */}
                <th className={style.th}>DISTRICT</th>
                <th className={style.th}>MUNICIPAL</th>
                <th className={style.th}>WARD	</th>
                <th className={style.th}>ACTION</th>
              </tr>
            </thead>
            <tbody>{getFamilyListData?.content?.map(v => (
              <tr className={style.tr}>
                <td className={style.td}>{v?.headMemberName}	</td>
                <td className={style.td}>{v?.rationCardNo}	</td>
                <td className={style.td}>{v?.totalMembers}</td>
                {/* <td className={style.td}>{v?.socialCategory}</td> */}
                <td className={style.td}>{v?.district}</td>
                <td className={style.td}>{v?.municipalName}</td>
                <td className={style.td}>{v?.wardName}	</td>
                <td className={style.td}><div className={style.btns}>
                  <ViewBtn title={"View"} onClick={() => handleClickOpen(v)} />
                  {/* <VerifyBtn title={"Verify"} onClick={() => { }} /> */}

                </div></td>                    </tr>
            ))}




            </tbody>
          </table>


        </div>

        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <Typography></Typography>

        <Stack spacing={2} >
          <Pagination color="primary" onChange={handlePageChange} count={getFamilyListData?.totalPages} page={page} />

        </Stack>
        <Typography>Total Family: {getFamilyListData?.totalElements}</Typography>
        </Box>
      </MainLayout>
    </>
  )
}

export default FamilyList
