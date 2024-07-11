import SelectDropdown from '@/components/SelectDropdown';
import SubmitButton from '@/components/SubmitBtn';
import { getDistrict } from '@/network/actions/getDistrict'
import { getFamilyList } from '@/network/actions/getFamilyList';
import { getMunicipalities } from '@/network/actions/getMunicipalities';
import { getWard } from '@/network/actions/getWard';
import { getfamilymember } from '@/network/actions/getfamilymember';
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import style from "./registration.module.css"
import FormatAadharNumber from '@/utils/formatAadharNumber';
import { getFamilyById } from '@/network/actions/getFamilyById';
import AddMemberModal from './AddMemberModal';
import formatDate from '@/utils/formatDate';
import { useLoading } from '@/utils/LoadingContext';

const AddMember = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch()
  const { loading, startLoading, stopLoading } = useLoading();

  const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const getFamilyListData = useSelector((state) => state.getFamilyList?.data || [])
  const getFamilyByIdData = useSelector((state) => state.getFamilyById?.data || {})
  console.log('getFamilyByIdData', getFamilyByIdData)
  const addFamilyData = useSelector((state) => state.addFamily?.data || [])


  const getfamilymemberList = useSelector((state) => state.getfamilymember?.data?.familyData || [])
  console.log('getFamilyListData', getFamilyListData)
  const [openModal, setOpenModal] = React.useState(false);

  const [selectedFamilyHead, setSelectedFamilyHead] = useState(null)
  const [formData, setFormData] = useState({
    district: "",
    municipal: "",
    ward: "",
    })

  useEffect(() => {
    dispatch(getDistrict(startLoading, stopLoading))
    dispatch(getFamilyById(addFamilyData?.id))
  }, [])
  useEffect(() => {
    dispatch(getFamilyList(formData,startLoading, stopLoading))
  }, [formData])
  useEffect(() => {
    console.log('selectedFamilyHead', selectedFamilyHead)
   if(selectedFamilyHead) dispatch(getFamilyById(+selectedFamilyHead))
  }, [selectedFamilyHead])

 

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const onFamilyHeadSelect = (e) => {
    setSelectedFamilyHead(e.target.value)
    dispatch(getfamilymember(e.target.value,startLoading, stopLoading))

  }

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
    <Box mt={3}>
       <Grid container spacing={3} >
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('district')}
              name="district"
              options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
              value={formData?.district}
              onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value },startLoading, stopLoading)) }}
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
              onChange={(e) => { handleChange(e); dispatch(getWard({ municipalId: e.target.value },startLoading, stopLoading)) }}
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
              options={getFamilyListData?.content?.map(v => ({ value: v?.family_id, label: v?.headMemberName+" ("+v?.family_id+")" }))}
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
                               </tr>
           ))}




           </tbody>
         </table>


       </div>
        :(getfamilymemberList?.length == 0 && selectedFamilyHead)?
        <Typography>No member found in this family</Typography> : ""
        }
    {selectedFamilyHead &&     <div  style={{ float: "none", textAlign: "center", marginTop : "30px" }}>
            <SubmitButton label="Add Member" onClick={handleClickOpen} />
          </div>}
    </Box>
    <AddMemberModal handleClose={handleCloseModal} open={openModal} setMemberList={[]} memberList={{}} getFamilyByIdData={getFamilyByIdData}/>

    </>
  )
}

export default AddMember
