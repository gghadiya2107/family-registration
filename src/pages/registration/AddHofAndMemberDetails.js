import { getEconomicStatus } from '@/network/actions/economicStatus';
import { getCategory } from '@/network/actions/getCategory';
import { getDistrict } from '@/network/actions/getDistrict';
import { getFamilyById } from '@/network/actions/getFamilyById';
import { getGender } from '@/network/actions/getGender';
import { getMemberStatus } from '@/network/actions/getMemberStatus';
import { getProfession } from '@/network/actions/getProfession';
import { getQualification } from '@/network/actions/getQualification';
import { getRelation } from '@/network/actions/getRelation';
import { getReligion } from '@/network/actions/getReligion';
import { getfamilymember } from '@/network/actions/getfamilymember';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import style from "./registration.module.css"
import SaveBtn from '@/components/MoreBtn/SaveBtn';
import CloseBtn from '@/components/MoreBtn/CloseBtn';
import MoreBtn from '@/components/MoreBtn';
import EditBtn from '@/components/EditBtn';
import { Grid } from '@mui/material';
import SelectDropdown from '@/components/SelectDropdown';
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import { isAlphabateKey, isAlphanumericKey } from '@/utils/regex';
import EditFamilyConfirmation from './EditFamilyConfirmation';
import { updateFamily } from '@/network/actions/updateFamily';


const AddHofAndMemberDetails = ({ selectedFamilyMember, state, setState }) => {
  const { t } = useTranslation("translation");
  const router = useRouter()
  const dispatch = useDispatch()
  const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const economicStatusList = useSelector((state) => state.getEconomicStatus?.data)
  const categorylist = useSelector((state) => state.getCategory?.data)
  const genderlist = useSelector((state) => state.getGender?.data)
  const relationlist = useSelector((state) => state.getRelation?.data)
  const memberStatusList = useSelector((state) => state.getMemberStatus?.data)
  const qualificationList = useSelector((state) => state.getQualification?.data)
  const profesionList = useSelector((state) => state.getProfession?.data)
  const religionList = useSelector((state) => state.getReligion?.data)
  const addFamilyData = useSelector((state) => state.addFamily?.data || [])
  const getFamilyByIdData = useSelector((state) => state.getFamilyById?.data?.[0])

  const [isEditMode, setIsEditMode] = useState(false)
  const [familyError, setFamilyError] = useState({})
  const [familyDetailsMore, setFamilyDetailsMore] = useState(false)
  const [familyDetailsExtra, setFamilyDetailsExtra] = useState()
  const [confirmationData, setConfirmationData] = useState({})
  const [EditModalType, setEditModalType] = useState(null)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  useEffect(() => {
    if (addFamilyData?.id) {

      dispatch(getFamilyById(addFamilyData?.id))
      dispatch(getfamilymember(addFamilyData?.id))
    }

  }, [addFamilyData])

  useEffect(() => {
    dispatch(getDistrict())
    dispatch(getEconomicStatus())
    dispatch(getCategory())
    dispatch(getGender())
    dispatch(getRelation())
    dispatch(getMemberStatus())
    dispatch(getQualification())
    dispatch(getProfession())
    dispatch(getReligion())
  }, [])
  const handleChangeFamilyDetails = (e) => {
    const { value, name } = e.target
    if (name == "dastavage") {

      const selectedFile = e.target.files[0];

      if (selectedFile && selectedFile.size <= 1024 * 1024) {
        setFamilyDetailsExtra({ ...familyDetailsExtra, [name]: e.target.files[0] })
        // setErrors({ ...errors, dastavage: "" })
      } else {
        setFamilyDetailsExtra({ ...familyDetailsExtra, [name]: null })

        // setErrors({ ...errors, dastavage: t('validateFileSize') })
        // setError('File size must be less than 1MB');
      }
    } else {

      setFamilyDetailsExtra({ ...familyDetailsExtra, [name]: value })
    }
  }

  const extraUpdate = () => {
    // setFamilyDetails(familyDetailsExtra);
    setIsEditMode(false)
    setFamilyError({})
  }
  const saveFamilyAfterEdit = () => {
    const validationErrors = validateFormFamily(familyDetailsExtra);
    console.log('familyDetailsExtra', familyDetailsExtra)
    if (Object.keys(validationErrors).length === 0) {
      let body = {
        "districtCode": familyDetailsExtra?.districtCode,
        "houseAddress": familyDetailsExtra?.houseAddress,
        "rationCardNo": familyDetailsExtra?.rationCardNo,
        "socialSubCategory": familyDetailsExtra?.socialSubCategory,
        "wardId": familyDetailsExtra?.wardId,
        "socialCategoryId": familyDetailsExtra?.socialCategoryId,
        "municipalityId": familyDetailsExtra?.municipalityId,
        "bplNumber": familyDetailsExtra?.bplNumber,
        "mobileNumber": familyDetailsExtra?.mobileNumber,
        "economicId": familyDetailsExtra?.economicId

      }
      dispatch(updateFamily(familyDetailsExtra?.family_id, body, extraUpdate))

    } else {
      setFamilyError(validationErrors);
    }
  }


  const validateFormFamily = (familyDetailsExtra) => {
    const errors = {};
    console.log('!familyDetailsExtra.municipal?.trim()', !familyDetailsExtra.municipal?.trim(), familyDetailsExtra.municipal?.trim(), familyDetailsExtra)
    if (!familyDetailsExtra.municipalityId?.trim()) {
      errors.municipalityId = t('validateMunucipal');
    }
    if (!familyDetailsExtra.districtCode?.trim()) {
      errors.districtCode = t('validateDistrict');
    }
    if (!familyDetailsExtra.wardId?.trim()) {
      errors.wardId = t("validateward");
    }
    if (!familyDetailsExtra.houseAddress?.trim()) {
      errors.houseAddress = t("ValidateHouseNumber");
    }
    if (!familyDetailsExtra.economicId?.trim() || familyDetailsExtra.economicId == "0") {
      errors.economicId = t("validateCondition");
    }
    if (familyDetailsExtra.economicId == "2" && !familyDetailsExtra.bplNumber?.trim()) {
      errors.bplNumber = t("validateBPL");
    }
    if (!familyDetailsExtra.socialCategoryId?.trim() || familyDetailsExtra.socialCategoryId == "0") {
      errors.socialCategoryId = t("validateCategory");
    }
    // if (!familyDetailsExtra.subclass?.trim()) {
    //   errors.subclass = t("validateSubCategory");
    // }
    if (!familyDetailsExtra.rationCardNo?.trim()) {
      errors.rationCardNo = t("validateRationCard");
    }
    if (!familyDetailsExtra.mobileNumber?.trim()) {
      errors.mobileNumber = t("validateMobile");
    }
    if (familyDetailsExtra.mobileNumber?.trim()?.length < 10) {
      errors.mobileNumber = t("validateMobileLength");
    }
    return errors;
  };

  return (
    <>
      <div className={style.heading} style={{ marginBottom: "5px" }}>Family Details</div>
      <div className={style.tablewrapper} style={{ margin: "0" }}>
        <table className={style.table}>
          <thead className={style.thead}>
            <tr className={style.tr}>
              <th className={style.th}>District</th>
              <th className={style.th}>Municipality</th>
              <th className={style.th}>Ward</th>
              <th className={style.th}>Rashan Card Number</th>
              <th className={style.th}>Mobile Number</th>
              <th className={style.th}></th>
            </tr>
          </thead>
          <tbody>
            <tr className={style.tr}>
              <td className={style.td}>{getFamilyByIdData?.district}</td>
              <td className={style.td}>{getFamilyByIdData?.municipalName}</td>
              <td className={style.td}>{getFamilyByIdData?.wardName}</td>
              <td className={style.td}>{getFamilyByIdData?.rationCardNo}</td>
              <td className={style.td}>{getFamilyByIdData?.mobileNumber}</td>
              <td className={style.td}>

                <div className="action">

                  {isEditMode ? <>
                    <SaveBtn title="Save" onClick={() => { saveFamilyAfterEdit() }} />
                    <CloseBtn title="Close" onClick={() => { setFamilyError({}); setIsEditMode(false) }} /></>
                    :
                    <>{familyDetailsMore ? <CloseBtn title="Close" onClick={() => { setFamilyDetailsMore(!familyDetailsMore) }} /> :
                      <MoreBtn title="More" onClick={() => { setFamilyDetailsMore(!familyDetailsMore) }} />}

                      <EditBtn title="Edit" disabled={familyDetailsMore} onClick={() => { setFamilyDetailsExtra(getFamilyByIdData); setConfirmationData(getFamilyByIdData); setEditModalType("family"); handleOpen() }} /></>
                  }
                </div>
              </td>
            </tr>
            {familyDetailsMore ? <tr >
              <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                <Grid container spacing={5}>
                  <Grid item xs={4}>
                    <p className={style.expandMargin}><b>District:</b> {getFamilyByIdData?.district}</p>
                    <p className={style.expandMargin}><b>Financial Condition:</b> {getFamilyByIdData?.economic}</p>
                    <p className={style.expandMargin}><b>Category:</b> {getFamilyByIdData?.socialCategory}</p>

                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.expandMargin}><b>Municipality:</b> {getFamilyByIdData?.municipalName}</p>
                    <p className={style.expandMargin}><b>House Number:</b> {getFamilyByIdData?.houseAddress}</p>

                    <p className={style.expandMargin}><b>Ration card number:</b> {getFamilyByIdData?.rationCardNo}</p>

                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.expandMargin}><b>Ward:</b> {getFamilyByIdData?.wardName}</p>

                    <p className={style.expandMargin}><b>House Number:</b> {getFamilyByIdData?.houseAddress}</p>
                    <p className={style.expandMargin}><b>Mobile Number:</b> {getFamilyByIdData?.mobileNumber}</p>

                  </Grid>
                </Grid>
              </td>
            </tr> : isEditMode ? <tr >
              <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                <Grid container spacing={3} style={{ marginBottom: "20px" }}>
                  <Grid item xs={4}>
                    <SelectDropdown
                      title={t('district')}
                      name="districtCode"
                      options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
                      value={familyDetailsExtra?.districtCode}
                      onChange={(e) => { handleChangeFamilyDetails(e); dispatch(getMunicipalities({ districtCode: e.target.value })) }}
                      requried
                    />
                    {familyError?.districtCode && <p className="error">{familyError?.districtCode}</p>}

                  </Grid>
                  <Grid item xs={4} >
                    <SelectDropdown

                      title={t('selectVillage')}
                      name="municipalityId"
                      options={municipalList?.map(v => ({ value: v?.id, label: v?.name }))}

                      value={familyDetailsExtra?.municipalityId}
                      onChange={(e) => { handleChangeFamilyDetails(e); dispatch(getWard({ municipalId: e.target.value })) }}
                      requried
                    />
                    {familyError?.municipalityId && <p className="error">{familyError?.municipalityId}</p>}
                  </Grid>
                  <Grid item xs={4}>
                    <SelectDropdown
                      title={t('selectWard')}

                      name="wardId"
                      options={wardList?.map(v => ({ value: v?.id, label: v?.name }))}

                      value={familyDetailsExtra?.wardId}
                      onChange={handleChangeFamilyDetails}
                      requried
                    />
                    {familyError?.wardId && <p className="error">{familyError?.wardId}</p>}
                  </Grid>
                  <Grid item xs={4} >
                    <InputFieldWithIcon
                      title={t('subCategory')}

                      placeholder=""
                      type="text"
                      name="socialSubCategory"
                      value={familyDetailsExtra?.socialSubCategory}
                      onKeyDown={(e) => {
                        if (!isAlphabateKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={handleChangeFamilyDetails}
                    />

                  </Grid>
                  <Grid item xs={4} >
                    <SelectDropdown
                      title={t('financialCondition')}

                      name="economicId"
                      options={economicStatusList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                      value={familyDetailsExtra?.economicId}
                      onChange={handleChangeFamilyDetails}
                      requried
                    />
                    {familyError?.economicId && <p className="error">{familyError?.economicId}</p>}
                  </Grid>

                  {familyDetailsExtra?.economicId == "2" && <Grid item xs={4} >
                    <InputFieldWithIcon
                      title={t('bplCount')}

                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="number"
                      onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
                      name="bplNumber"
                      value={familyDetailsExtra?.bplNumber}
                      onChange={handleChangeFamilyDetails}
                      requried
                    />
                    {familyError?.bplNumber && <p className="error">{familyError?.bplNumber}</p>}
                  </Grid>}
                  <Grid item xs={4} >
                    <InputFieldWithIcon
                      title={t('rathinCardNumber')}

                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="text"
                      name="rationCardNo"
                      value={familyDetailsExtra?.rationCardNo}
                      onChange={handleChangeFamilyDetails}
                      requried
                      onKeyDown={(e) => {
                        if (!isAlphanumericKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      disabled
                    />
                    {familyError?.rationCardNo && <p className="error">{familyError?.rationCardNo}</p>}

                  </Grid>
                  <Grid item xs={4}>
                    <InputFieldWithIcon
                      title={t('houseNumber')}

                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="text"
                      name="houseAddress"
                      value={familyDetailsExtra?.houseAddress}
                      onChange={handleChangeFamilyDetails}
                      requried
                      onKeyDown={(e) => {
                        if (!isAlphanumericKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {familyError?.houseAddress && <p className="error">{familyError?.houseAddress}</p>}
                  </Grid>
                  <Grid item xs={4} >
                    <SelectDropdown
                      title={t('category')}
                      // disabled
                      name="socialCategoryId"
                      options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
                      value={familyDetailsExtra?.socialCategoryId}
                      onChange={handleChangeFamilyDetails}
                      requried
                    />
                    {familyError?.socialCategoryId && <p className="error">{familyError?.socialCategoryId}</p>}
                  </Grid>
                  <Grid item xs={4} >
                    <InputFieldWithIcon

                      title={t('mobileNumber')}
                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="number"
                      onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
                      name="mobileNumber"
                      value={familyDetailsExtra?.mobileNumber}
                      onChange={(e) => e.target.value?.length > 10 ? null : handleChangeFamilyDetails(e)}
                      requried
                    />
                    {familyError?.mobileNumber && <p className="error">{familyError?.mobileNumber}</p>}

                  </Grid>
                </Grid>
              </td>
            </tr> : null}
          </tbody>
        </table>


      </div>
      <EditFamilyConfirmation 
      // nameTitle={nameTitle}
      //  memberList={memberList}
        // setMemberList={setMemberList}
         handleClose={handleClose}
          open={open}
           data={confirmationData}
            EditModalType={EditModalType} 
            setIsEditMode={setIsEditMode} 
            
            // setisEditModeHead={setisEditModeHead} 
            getFamilyByIdData={getFamilyByIdData}
            //  formData={formData}
              />

    </>
  )
}

export default AddHofAndMemberDetails
