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
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import DeleteConfirmation from '@/components/Dialogs/delete';
import { deleteFamilyMember } from '@/network/actions/deleteFamilyMember';
import ViewMemberData from '@/components/Dialogs/viewMemberData';
import { useRouter } from 'next/router';
import { getFamilyHeadList } from '@/network/actions/getFamilyHeadList';
import formatDate from '@/utils/formatDate';



const Update = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch()
  const route = useRouter()
  const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const getFamilyListData = useSelector((state) => state.getFamilyHeadList?.data || [])
  const getfamilymemberList = useSelector((state) => state.getfamilymember?.data)
console.log('getFamilyListData', getFamilyListData)
const [openDelete, setOpenDelete] = useState(false)
const [openEdit, setOpenEdit] = useState(false)
  const [selectedFamilyHead, setSelectedFamilyHead] = useState(null)
  const [editUserData, setEditUserData] = useState({})
  const [deleteId, setDeleteId] = useState(null)

  const [formData, setFormData] = useState({
    district: "",
    municipal: "",
    ward: "",
    })

  useEffect(() => {
    dispatch(getDistrict())
  }, [])
  useEffect(() => {
    dispatch(getFamilyHeadList(formData))
  }, [formData]) 

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const onFamilyHeadSelect = (e) => {
    setSelectedFamilyHead(e.target.value)
    dispatch(getfamilymember(e.target.value))

  }

  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)

  const handleSubmitEdit = () => {
    handleCloseEdit()
    console.log('router', editUserData)
    route.push({pathname :'/edit-member',  query: { state: JSON.stringify(editUserData) }})
  }

  const handleOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)

  const handleSubmitDelete = () => {
    const extraAferDelete = () => {
      handleCloseDelete()
      dispatch(getfamilymember(selectedFamilyHead))
      // dispatch(getFamilyById(addFamilyData?.id))

    }
    dispatch(deleteFamilyMember(deleteId,extraAferDelete))
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
              onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value })) }}
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
              onChange={(e) => { handleChange(e); dispatch(getWard({ municipalId: e.target.value })) }}
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
              options={getFamilyListData?.map(v => ({ value: v?.family_id, label: v?.headMemberName+" ("+v?.family_id+")" }))}
              value={selectedFamilyHead}
              disabled={formData?.district != "" && formData?.municipal != ""  && formData?.ward != "" ? false : true}
requried
              onChange={onFamilyHeadSelect}
            />
          </Grid>
        </Grid>

        {(getfamilymemberList?.length > 0 && selectedFamilyHead) ? 
         <div className={style.tablewrapper} >
         <table className={style.table}>
           <thead className={style.thead}>
             <tr className={style.tr}>
               <th className={style.th}>NAME	</th>
               <th className={style.th}>GENDER	</th>
               <th className={style.th}>BIRTH DATE	</th>
               <th className={style.th}>CATEGORY	</th>
               {/* <th className={style.th}>SOCIAL CATEGORY	</th> */}
               <th className={style.th}>AADHAAR NUMBER</th>
               <th className={style.th}>PROFESSION</th>
               <th className={style.th}>ACTION</th>
             </tr>
           </thead>
           <tbody>{getfamilymemberList?.map(v => (
             <tr className={style.tr}>
               <td className={style.td}>{v?.memberName}	</td>
               <td className={style.td}>{v?.gender}	</td>
               <td className={style.td}>{formatDate(v?.date_of_birth)}</td>
               <td className={style.td}>{v?.socialCategory}	</td>
               {/* <td className={style.td}>{v?.socialCategory}</td> */}
               <td className={style.td}>{FormatAadharNumber(v?.aadhaarNo)}</td>
               <td className={style.td}>{v?.profession}</td>
               <td className={style.td}>
               <FaUserEdit onClick={() => {handleOpenEdit(); setEditUserData(v)}} size={22} color='#42A5F5' cursor="pointer"/>
               <MdDeleteForever onClick={() => {handleOpenDelete(); setDeleteId(v?.familyMemberId)}} size={24} color='#A04040' style={{marginLeft : "15px", cursor : "pointer"}}/>


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
    <ViewMemberData onSubmit={handleSubmitEdit} onCancle={handleCloseEdit} open={openEdit} data={editUserData}/>
      
    </MainLayout>
  )
}

export default Update
