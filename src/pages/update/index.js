import SelectDropdown from '@/components/SelectDropdown';
import MainLayout from '@/layout/MainLayout'
import { getDistrict } from '@/network/actions/getDistrict';
import { getFamilyById } from '@/network/actions/getFamilyById';
import { getFamilyList } from '@/network/actions/getFamilyList';
import { getMunicipalities } from '@/network/actions/getMunicipalities';
import { getWard } from '@/network/actions/getWard';
import { getfamilymember } from '@/network/actions/getfamilymember';
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import style from '../registration/registration.module.css'
import FormatAadharNumber from '@/utils/formatAadharNumber';
import { FaEdit, FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import DeleteConfirmation from '@/components/Dialogs/delete';
import { deleteFamilyMember } from '@/network/actions/deleteFamilyMember';
import ViewMemberData from '@/components/Dialogs/viewMemberData';
import { useRouter } from 'next/router';
import { getFamilyHeadList } from '@/network/actions/getFamilyHeadList';
import formatDate from '@/utils/formatDate';
import { useLoading } from '@/utils/LoadingContext';
import toast from 'react-hot-toast';
import EditFamilyData from './EditFamilyData';
import { updateFamily } from '@/network/actions/updateFamily';



const Update = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch()
  const { loading, startLoading, stopLoading } = useLoading();

  const route = useRouter()
  const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const getFamilyListData = useSelector((state) => state.getFamilyHeadList?.data || [])
  const getfamilymemberList = useSelector((state) => state.getfamilymember?.data?.familyData)
  const getFamilyByIdData = useSelector((state) => state.getFamilyById?.data?.familyData?.[0] || {})
  console.log('getFamilyByIdData', getFamilyByIdData)
  const getFamilyByIdDataDoc = useSelector((state) => state.getFamilyById?.data?.familyDocData || [])
console.log('getFamilyListData', getFamilyListData)
const [openDelete, setOpenDelete] = useState(false)
const [openDeleteFamily, setOpenDeleteFamily] = useState(false)
const [openEdit, setOpenEdit] = useState(false)
const [openEditFamily, setOpenEditFamily] = useState(false)
  const [selectedFamilyHead, setSelectedFamilyHead] = useState(null)
  const [editUserData, setEditUserData] = useState({})
  const [deleteId, setDeleteId] = useState(null)
  const [deleteIdFamily, setDeleteIdFamily] = useState(null)
  const [editFamilyData, setEditFamilyData] = useState({})

  const handleChangeFamily = (e) => {
    const {name, value} = e.target
    if (name == "dastavage" || name == "dastavage2") {
      const selectedFile = e.target.files[0];
      setEditFamilyData({...editFamilyData, [name] : e.target.files[0]})
      

    } else {
      setEditFamilyData({...editFamilyData, [name]: value})
      
    }

  }

  const [formData, setFormData] = useState({
    district: "",
    municipal: "",
    ward: "",
    })
console.log('getFamilyListData', getFamilyListData)
  useEffect(() => {
    dispatch(getDistrict( startLoading, stopLoading ))
  }, [])
  useEffect(() => {
    dispatch(getFamilyHeadList(formData,startLoading, stopLoading))
  }, [formData]) 

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const onFamilyHeadSelect = (e) => {
    setSelectedFamilyHead(e.target.value)
    dispatch(getfamilymember(e.target.value,startLoading, stopLoading))
    dispatch(getFamilyById(+e.target.value,startLoading, stopLoading))

  }

  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)
  const handleOpenEditFamily = () => {setOpenEditFamily(true); setEditFamilyData({...getFamilyByIdData, headName : getfamilymemberList?.[0]?.familyMemberId})}
  const handleCloseEditFamily = () => setOpenEditFamily(false)

  const handleSubmitEdit = () => {
    handleCloseEdit()
    console.log('router', editUserData)
    route.push({pathname :'/edit-member',  query: { state: JSON.stringify(editUserData) }})
  }
  const handleSubmitEditFamily = () => {
    const extraUpdate = () => {

      handleCloseEditFamily()
      dispatch(getFamilyById(+editFamilyData?.family_id,startLoading, stopLoading))

    }
    let body = {
      "districtCode":editFamilyData?.districtCode,
      "houseAddress":editFamilyData?.houseAddress,
      "rationCardNo":editFamilyData?.rationCardNo,
      "socialSubCategory":editFamilyData?.socialSubCategory,
      "wardId":editFamilyData?.wardId,
      "socialCategoryId":editFamilyData?.socialCategoryId,
      "municipalityId":editFamilyData?.municipalityId,
      "bplNumber":editFamilyData?.bplNumber || "",
      "mobileNumber":editFamilyData?.mobileNumber?.replace("-",""),
      "economicId":editFamilyData?.economicId
      
  }
  dispatch(updateFamily(editFamilyData?.family_id, body, extraUpdate))
    // route.push({pathname :'/edit-member',  query: { state: JSON.stringify(editUserData) }})
  }

  const handleOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleOpenDeleteFamily = () => setOpenDeleteFamily(true)
  const handleCloseDeleteFamily = () => setOpenDeleteFamily(false)

  const handleSubmitDelete = () => {
    const extraAferDelete = () => {
      handleCloseDelete()
      dispatch(getfamilymember(selectedFamilyHead,startLoading, stopLoading))
      // dispatch(getFamilyById(addFamilyData?.id))

    }
    dispatch(deleteFamilyMember(deleteId,extraAferDelete,startLoading, stopLoading))
  }
  const handleSubmitDeleteFamily = () => {
    const extraAferDelete = () => {
      handleCloseDeleteFamily()
      dispatch(getFamilyById(+selectedFamilyHead,startLoading, stopLoading))
      // dispatch(getFamilyById(addFamilyData?.id))

    }
    alert("api integration remainng")
    // dispatch(deleteFamilyMember(deleteId,extraAferDelete,startLoading, stopLoading))
  }
  console.log("getfamilymemberList",getfamilymemberList)

  return (
    <MainLayout>
        <Box>
       <Grid container spacing={3} >
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('district')}
              name="district"
              options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
              value={formData?.district}
              onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value },startLoading, stopLoading )) }}
              requried
            />


          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('selectVillage')}
              name="municipal"
              options={municipalList?.map(v => ({ value: v?.id, label: v?.name }))}
              disabled={formData?.district != "" ? false : true}
              value={formData?.municipal}
              onChange={(e) => { handleChange(e); dispatch(getWard({ municipalId: e.target.value },startLoading, stopLoading )) }}
            requried
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
              requried
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('selectHOF')}
              name="hof"
              options={[{value : "", label : "Select..."},...getFamilyListData?.map(v => ({ value: v?.family_id, label: v?.headMemberName+" ("+v?.himParivarId+")" }))]}
              value={selectedFamilyHead}
              disabled={formData?.district != "" && formData?.municipal != ""  && formData?.ward != "" ? false : true}
requried
              onChange={onFamilyHeadSelect}
            />
          </Grid>
        </Grid>
        {(getfamilymemberList?.length > 0 && selectedFamilyHead) &&<div className={style.heading} style={{ marginTop: "20px" , marginBottom : "5px"}}>Family Details</div>}
        {(getfamilymemberList?.length > 0 && selectedFamilyHead) &&<div className={style.tablewrapper} style={{ margin: "0" }}>
            <table className={style.table}>
              <thead className={style.thead}>
                <tr className={style.tr}>
                  <th className={style.th}>Parivar No.</th>
                  <th className={style.th}>District</th>
                  <th className={style.th}>Municipal</th>
                  <th className={style.th}>Ward</th>
                  <th className={style.th}>Ration Card No.</th>
                  <th className={style.th}>Economic Status</th>
                  <th className={style.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>{getfamilymemberList?.[0]?.himParivarId}</td>
                  <td className={style.td}>{getFamilyByIdData?.district}</td>
                  <td className={style.td}>{getFamilyByIdData?.municipalName}</td>
                  <td className={style.td}>{ getFamilyByIdData?.wardName}</td>
                  <td className={style.td}>{getFamilyByIdData?.rationCardNo}</td>
                  <td className={style.td}>{getFamilyByIdData?.economic}</td>
                  <td className={style.td}>
               <FaEdit onClick={() => {handleOpenEditFamily()}} size={22} color='#42A5F5' cursor="pointer" title='Update'/>
               <MdDeleteForever onClick={() => {handleOpenDeleteFamily(); setDeleteIdFamily(getFamilyByIdData?.family_id)}} size={24} color='#A04040' style={{marginLeft : "15px", cursor : "pointer"}} title='Delete'/>


               </td>
                </tr>
              
              </tbody>
            </table>


          </div>}


        {(getfamilymemberList?.length > 0 && selectedFamilyHead) &&<div className={style.heading} style={{ marginTop: "20px" , marginBottom : "5px"}}>Member Details</div>}
        {(getfamilymemberList?.length > 0 && selectedFamilyHead) ? 
         <div className={style.tablewrapper} style={{margin : "0"}} >
         <table className={style.table}>
           <thead className={style.thead}>
             <tr className={style.tr}>
             <th className={style.th}>Him Member ID</th>

               <th className={style.th}>Name	</th>
               <th className={style.th}>Gender	</th>
               <th className={style.th}>Birth Date	</th>
               <th className={style.th}>Category	</th>
               {/* <th className={style.th}>SOCIAL CATEGORY	</th> */}
               <th className={style.th}>Aadhaar No.</th>
               <th className={style.th}>Action</th>
             </tr>
           </thead>
           <tbody>{getfamilymemberList?.map(v => (
             <tr className={style.tr}>
               <td className={style.td}>{v?.himMemberId}	</td>
               <td className={style.td}>{v?.memberName}	</td>
               <td className={style.td}>{v?.gender}	</td>
               <td className={style.td}>{formatDate(v?.date_of_birth)}</td>
               <td className={style.td}>{v?.socialCategory}	</td>
               {/* <td className={style.td}>{v?.socialCategory}</td> */}
               <td className={style.td}>{FormatAadharNumber(v?.aadhaarNo)}</td>
               <td className={style.td}>
               <FaEdit onClick={() => {handleOpenEdit(); setEditUserData(v)}} size={22} color='#42A5F5' cursor="pointer" title='Update'/>
               <MdDeleteForever onClick={() => {handleOpenDelete(); setDeleteId(v?.familyMemberId)}} size={24} color='#A04040' style={{marginLeft : "15px", cursor : "pointer"}} title='Delete'/>


               </td>
                               </tr>
                               
           ))}




           </tbody>
         </table>


       </div>
        :(getfamilymemberList?.length == 0 && selectedFamilyHead)?
        <Typography>No member found in this family</Typography> : ""
        }
  
    </Box>
    <DeleteConfirmation text="Are you sure you want to delete this member?" onSubmit={handleSubmitDelete} onCancle={handleCloseDelete} open={openDelete}/>
    <DeleteConfirmation text="Are you sure you want to delete this Family?" onSubmit={handleSubmitDeleteFamily} onCancle={handleCloseDeleteFamily} open={openDeleteFamily}/>
    <ViewMemberData onSubmit={handleSubmitEdit} onCancle={handleCloseEdit} open={openEdit} data={{...editUserData, ...formData}}/>
    <EditFamilyData onSubmit={handleSubmitEditFamily} onCancle={handleCloseEditFamily} open={openEditFamily} data={editFamilyData} handleChange={handleChangeFamily} getfamilymemberList={getfamilymemberList}/>
      
    </MainLayout>
  )
}

export default Update
