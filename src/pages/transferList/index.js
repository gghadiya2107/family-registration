import MainLayout from '@/layout/MainLayout'
import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import style from './TransferList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getDistrict } from '@/network/actions/getDistrict'
import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import SubmitButton from '@/components/SubmitBtn'
import { memberTransferList } from '@/network/actions/memberTransferList'
import formatDate from '@/utils/formatDate'
import toast from 'react-hot-toast'
import ViewFamilyModal from './ViewFamilyModal'
import { isNumericKeyWithSpace } from '@/utils/regex'
import { useLoading } from '@/utils/LoadingContext'
import { MdArrowForward, MdNavigateNext, MdSearch } from 'react-icons/md'

const TransferList = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch()
  const { loading, startLoading, stopLoading } = useLoading();

  const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const getFamilyListData = useSelector((state) => state.getFamilyList?.data)
  const memberTransferListData = useSelector((state) => state.memberTransferList?.data)
  console.log("memberTransferListData",memberTransferListData)
  const [formData, setFormData] = useState({
    district_id: "",
    municipal: "",
    ward_id: "",
    ration_card_no: "",
    aadhaar_no: "",
    himparivar_no : ""
    })
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState([])
    useEffect(() => {
      if(formData?.aadhaar_no || formData?.himparivar_no || formData?.ration_card_no)
        setTableData(memberTransferListData)
    }, [memberTransferListData])
    
    console.log('getFamilyListData', getFamilyListData, page)

  console.log('open', open)
  const handleClickOpen = (v) => {
    setOpen(true);
    // setViewData(v)
  };
  const handleClose = () => {
    setOpen(false);
    // setViewData({})
  };

  useEffect(() => {
    dispatch(getDistrict(startLoading, stopLoading))

    return(() => {
      setTableData([])
    })
  }, [])
  useEffect(() => {
    // if (getFamilyListData)
      // setPage(getFamilyListData?.number)
  }, [getFamilyListData])
//   useEffect(() => {
//     dispatch(memberTransferList({...formData}))
//   }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handlePageChange = (event, value) => {
    setPage(value)
    console.log('value', value)
    dispatch(memberTransferList({...formData, page: value-1},startLoading, stopLoading))

  }

  const handleSearch = () => {
    if( formData?.himparivar_no ){

        dispatch(memberTransferList({...formData},startLoading, stopLoading))
    }else{
        toast.error("Please fill search data")
    }
  }
  console.log('tableData', tableData)
  return (
    <>
      <ViewFamilyModal open={open} handleClose={handleClose} viewData={tableData?.filter(k => k?.isChecked)} setTableData={setTableData} />
      <MainLayout>
        <Grid container spacing={3} >
          {/* <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('district')}
              name="district_id"
              options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
              value={formData?.district_id}
              onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value })) }}
            />


          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('selectVillage')}
              name="municipal_id"
              options={municipalList?.map(v => ({ value: v?.id, label: v?.name }))}
              disabled={formData?.district != "" ? false : true}
              value={formData?.municipal_id}
              onChange={(e) => { handleChange(e); dispatch(getWard({ municipalId: e.target.value })) }}
            />

          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('selectWard')}
              name="ward_id"
              options={wardList?.map(v => ({ value: v?.id, label: v?.name }))}
              value={formData?.ward_id}
              disabled={formData?.district != "" && formData?.municipal != "" ? false : true}
              onChange={handleChange}
            />
          </Grid> */}
          <Grid item xs={12} sm={6} md={6}>
          <InputFieldWithIcon
                title={t('searchByParivarIdorRationNoAadharNo')}           
              placeholder=""
              type="text"
              name="himparivar_no"
              value={formData?.himparivar_no}
              onChange={handleChange}
              
            />
          </Grid>
          {/* <Grid item xs={12} sm={4} md={3}>
          <InputFieldWithIcon
                title={t('rathinCardNumber')}
                // icon={<IoIosDocument size={20} />}
              placeholder=""
              type="text"
              name="ration_card_no"
              value={formData?.ration_card_no}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
          <InputFieldWithIcon
                title={t('aadharCardNumber')}
                // icon={<IoIosDocument size={20} />}
              placeholder=""
              type="text"
              onKeyDown={(e) => {
                if (!(isNumericKeyWithSpace(e.key) || e.key === 'Backspace'|| e.key === "ArrowLeft"|| e.key === "ArrowRight")) {
                  e.preventDefault();
                }
              }}             name="aadhaar_no"
              value={formData?.aadhaar_no?.replace(/(\d{4})(?=\d)/g, '$1 ')}
              onChange={(e) => e.target.value?.length > 14 ? null : handleChange(e)}
            />
          </Grid> */}
          <Grid item xs={12} sm={4} md={1} mt={3}>
         <SubmitButton label={"Search"} icon={<MdSearch size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={handleSearch}/>
          </Grid>
        </Grid>

       {tableData?.length >  0 ? <div className={style.tablewrapper} >
          <table className={style.table}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th}>Him Member ID	</th>
                <th className={style.th}>Name	</th>
                <th className={style.th}>Ration No.	</th>
                <th className={style.th}>Birth Date	</th>
                {/* <th className={style.th}>SOCIAL CATEGORY	</th> */}
                <th className={style.th}>District</th>
                <th className={style.th}>Municipal</th>
                <th className={style.th}>Ward</th>
                <th className={style.th}>Action</th>
              </tr>
            </thead>
            <tbody>{tableData?.map(v => (
              <tr className={style.tr}>
                <td className={style.td}>{v?.himMemberId}	</td>

                <td className={style.td}>{v?.memberName}	</td>
                <td className={style.td}>{v?.rationCardNo}	</td>
                <td className={style.td}>{formatDate(v?.dateOfBirth)}	</td>
                {/* <td className={style.td}>{v?.socialCategory}</td> */}
                <td className={style.td}>{v?.district}</td>
                <td className={style.td}>{v?.municipalName}</td>
                <td className={style.td}>{v?.wardName}</td>
                <td className={style.td}><div className={style.btns}>
                    {/* <p style={{cursor : "pointer", color : "blue"}} onClick={() => handleClickOpen(v)}>Select</p> */}
                    <input type="checkbox" className={style.checkbox} value={v?.isChecked}
                            onChange={(e) => setTableData(tableData?.map(p => p?.memberId == v?.memberId ? { ...p, isChecked: e.target.checked } : p))}
                          />

                </div></td>                    </tr>
            ))}




            </tbody>
          </table>


        </div> : <Typography textAlign={"center"} mt={5}>No Data Found!</Typography>}
        {tableData?.some(k => k?.isChecked) && <Box display={"flex"} alignItems={"center"} justifyContent={"center"} mt={3}>
            <SubmitButton label={"Next"} icon={<MdArrowForward size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={() => handleClickOpen()} />
        </Box>}

        {/* <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <Typography></Typography>

        <Stack spacing={2} >
          <Pagination color="primary" onChange={handlePageChange} count={memberTransferListData?.totalPages} page={page} />

        </Stack>
        <Typography>Total Family: {memberTransferListData?.totalElements}</Typography>
        </Box> */}
      </MainLayout>
    </>
  )
}

export default TransferList
