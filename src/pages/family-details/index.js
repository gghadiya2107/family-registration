import { getFamilyById } from '@/network/actions/getFamilyById'
import { getfamilymember } from '@/network/actions/getfamilymember'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../registration/registration.module.css'
import { updateFamily } from '@/network/actions/updateFamily'
import SaveBtn from '@/components/MoreBtn/SaveBtn'
import CloseBtn from '@/components/MoreBtn/CloseBtn'
import MoreBtn from '@/components/MoreBtn'
import EditBtn from '@/components/EditBtn'
import { getDistrict } from '@/network/actions/getDistrict'
import { getEconomicStatus } from '@/network/actions/economicStatus'
import { getCategory } from '@/network/actions/getCategory'
import { getGender } from '@/network/actions/getGender'
import { getRelation } from '@/network/actions/getRelation'
import { getMemberStatus } from '@/network/actions/getMemberStatus'
import { getQualification } from '@/network/actions/getQualification'
import { getProfession } from '@/network/actions/getProfession'
import { getReligion } from '@/network/actions/getReligion'
import EditFamilyConfirmation from '../registration/EditFamilyConfirmation'
import { Grid } from '@mui/material'
import SelectDropdown from '@/components/SelectDropdown'
import { getWard } from '@/network/actions/getWard'
import { getMunicipalities } from '@/network/actions/getMunicipalities'
import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import { isAlphabateKey, isAlphanumericKey } from '@/utils/regex'
import { useTranslation } from 'react-i18next'
import Layout from '@/layout'
import MainLayout from '@/layout/MainLayout'
import SubmitButton from '@/components/SubmitBtn'
import AddMemberModal from '../registration/AddMemberModal'
import DatePicker from '@/components/DatePicker'
import { updateFamilyMember } from '@/network/actions/updateFamilyMember'
import DeleteBtn from '@/components/MoreBtn/DeleteBtn'

const FamilyDetails = () => {
    const dispatch = useDispatch()
    const route = useRouter()
    const {id} = route.query

    const { t } = useTranslation("translation");

    const getFamilyByIdData = useSelector((state) => state.getFamilyById?.data?.[0])
    const getfamilymemberList = useSelector((state) => state.getfamilymember?.data)
    const [open, setOpen] = useState(false)
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

    const [familyDetailsExtra, setFamilyDetailsExtra] = useState()
    const [headDetailsExtra, setheadDetailsExtra] = useState()
    const [memberDetailsExtra, setMemberDetailsExtra] = useState({})
    const [confirmationData, setConfirmationData] = useState({})
    const [EditModalType, setEditModalType] = useState(null) // family, head, member
    const [saveHof, setSaveHof] = useState(false)
    const [memberList, setMemberList] = useState([])
    const [openModal, setOpenModal] = React.useState(false);
    const [familyDetailsMore, setFamilyDetailsMore] = useState(false)
    const [headDetailsMore, setHeadDetailsMore] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [isEditModeHead, setisEditModeHead] = useState(false)
    const [nameTitle, setNameTitle] = useState({})
    const [familyDetails, setFamilyDetails] = useState({})
    const [headDetails, setHeadDetails] = useState({})
    const [memberDetails, setMemberDetails] = useState([])
    const [errors, setErrors] = useState({});
    const [familyError, setFamilyError] = useState({})
    const [headError, setHeadError] = useState({})
    const [memberError, setMemberError] = useState({})
    console.log('memberList', memberList)
    // console.log('formData', formData)
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
  
    
    const [formData, setFormData] = useState({
      EnglishName: "",
      hindiName: "",
      relation : "",
      relative: "",
      dob: "",
      gender: "",
      registrationBase: "",
      refrence: "",
      education: "",
      work: "",
      category: familyDetails?.class || "",
      subCategory: "",
      rationCard: familyDetails?.rationCard ||"",
      religion: "",
      adharCard: "",
      dastavage: "",
      description: ""
    })
    const handleClickOpen = () => {
        setOpenModal(true);
      };
      const handleCloseModal = () => {
        setOpenModal(false);
      };
     
      const handleClose = () => {
        setOpen(false)
      }
      const handleOpen = () => {
        setOpen(true)
      }


    useEffect(() => {
        console.log('route', id)
        dispatch(getFamilyById(+id))

        dispatch(getfamilymember(id))

    }, [])

    useEffect(() => {
      
       if(getFamilyByIdData) setFamilyDetails(getFamilyByIdData)
    
    }, [getFamilyByIdData])
    useEffect(() => {
      
       if(getfamilymemberList) {
        let head = getfamilymemberList?.find(v => v.isHead == "true")
        setHeadDetails(head)
        setFormData(head)
        let member = getfamilymemberList?.filter(v => v.isHead != "true")
        setMemberDetails(member)
        setMemberList(member)
       }
    
    }, [getfamilymemberList])

    const validateFormFamily = (familyDetailsExtra) => {
        const errors = {};
        console.log('!familyDetailsExtra.municipal?.trim()', !familyDetailsExtra.municipal?.trim(),familyDetailsExtra.municipal?.trim(),familyDetailsExtra)
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
        if (!familyDetailsExtra.economicId?.trim() ||  familyDetailsExtra.economicId == "0") {
          errors.economicId = t("validateCondition");
        }
        if (familyDetailsExtra.economicId == "2" &&!familyDetailsExtra.bplNumber?.trim()) {
          errors.bplNumber = t("validateBPL");
        }
        if (!familyDetailsExtra.socialCategoryId?.trim() ||  familyDetailsExtra.socialCategoryId == "0") {
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
    
    const extraUpdate = () => {
        setFamilyDetails(familyDetailsExtra); setIsEditMode(false)
        setFamilyError({})
        dispatch(getfamilymember(addFamilyData?.id))
        dispatch(getFamilyById(addFamilyData?.id))
      
      
      }
        const saveFamilyAfterEdit = () => {
          const validationErrors = validateFormFamily(familyDetailsExtra);
          console.log('familyDetailsExtra', familyDetailsExtra)
          if (Object.keys(validationErrors).length === 0) {
            let body = {
                "districtCode":familyDetailsExtra?.districtCode,
                "houseAddress":familyDetailsExtra?.houseAddress,
                "rationCardNo":familyDetailsExtra?.rationCardNo,
                "socialSubCategory":familyDetailsExtra?.socialSubCategory,
                "wardId":familyDetailsExtra?.wardId,
                "socialCategoryId":familyDetailsExtra?.socialCategoryId,
                "municipalityId":familyDetailsExtra?.municipalityId,
                "bplNumber":familyDetailsExtra?.bplNumber,
                "mobileNumber":familyDetailsExtra?.mobileNumber,
                "economicId":familyDetailsExtra?.economicId
                
            }
            dispatch(updateFamily(familyDetailsExtra?.family_id, body, extraUpdate))
           
          } else {
            setFamilyError(validationErrors);
          }
        }
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

          const extraAferHeadUpdate = () => {
            setFormData(headDetailsExtra); setisEditModeHead(false)
              setHeadError({})
              dispatch(getfamilymember(addFamilyData?.id))
          dispatch(getFamilyById(addFamilyData?.id))
          }
          const saveHeadAfterEdit = () => {
            const validationErrors = validateFormHead(headDetailsExtra);
            console.log('headDetailsExtra', headDetailsExtra)
            if (Object.keys(validationErrors).length === 0) {
              let body = {
                  "memberName":headDetailsExtra?.memberName,
                  "memberNameHin":headDetailsExtra?.memberNameH,
                  "relativeName":headDetailsExtra?.relativeName,
                  "relationId":headDetailsExtra?.relationId,
                  "dateOfBirth":headDetailsExtra?.date_of_birth,
                  "genderId":headDetailsExtra?.genderId,
                  "memberStatusId":headDetailsExtra?.memberStatusId,
                  "referenceNo":headDetailsExtra?.reference_no,
                  "qualificationId":headDetailsExtra?.qualificationId,
                  "professionId":headDetailsExtra?.professionId,
                  "socialCategoryId":headDetailsExtra?.socialCategoryId,
                  "socialSubCategory":headDetailsExtra?.socialSubCategory,
                  "rationCardNo":headDetailsExtra?.rationCardNo,
                  "religionId":headDetailsExtra?.religionId,
                  "aadhaarNo":headDetailsExtra?.aadhaarNo,
                  "isHead":headDetailsExtra?.isHead,
                  "remarks":headDetailsExtra?.remarks || "",
                  "familyId":headDetailsExtra?.familyId
                  
              }
              dispatch(updateFamilyMember(headDetailsExtra?.familyMemberId, body,extraAferHeadUpdate))
            } else {
              setHeadError(validationErrors);
            }
          }
          const extraAferMemberUpdate = (index) => {
            changeisEditModeMember(index)
            setMemberError({})
          }
          const saveMemberAfterEdit = (index) => {
            const validationErrors = validateFormMember(memberDetailsExtra);
            console.log('memberDetailsExtra', memberDetailsExtra)
            if (Object.keys(validationErrors).length === 0) {
              let body = {
                "memberName":memberDetailsExtra?.memberName,
                "memberNameHin":memberDetailsExtra?.memberNameH,
                "relativeName":memberDetailsExtra?.relativeName,
                "relationId":memberDetailsExtra?.relationId,
                "dateOfBirth":memberDetailsExtra?.date_of_birth,
                "genderId":memberDetailsExtra?.genderId,
                "memberStatusId":memberDetailsExtra?.memberStatusId,
                "referenceNo":memberDetailsExtra?.reference_no,
                "qualificationId":memberDetailsExtra?.qualificationId,
                "professionId":memberDetailsExtra?.professionId,
                "socialCategoryId":memberDetailsExtra?.socialCategoryId,
                "socialSubCategory":memberDetailsExtra?.socialSubCategory,
                "rationCardNo":memberDetailsExtra?.rationCardNo,
                "religionId":memberDetailsExtra?.religionId,
                "aadhaarNo":memberDetailsExtra?.aadhaarNo,
                "isHead":memberDetailsExtra?.isHead,
                "remarks":memberDetailsExtra?.remarks || "",
                "familyId":memberDetailsExtra?.familyId
                
            }
              dispatch(updateFamilyMember(memberDetailsExtra?.familyMemberId, body,extraAferMemberUpdate, index))
        
            } else {
              setMemberError(validationErrors);
            }
          }

          const validateFormMember = (memberDetailsExtra) => {
            const errors = {};
            if (!memberDetailsExtra.memberName?.trim()) {
              errors.memberName = t("validateHeadName");
            }
        
            if (!memberDetailsExtra.date_of_birth?.trim()) {
              errors.date_of_birth = t("validateDOB");
            }
            if (!memberDetailsExtra.genderId?.trim() ||  memberDetailsExtra.genderId == "0") {
              errors.genderId = t("validateGender")
            }
            // if (!memberDetailsExtra.registrationBase?.trim()) {
            //   errors.registrationBase = t("validateBaseOfRegistration");
            // }
            if (!memberDetailsExtra.reference_no?.trim()) {
              errors.reference_no = t("validateRefrenceNumber");
            }
            // if (!memberDetailsExtra.education?.trim()) {
            //   errors.education = t("validateEducation");
            // }
            // if (!memberDetailsExtra.work) {
            //   errors.work = t("validateWork");
            // }
            if (!memberDetailsExtra.socialCategoryId ||  memberDetailsExtra.socialCategoryId == "0") {
              errors.socialCategoryId = t("validateCategory");
            }
            // if (!memberDetailsExtra.subCategory) {
            //   errors.subCategory = t("validateSubCategory");
            // }
            if (!memberDetailsExtra.rationCardNo) {
              errors.rationCardNo = t("validateRationCard");
            }
            if (!memberDetailsExtra.religionId ||  memberDetailsExtra.religionId == "0") {
              errors.religionId = t("validateReligion");
            }
            if (!memberDetailsExtra.aadhaarNo) {
              errors.aadhaarNo = t("validateAadhar");
            } else if (memberDetailsExtra.aadhaarNo?.trim()?.length < 12) {
              errors.aadhaarNo = t("validateAadharLength");
            }
            // if (!memberDetailsExtra.dastavage) {
            //   errors.dastavage = t("validateDocument");
            // }
            // if (!memberDetailsExtra.description) {
            //   errors.description = t("validateComment");
            // }
        
            return errors;
          };
          const validateFormHead = (headDetailsExtra) => {
            const errors = {};
            if (!headDetailsExtra.memberName?.trim()) {
              errors.memberName = t("validateHeadName");
            }
        
            if (!headDetailsExtra.date_of_birth?.trim()) {
              errors.date_of_birth = t("validateDOB");
            }
            if (!headDetailsExtra.genderId?.trim() ||  headDetailsExtra.genderId == "0") {
              errors.genderId = t("validateGender")
            }
            // if (!headDetailsExtra.registrationBase?.trim()) {
            //   errors.registrationBase = t("validateBaseOfRegistration");
            // }
            if (!headDetailsExtra.reference_no?.trim()) {
              errors.reference_no = t("validateRefrenceNumber");
            }
            // if (!headDetailsExtra.education?.trim()) {
            //   errors.education = t("validateEducation");
            // }
            // if (!headDetailsExtra.work) {
            //   errors.work = t("validateWork");
            // }
            if (!headDetailsExtra.socialCategory ||  headDetailsExtra.socialCategory == "0") {
              errors.socialCategory = t("validateCategory");
            }
            // if (!headDetailsExtra.subCategory) {
            //   errors.subCategory = t("validateSubCategory");
            // }
            if (!headDetailsExtra.rationCardNo) {
              errors.rationCardNo = t("validateRationCard");
            }
            if (!headDetailsExtra.religionId ||  headDetailsExtra.religionId == "0") {
              errors.religionId = t("validateReligion");
            }
            if (!headDetailsExtra.aadhaarNo) {
              errors.aadhaarNo = t("validateAadhar");
            } else if (headDetailsExtra.aadhaarNo?.trim()?.length < 12) {
              errors.aadhaarNo = t("validateAadharLength");
            }
            // if (!headDetailsExtra.dastavage) {
            //   errors.dastavage = t("validateDocument");
            // }
            // if (!headDetailsExtra.description) {
            //   errors.description = t("validateComment");
            // }
        
            return errors;
          };
          const handleChangeHeadDetails = (e) => {
            const { value, name } = e.target
            if (name == "dastavage") {
        
              const selectedFile = e.target.files[0];
        
              if (selectedFile && selectedFile.size <= 1024 * 1024) {
                setheadDetailsExtra({ ...headDetailsExtra, [name]: e.target.files[0] })
                // setErrors({ ...errors, dastavage: "" })
              } else {
                setheadDetailsExtra({ ...headDetailsExtra, [name]: null })
        
                // setErrors({ ...errors, dastavage: t('validateFileSize') })
                // setError('File size must be less than 1MB');
              }
            } else {
        
              setheadDetailsExtra({ ...headDetailsExtra, [name]: value })
            }
          }
          const handleChangeMemberDetails = (e) => {
            const { value, name } = e.target
            if (name == "dastavage") {
        
              const selectedFile = e.target.files[0];
        
              if (selectedFile && selectedFile.size <= 1024 * 1024) {
                setMemberDetailsExtra({ ...memberDetailsExtra, [name]: e.target.files[0] })
                // setErrors({ ...errors, dastavage: "" })
              } else {
                setMemberDetailsExtra({ ...headDetailsExtra, [name]: null })
        
                // setErrors({ ...errors, dastavage: t('validateFileSize') })
                // setError('File size must be less than 1MB');
              }
            } else {
        
              setMemberDetailsExtra({ ...memberDetailsExtra, [name]: value })
            }
          }

          const addMember = () => {
            const validationErrors = {};
            // const validationErrors = validateForm(formData);
            console.log('validationErrors', validationErrors)
            if (Object.keys(validationErrors).length === 0) {
              setErrors({})
              handleClickOpen()
            } else {
              setErrors(validationErrors);
            }
          }

          const openMemberDetails = (i) => {
            let data = [...memberList]
            let newData = data?.map((v, index) => index == i ? { ...v, memberDetailsMore: !v?.memberDetailsMore } : v)
            setMemberList(newData)
          }
        
          const changeisEditModeMember = (v) => {
            let data = [...memberList]
            let newData = data?.map((k, index) => index == v ? { ...memberDetailsExtra, isEditModeMember: false } : k)
            setMemberList(newData)
            setMemberError({})
        
          }
          const changeisEditModeMemberClose = (v) => {
            let data = [...memberList]
            let newData = data?.map((k, index) => index == v ? { ...k, isEditModeMember: false } : k)
            setMemberList(newData)
            setMemberError({})
          }
          const changeisEditModeMemberDelete = (v) => {
            let data = [...memberList]
            let newData = data?.filter((k, index) => index != v)
            setMemberList(newData)
            setMemberError({})
        
          }
  return (
    <MainLayout>
      <div className={style.heading} style={{ marginBottom: "5px" }}>Family Details</div>
      <div className={style.tablewrapper} style={{ margin: "0" }}>
        <table className={style.table}>
          <thead className={style.thead}>
            <tr className={style.tr}>
              <th className={style.th}>District</th>
              <th className={style.th}>Municipality</th>
              <th className={style.th}>Ward</th>
              <th className={style.th}>Ration Card Number</th>
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
                    <DeleteBtn title="Delete"  />

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
disabled
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
                    />
                    {familyError?.rationCardNo && <p className="error">{familyError?.rationCardNo}</p>}

                  </Grid>
                  <Grid item xs={4}>
                    <InputFieldWithIcon
                      title={t('houseNumber')}

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
                      name="socialCategoryId"
                      options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
                      value={familyDetailsExtra?.socialCategoryId}
                      onChange={handleChangeFamilyDetails}
                      requried
                      disabled
                    />
                    {familyError?.socialCategoryId && <p className="error">{familyError?.socialCategoryId}</p>}
                  </Grid>
                  <Grid item xs={4} >
                    <InputFieldWithIcon

                      title={t('mobileNumber')}
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
      <div className={style.heading} style={{ marginBottom: "5px", marginTop: "20px" }}>Family Head Details</div>
          <div className={style.tablewrapper} style={{ margin: "0" }}>
            <table className={style.table}>
              <thead className={style.thead}>
                <tr className={style.tr}>
                  <th className={style.th}>Head of Family Name</th>
                  <th className={style.th}>Ration Card Number</th>
                  <th className={style.th}>Religion</th>
                  <th className={style.th}>Social Category</th>
                  <th className={style.th}></th>
                </tr>
              </thead>
              <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>{formData?.memberName}</td>
                  <td className={style.td}>{formData?.rationCardNo}</td>
                  <td className={style.td}>{ formData?.religion}</td>
                  <td className={style.td}>{formData?.socialCategory}</td>
                  <td className={style.td}>

                    <div className="action">
                      {isEditModeHead ? <>
                        <SaveBtn title="Save" onClick={() => { saveHeadAfterEdit() }} />
                        <DeleteBtn title="Delete"  />

                        <CloseBtn title="Close" onClick={() => { setHeadError({}); setisEditModeHead(false) }} /></>
                        :
                        <>
                          {headDetailsMore ? <CloseBtn title="Close" onClick={() => { setHeadDetailsMore(!headDetailsMore) }} /> :
                            <MoreBtn title="More" onClick={() => { setHeadDetailsMore(!headDetailsMore) }} />}

                          <EditBtn title="Edit" disabled={headDetailsMore} onClick={() => { setheadDetailsExtra(formData); setConfirmationData(formData); setEditModalType("head"); handleOpen() }} />
                        </>}
                    </div>
                  </td>
                </tr>
                {headDetailsMore ? <tr  >
                  <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>
                    <Grid container spacing={5}>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Head Of Family:</b> {formData?.memberName}</p>
                        <p className={style.expandMargin}><b>Date of Birth:</b> {formData?.date_of_birth}</p>
                        <p className={style.expandMargin}><b>Gender:</b> {formData?.gender}</p>
                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Refrance Number:</b> {formData?.reference_no}</p>
                        <p className={style.expandMargin}><b>Religion:</b> {formData?.religion}</p>
                        <p className={style.expandMargin}><b>Category:</b> {formData?.socialCategory}</p>

                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Ration card number:</b> {formData?.rationCardNo}</p>
                        <p className={style.expandMargin}><b>Aadhar Card Number:</b> {formData?.aadhaarNo}</p>
                        {/* <p className={style.expandMargin}><b>Sub Category:</b> {formData?.subCategory}</p> */}

                      </Grid>
                    </Grid>
                  </td>
                </tr> : isEditModeHead ? <tr  >
                  <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                    <Grid container spacing={3} style={{ marginBottom: "20px" }}>
                      <Grid item xs={4} >
                        <InputFieldWithIcon

                          title={t('headOfFamilyName')}
                          subTitle="(in English)"
                          // icon={<IoIosDocument size={20} />}
                          placeholder=""
                          type="text"
                          disabled
                          name="memberName"
                          value={headDetailsExtra?.memberName}
                          onChange={handleChangeHeadDetails}
                          onKeyDown={(e) => {
                            if (!isAlphabateKey(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          requried
                        />
                        {headError?.memberName && <p className="error">{headError?.memberName}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <DatePicker
                          title={t('dateOfBirth')}
                          disabled
                          type="date"
                          requried
                          name="date_of_birth"
                          value={headDetailsExtra?.date_of_birth}
                          onChange={handleChangeHeadDetails}
                        />
                        {headError?.date_of_birth && <p className="error">{headError?.date_of_birth}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <SelectDropdown
                          title={t('gender')}
                          disabled
                          name="genderId"
                          options={genderlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                          value={headDetailsExtra?.genderId}
                          onChange={handleChangeHeadDetails}
                          requried
                        />
                        {headError?.genderId && <p className="error">{headError?.genderId}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <InputFieldWithIcon

                          title={t('refrenceNumber')}
                          // icon={<IoIosDocument size={20} />}
                          placeholder=""
                          type="text"
                          name="reference_no"
                          value={headDetailsExtra?.reference_no}
                          onChange={handleChangeHeadDetails}
                          requried
                          onKeyDown={(e) => {
                            if (!isAlphanumericKey(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {headError?.reference_no && <p className="error">{headError?.reference_no}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <SelectDropdown
                          title={t('religion')}

                          name="religionId"
                          options={religionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                          value={headDetailsExtra?.religionId}
                          onChange={handleChangeHeadDetails}
                          requried
                        />
                        {headError?.religionId && <p className="error">{headError?.religionId}</p>}
                      </Grid>
                      
                      <Grid item xs={4}>
                        <InputFieldWithIcon
                          title={t('subCategory')}

                          // icon={<IoIosDocument size={20} />}
                          placeholder=""
                          type="text"
                          name="socialSubCategory"
                          value={headDetailsExtra?.socialSubCategory}
                          onChange={handleChangeHeadDetails}
                        // requried
                        onKeyDown={(e) => {
                          if (!isAlphabateKey(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        />
                        {/* {headError?.subCategory && <p className="error">{headError?.subCategory}</p>} */}
                      </Grid>
                      <Grid item xs={4}>
                        <InputFieldWithIcon
                          title={t('rathinCardNumber')}
disabled
                          // icon={<IoIosDocument size={20} />}
                          placeholder=""
                          type="text"
                          name="rationCardNo"
                          value={headDetailsExtra?.rationCardNo}
                          onChange={handleChangeHeadDetails}
                          onKeyDown={(e) => {
                            if (!isAlphanumericKey(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          requried
                        />
                        {headError?.rationCardNo && <p className="error">{headError?.rationCardNo}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <InputFieldWithIcon
                          title={t('aadharCardNumber')}
                          disabled
                          // icon={<IoIosDocument size={20} />}
                          placeholder=""
                          type="number"
                          onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
                          name="aadhaarNo"
                          value={headDetailsExtra?.aadhaarNo}
                          onChange={(e) => e.target.value?.length > 12 ? null : handleChangeHeadDetails(e)}
                          requried
                        />
                        {headError?.aadhaarNo && <p className="error">{headError?.aadhaarNo}</p>}

                      </Grid>
                    </Grid>
                  </td>
                </tr> : null}
              </tbody>
            </table>


          </div>
          {memberList?.length > 0 && <><div className={style.heading} style={{ marginBottom: "5px", marginTop: "20px" }}>Family Member Details</div>
            <div className={style.tablewrapper} style={{ margin: "0" }}>
              <table className={style.table}>
                <thead className={style.thead}>
                  <tr className={style.tr}>
                    <th className={style.th}>Name</th>
                    <th className={style.th}>Date of Birth</th>
                    <th className={style.th}>Aadhar Number</th>
                    <th className={style.th}>eKYC Varification Status</th>
                    <th className={style.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {memberList?.map((v, index) => (<>
                    <tr className={style.tr}>
                      <td className={style.td}>{v?.memberName}</td>
                      <td className={style.td}>{v?.date_of_birth}</td>
                      <td className={style.td}>{v?.aadhaarNo}</td>
                      <td className={style.td}>Document not Attached</td>
                      <td className={style.td}>

                        <div className="action">

                          {v?.isEditModeMember ? <>
                            <SaveBtn title="Save" onClick={() => { saveMemberAfterEdit(index) }} />
                            <DeleteBtn title="Delete" onClick={() => { changeisEditModeMemberDelete(index) }} />
                            <CloseBtn title="Close" onClick={() => { setMemberError({}); changeisEditModeMemberClose(index) }} /></>
                            :
                            <>
                              {v?.memberDetailsMore ? <CloseBtn title="Close" onClick={() => { openMemberDetails(index) }} /> :
                                <MoreBtn title="More" onClick={() => { openMemberDetails(index) }} />}

                              <EditBtn title="Edit" disabled={v?.memberDetailsMore} onClick={() => { setMemberDetailsExtra(v); setConfirmationData(v); setEditModalType("member"); handleOpen() }} />
                            </>}
                        </div>
                      </td>
                    </tr>
                    {v?.memberDetailsMore ? <tr  >
                      <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                        <Grid container spacing={5}>
                          <Grid item xs={4}>
                            <p className={style.expandMargin}><b>Member Name:</b> {v?.memberName}</p>
                            <p className={style.expandMargin}><b>Date of Birth:</b> {v?.date_of_birth}</p>
                            <p className={style.expandMargin}><b>Gender:</b> {v?.gender}</p>
                            {/* <p className={style.expandMargin}><b>Is Verified:</b> Document not Attached</p> */}

                          </Grid>
                          <Grid item xs={4}>
                            <p className={style.expandMargin}><b>Refrance Number:</b> {v?.reference_no}</p>
                            <p className={style.expandMargin}><b>Religion:</b> {v?.religion}</p>
                            <p className={style.expandMargin}><b>Category:</b> { v?.socialCategory}</p>

                          </Grid>
                          <Grid item xs={4}>
                            {/* <p className={style.expandMargin}><b>Sub Category:</b> {v?.subCategory}</p> */}
                            <p className={style.expandMargin}><b>Ration card number:</b> {v?.rationCardNo}</p>
                            <p className={style.expandMargin}><b>Aadhar Card Number:</b> {v?.aadhaarNo}</p>

                          </Grid>
                        </Grid>
                      </td>
                    </tr> : v?.isEditModeMember ? <tr  >
                      <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                        <Grid container spacing={3} style={{ marginBottom: "20px" }}>
                          <Grid item xs={4}>
                            <InputFieldWithIcon


                              title={t('memberName')}
                              subTitle="(in English)"
                              // icon={<IoIosDocument size={20} />}
                              placeholder=""
                              disabled
                              type="text"
                              name="memberName"
                              value={memberDetailsExtra?.memberName}
                              onChange={handleChangeMemberDetails}
                              onKeyDown={(e) => {
                                if (!isAlphabateKey(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              requried
                            />
                            {memberError?.memberName && <p className="error">{memberError?.memberName}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <DatePicker
                              title={t('dateOfBirth')}
                              disabled
                              type="date"
                              requried
                              name="date_of_birth"
                              value={memberDetailsExtra?.date_of_birth}
                              onChange={handleChangeMemberDetails}
                            />
                            {memberError?.date_of_birth && <p className="error">{memberError?.date_of_birth}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <SelectDropdown
                              title={t('gender')}
                              disabled
                              name="genderId"
                              options={genderlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                              value={memberDetailsExtra?.genderId}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.genderId && <p className="error">{memberError?.genderId}</p>}
                          </Grid>
                          {/* <Grid item xs={4}>
                            <SelectDropdown

                              title={t('isVerified')}
                              name="isVerified"
                              options={[
                                { value: "poor", label: "Verified" },
                                { value: "rich", label: "Not Varified" },
                              ]}
                              value={memberDetailsExtra?.isVerified}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.isVerified && <p className="error">{memberError?.isVerified}</p>}

                          </Grid> */}
                          <Grid item xs={4}>
                            <InputFieldWithIcon

                              title={t('refrenceNumber')}
                              // icon={<IoIosDocument size={20} />}
                              placeholder=""
                              type="text"
                              name="reference_no"
                              value={memberDetailsExtra?.reference_no}
                              onChange={handleChangeMemberDetails}
                              requried
                              onKeyDown={(e) => {
                                if (!isAlphanumericKey(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {memberError?.reference_no && <p className="error">{memberError?.reference_no}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <SelectDropdown
                              title={t('religion')}

                              name="religionId"
                              options={religionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                              value={memberDetailsExtra?.religionId}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.religionId && <p className="error">{memberError?.religionId}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <SelectDropdown

                              title={t('category')}
                              name="socialCategoryId"
                              options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
disabled
                              value={memberDetailsExtra?.socialCategoryId}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.socialCategoryId && <p className="error">{memberError?.socialCategoryId}</p>}

                          </Grid>
                          <Grid item xs={4}>
                            <InputFieldWithIcon

                              title={t('subCategory')}
                              placeholder=""
                              type="text"
                              name="socialSubCategory"
                              value={memberDetailsExtra?.socialSubCategory}
                              onChange={handleChangeMemberDetails}
                            // requried
                            onKeyDown={(e) => {
                              if (!isAlphabateKey(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            />
                            {/* {memberError?.subCategory && <p className="error">{memberError?.subCategory}</p>} */}
                          </Grid>
                          <Grid item xs={4}>
                            <InputFieldWithIcon
  disabled
                              title={t('rathinCardNumber')}
                              placeholder=""
                              type="text"
                              name="rationCardNo"
                              value={memberDetailsExtra?.rationCardNo}
                              onChange={handleChangeMemberDetails}
                              requried
                              onKeyDown={(e) => {
                                if (!isAlphanumericKey(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {memberError?.rationCardNo && <p className="error">{memberError?.rationCardNo}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <InputFieldWithIcon
disabled
                              title={t('aadharCardNumber')}
                              placeholder=""
                              type="number"
                              onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
                              name="aadhaarNo"
                              value={memberDetailsExtra?.aadhaarNo}
                              onChange={(e) => e.target.value?.length > 12 ? null : handleChangeMemberDetails(e)}
                              requried
                            />
                            {memberError?.aadhaarNo && <p className="error">{memberError?.aadhaarNo}</p>}

                          </Grid>
                        </Grid>
                      </td>
                    </tr> : null}
                  </>))}
                </tbody>
              </table>


            </div></>}
          <div className={style.save} style={{ float: "none", textAlign: "center" }}>
            <SubmitButton label="Add Member" onClick={addMember} />
            {/* <SubmitButton label="Save Family" onClick={() => alert("done")} style={{ marginLeft: "20px" }} /> */}
          </div>
      <EditFamilyConfirmation nameTitle={nameTitle} memberList={memberList} setMemberList={setMemberList} handleClose={handleClose} open={open} data={confirmationData} EditModalType={EditModalType} setIsEditMode={setIsEditMode} setisEditModeHead={setisEditModeHead} getFamilyByIdData={getFamilyByIdData} formData={formData}/>
      <AddMemberModal handleClose={handleCloseModal} open={openModal} setMemberList={setMemberList} memberList={memberList} getFamilyByIdData={getFamilyByIdData}/>

    </MainLayout>
  )
}

export default FamilyDetails
