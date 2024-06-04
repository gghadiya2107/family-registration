import React, { useEffect, useState } from 'react'
import style from "./registration.module.css"
import { Grid } from '@mui/material'
import SelectDropdown from '@/components/SelectDropdown'
import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import SubmitButton from '@/components/SubmitBtn'
import FileUpload from '@/components/FileUpload'
import DatePicker from '@/components/DatePicker'
import TextArea from '@/components/TextArea'
import { useTranslation } from 'next-i18next'
import MoreBtn from '@/components/MoreBtn'
import EditBtn from '@/components/EditBtn'
import EditFamilyConfirmation from './EditFamilyConfirmation'
import { useRouter } from 'next/router'
import AddMemberModal from './AddMemberModal'
import CloseBtn from '@/components/MoreBtn/CloseBtn'
import SaveBtn from '@/components/MoreBtn/SaveBtn'
import DeleteBtn from '@/components/MoreBtn/DeleteBtn'
import { getMunicipalities } from '@/network/actions/getMunicipalities'
import { useDispatch, useSelector } from 'react-redux'
import { getDistrict } from '@/network/actions/getDistrict'
import { getWard } from '@/network/actions/getWard'
import { getEconomicStatus } from '@/network/actions/economicStatus'
import { getCategory } from '@/network/actions/getCategory'
import { getGender } from '@/network/actions/getGender'
import { getMemberStatus } from '@/network/actions/getMemberStatus'
import { getQualification } from '@/network/actions/getQualification'
import { getProfession } from '@/network/actions/getProfession'
import { getReligion } from '@/network/actions/getReligion'
import translateToHindi from '@/utils/translate'
import { isAlphabateKey, isAlphanumericKey } from '@/utils/regex'
import { getFamilyById } from '@/network/actions/getFamilyById'
import { getRelation } from '@/network/actions/getRelation'




const AddHOF = ({ setState, familyDetails, setFamilyDetails }) => {
  const { t } = useTranslation("translation");
  const router = useRouter()
  const dispatch = useDispatch()
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
  const getFamilyByIdData = useSelector((state) => state.getFamilyById?.data?.[0])
  const addFamilyData = useSelector((state) => state.addFamily?.data || [])

console.log('relationlist', relationlist)
console.log('getFamilyByIdData', getFamilyByIdData)
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

  useEffect(() => {
    if(addFamilyData){

      dispatch(getFamilyById(addFamilyData?.id))
    }

  }, [addFamilyData])
  
  useEffect(() => {
    setNameTitle({
      municipal: municipalList?.find(v => v?.id == familyDetails?.municipal)?.name,

      ward: wardList?.find(v => v?.id == familyDetails?.ward)?.name,
      condition: economicStatusList?.find(v => v?.id == familyDetails?.condition)?.nameE,
      class: categorylist?.find(v => v?.id == familyDetails?.class)?.nameE
    })
  }, [familyDetails])
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

  const [formData, setFormData] = useState({
    EnglishName: "",
    hindiName: "",
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
  const [errors, setErrors] = useState({});
  const [familyError, setFamilyError] = useState({})
  const [headError, setHeadError] = useState({})
  const [memberError, setMemberError] = useState({})
 
  const changeLang = async(name) => {
    if(name){

      const text  = await translateToHindi(name);
      if(text){
        
        setFormData({ ...formData, hindiName: text })
        // return text
      }
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target
   

    if (name == "dastavage") {

      const selectedFile = e.target.files[0];

      if (selectedFile && selectedFile.size <= 1024 * 1024) {
        setFormData({ ...formData, [name]: e.target.files[0] })
        setErrors({ ...errors, dastavage: "" })
      } else {
        setFormData({ ...formData, [name]: null })

        setErrors({ ...errors, dastavage: t('validateFileSize') })
        // setError('File size must be less than 1MB');
      }
    } else {

      setFormData({ ...formData, [name]: value })
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
    if (Object.keys(validationErrors).length === 0) {
      setErrors({})
      handleClickOpen()
    } else {
      setErrors(validationErrors);
    }
  }

  const onSave = () => {
    const validationErrors = {};
    // const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setState("3")
    } else {
      setErrors(validationErrors);
    }
  }

  const handleSaveHOF = () => {
    // const validationErrors = {};
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setSaveHof(true)
    } else {
      setErrors(validationErrors);
    }
  }

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.EnglishName?.trim()) {
      errors.EnglishName = t("validateHeadName");
    }
    if (!formData.hindiName?.trim()) {
      errors.hindiName = t("validateHeadName");
    }
    if (!formData.relative?.trim()) {
      errors.relative = t("validateRelativeName");
    }
    if (!formData.dob?.trim()) {
      errors.dob = t("validateDOB");
    }
    if (!formData.gender?.trim() || formData?.gender == "0") {
      errors.gender = t("validateGender")
    }
    if (!formData.registrationBase?.trim() || formData?.registrationBase == "0") {
      errors.registrationBase = t("validateBaseOfRegistration");
    }
    if (!formData.refrence?.trim()) {
      errors.refrence = t("validateRefrenceNumber");
    }
    if (!formData.education?.trim() || formData?.education == "0") {
      errors.education = t("validateEducation");
    }
    if (!formData.work || formData?.work == "0") {
      errors.work = t("validateWork");
    }
    if (!formData.category || formData?.category == "0") {
      errors.category = t("validateCategory");
    }
    // if (!formData.subCategory) {
    //   errors.subCategory = t("validateSubCategory");
    // }
    if (!formData.rationCard) {
      errors.rationCard = t("validateRationCard");
    }
    if (!formData.religion || formData?.religion == "0") {
      errors.religion = t("validateReligion");
    }
    if (!formData.adharCard) {
      errors.adharCard = t("validateAadhar");
    } else if (formData.adharCard?.trim()?.length < 12) {
      errors.adharCard = t("validateAadharLength");
    }
    if (!formData.dastavage) {
      errors.dastavage = t("validateDocument");
    }
    if (!formData.description) {
      errors.description = t("validateComment");
    }

    return errors;
  };

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

  // const saveEditMember = (v) => {
  //   let data = [...memberList]
  //   let newData = data?.map((k, index) => index == v ? memberDetailsExtra : k)
  //   setMemberList(newData)
  // }

  const saveFamilyAfterEdit = () => {
    const validationErrors = validateFormFamily(familyDetailsExtra);
    if (Object.keys(validationErrors).length === 0) {
      setFamilyDetails(familyDetailsExtra); setIsEditMode(false)
      setFamilyError({})
    } else {
      setFamilyError(validationErrors);
    }
  }
  const saveHeadAfterEdit = () => {
    const validationErrors = validateFormHead(headDetailsExtra);
    if (Object.keys(validationErrors).length === 0) {
      setFormData(headDetailsExtra); setisEditModeHead(false)
      setHeadError({})
    } else {
      setHeadError(validationErrors);
    }
  }
  const saveMemberAfterEdit = (index) => {
    const validationErrors = validateFormMember(memberDetailsExtra);
    if (Object.keys(validationErrors).length === 0) {
      // setFormData(headDetailsExtra); setisEditModeHead(false)
      changeisEditModeMember(index)
      setMemberError({})
    } else {
      setMemberError(validationErrors);
    }
  }

  const validateFormMember = (memberDetailsExtra) => {
    const errors = {};
    if (!memberDetailsExtra.EnglishName?.trim()) {
      errors.EnglishName = t("validateHeadName");
    }

    if (!memberDetailsExtra.dob?.trim()) {
      errors.dob = t("validateDOB");
    }
    if (!memberDetailsExtra.gender?.trim() ||  memberDetailsExtra.gender == "0") {
      errors.gender = t("validateGender")
    }
    // if (!memberDetailsExtra.registrationBase?.trim()) {
    //   errors.registrationBase = t("validateBaseOfRegistration");
    // }
    if (!memberDetailsExtra.refrence?.trim()) {
      errors.refrence = t("validateRefrenceNumber");
    }
    // if (!memberDetailsExtra.education?.trim()) {
    //   errors.education = t("validateEducation");
    // }
    // if (!memberDetailsExtra.work) {
    //   errors.work = t("validateWork");
    // }
    if (!memberDetailsExtra.category ||  memberDetailsExtra.category == "0") {
      errors.category = t("validateCategory");
    }
    // if (!memberDetailsExtra.subCategory) {
    //   errors.subCategory = t("validateSubCategory");
    // }
    if (!memberDetailsExtra.rationCard) {
      errors.rationCard = t("validateRationCard");
    }
    if (!memberDetailsExtra.religion ||  memberDetailsExtra.religion == "0") {
      errors.religion = t("validateReligion");
    }
    if (!memberDetailsExtra.adharCard) {
      errors.adharCard = t("validateAadhar");
    } else if (memberDetailsExtra.adharCard?.trim()?.length < 12) {
      errors.adharCard = t("validateAadharLength");
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
    if (!headDetailsExtra.EnglishName?.trim()) {
      errors.EnglishName = t("validateHeadName");
    }

    if (!headDetailsExtra.dob?.trim()) {
      errors.dob = t("validateDOB");
    }
    if (!headDetailsExtra.gender?.trim() ||  headDetailsExtra.gender == "0") {
      errors.gender = t("validateGender")
    }
    // if (!headDetailsExtra.registrationBase?.trim()) {
    //   errors.registrationBase = t("validateBaseOfRegistration");
    // }
    if (!headDetailsExtra.refrence?.trim()) {
      errors.refrence = t("validateRefrenceNumber");
    }
    // if (!headDetailsExtra.education?.trim()) {
    //   errors.education = t("validateEducation");
    // }
    // if (!headDetailsExtra.work) {
    //   errors.work = t("validateWork");
    // }
    if (!headDetailsExtra.category ||  headDetailsExtra.category == "0") {
      errors.category = t("validateCategory");
    }
    // if (!headDetailsExtra.subCategory) {
    //   errors.subCategory = t("validateSubCategory");
    // }
    if (!headDetailsExtra.rationCard) {
      errors.rationCard = t("validateRationCard");
    }
    if (!headDetailsExtra.religion ||  headDetailsExtra.religion == "0") {
      errors.religion = t("validateReligion");
    }
    if (!headDetailsExtra.adharCard) {
      errors.adharCard = t("validateAadhar");
    } else if (headDetailsExtra.adharCard?.trim()?.length < 12) {
      errors.adharCard = t("validateAadharLength");
    }
    // if (!headDetailsExtra.dastavage) {
    //   errors.dastavage = t("validateDocument");
    // }
    // if (!headDetailsExtra.description) {
    //   errors.description = t("validateComment");
    // }

    return errors;
  };

  const validateFormFamily = (familyDetailsExtra) => {
    const errors = {};
    if (!familyDetailsExtra.municipal?.trim()) {
      errors.municipal = t('validateMunucipal');
    }
    if (!familyDetailsExtra.district?.trim()) {
      errors.district = t('validateDistrict');
    }
    if (!familyDetailsExtra.ward?.trim()) {
      errors.ward = t("validateward");
    }
    if (!familyDetailsExtra.makan?.trim()) {
      errors.makan = t("ValidateHouseNumber");
    }
    if (!familyDetailsExtra.condition?.trim() ||  familyDetailsExtra.condition == "0") {
      errors.condition = t("validateCondition");
    }
    if (familyDetailsExtra.condition == "2" &&!familyDetailsExtra.bpl?.trim()) {
      errors.bpl = t("validateBPL");
    }
    if (!familyDetailsExtra.class?.trim() ||  familyDetailsExtra.class == "0") {
      errors.class = t("validateCategory");
    }
    // if (!familyDetailsExtra.subclass?.trim()) {
    //   errors.subclass = t("validateSubCategory");
    // }
    if (!familyDetailsExtra.rationCard?.trim()) {
      errors.rationCard = t("validateRationCard");
    }
    if (!familyDetailsExtra.mobile?.trim()) {
      errors.mobile = t("validateMobile");
    }
    if (familyDetailsExtra.mobile?.trim()?.length < 10) {
      errors.mobile = t("validateMobileLength");
    }
    return errors;
  };
  return (
    <>
      <AddMemberModal handleClose={handleCloseModal} open={openModal} setMemberList={setMemberList} memberList={memberList} familyDetails={familyDetails}/>
      <div className={style.heading} style={{ marginBottom: "5px" }}>Family Details</div>
      <div className={style.tablewrapper} style={{ margin: "0" }}>
        <table className={style.table}>
          <thead className={style.thead}>
            <tr className={style.tr}>
              <th className={style.th}>Municipality</th>
              <th className={style.th}>Ward</th>
              <th className={style.th}>BPL Number</th>
              <th className={style.th}>Rashan Card Number</th>
              <th className={style.th}>Mobile Number</th>
              <th className={style.th}></th>
            </tr>
          </thead>
          <tbody>
            <tr className={style.tr}>
              <td className={style.td}>{nameTitle?.municipal}</td>
              <td className={style.td}>{nameTitle?.ward}</td>
              <td className={style.td}>{familyDetails?.bpl}</td>
              <td className={style.td}>{familyDetails?.rationCard}</td>
              <td className={style.td}>{familyDetails?.mobile}</td>
              <td className={style.td}>

                <div className="action">

                  {isEditMode ? <>
                    <SaveBtn title="Save" onClick={() => { saveFamilyAfterEdit() }} />
                    <CloseBtn title="Close" onClick={() => { setFamilyError({}); setIsEditMode(false) }} /></>
                    :
                    <>{familyDetailsMore ? <CloseBtn title="Close" onClick={() => { setFamilyDetailsMore(!familyDetailsMore) }} /> :
                      <MoreBtn title="More" onClick={() => { setFamilyDetailsMore(!familyDetailsMore) }} />}

                      <EditBtn title="Edit" disabled={familyDetailsMore} onClick={() => { setFamilyDetailsExtra(familyDetails); setConfirmationData(familyDetails); setEditModalType("family"); handleOpen() }} /></>
                  }
                </div>
              </td>
            </tr>
            {familyDetailsMore ? <tr >
              <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                <Grid container spacing={5}>
                  <Grid item xs={4}>
                    <p className={style.expandMargin}><b>Municipality:</b> {nameTitle?.municipal}</p>
                    <p className={style.expandMargin}><b>Financial Condition:</b> {nameTitle?.condition}</p>
                    <p className={style.expandMargin}><b>Category:</b> {nameTitle?.class}</p>

                    {/* <p className={style.expandMargin}><b>Sub Category:</b> {familyDetails?.subclass}</p> */}
                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.expandMargin}><b>Ward:</b> {nameTitle?.ward}</p>
                    <p className={style.expandMargin}><b>BPL Number:</b> {familyDetails?.bpl}</p>
                    <p className={style.expandMargin}><b>Ration card number:</b> {familyDetails?.rationCard}</p>

                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.expandMargin}><b>House Number:</b> {familyDetails?.makan}</p>
                    <p className={style.expandMargin}><b>Mobile Number:</b> {familyDetails?.mobile}</p>

                  </Grid>
                </Grid>
              </td>
            </tr> : isEditMode ? <tr >
              <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                <Grid container spacing={3} style={{ marginBottom: "20px" }}>
                  <Grid item xs={4}>
                    <SelectDropdown
                      title={t('district')}
                      name="district"
                      options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
                      value={familyDetailsExtra?.district}
                      onChange={(e) => { handleChangeFamilyDetails(e); dispatch(getMunicipalities({ districtCode: e.target.value })) }}
                      requried
                    />
                    {familyError?.district && <p className="error">{familyError?.district}</p>}

                  </Grid>
                  <Grid item xs={4} >
                    <SelectDropdown

                      title={t('selectVillage')}
                      name="municipal"
                      options={municipalList?.map(v => ({ value: v?.id, label: v?.name }))}

                      value={familyDetailsExtra?.municipal}
                      onChange={(e) => { handleChangeFamilyDetails(e); dispatch(getWard({ municipalId: e.target.value })) }}
                      requried
                    />
                    {familyError?.municipal && <p className="error">{familyError?.municipal}</p>}
                  </Grid>
                  <Grid item xs={4}>
                    <SelectDropdown
                      title={t('selectWard')}

                      name="ward"
                      options={wardList?.map(v => ({ value: v?.id, label: v?.name }))}

                      value={familyDetailsExtra?.ward}
                      onChange={handleChangeFamilyDetails}
                      requried
                    />
                    {familyError?.ward && <p className="error">{familyError?.ward}</p>}
                  </Grid>
                  <Grid item xs={4} >
                    <InputFieldWithIcon
                      title={t('subCategory')}

                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="text"
                      name="subclass"
                      value={familyDetailsExtra?.subclass}
                      onKeyDown={(e) => {
                        if (!isAlphabateKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={handleChangeFamilyDetails}
                    />
                    {/* {familyError?.subclass && <p className="error">{familyError?.subclass}</p>} */}

                  </Grid>
                  <Grid item xs={4} >
                    <SelectDropdown
                      title={t('financialCondition')}

                      name="condition"
                      options={economicStatusList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                      value={familyDetailsExtra?.condition}
                      onChange={handleChangeFamilyDetails}
                      requried
                    />
                    {familyError?.condition && <p className="error">{familyError?.condition}</p>}
                  </Grid>

                 {familyDetailsExtra?.condition == "2" && <Grid item xs={4} >
                    <InputFieldWithIcon
                      title={t('bplCount')}

                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="number"
                      onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
                      name="bpl"
                      value={familyDetailsExtra?.bpl}
                      onChange={handleChangeFamilyDetails}
                      requried
                    />
                    {familyError?.bpl && <p className="error">{familyError?.bpl}</p>}
                  </Grid>}
                  <Grid item xs={4} >
                    <InputFieldWithIcon
                      title={t('rathinCardNumber')}

                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="text"
                      name="rationCard"
                      value={familyDetailsExtra?.rationCard}
                      onChange={handleChangeFamilyDetails}
                      requried
                      onKeyDown={(e) => {
                        if (!isAlphanumericKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      // disabled
                    />
                    {familyError?.rationCard && <p className="error">{familyError?.rationCard}</p>}

                  </Grid>
                  <Grid item xs={4}>
                    <InputFieldWithIcon
                      title={t('houseNumber')}

                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="text"
                      name="makan"
                      value={familyDetailsExtra?.makan}
                      onChange={handleChangeFamilyDetails}
                      requried
                      onKeyDown={(e) => {
                        if (!isAlphanumericKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {familyError?.makan && <p className="error">{familyError?.makan}</p>}
                  </Grid>
                  <Grid item xs={4} >
                    <SelectDropdown
                      title={t('category')}
                      // disabled
                      name="class"
                      options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
                      value={familyDetailsExtra?.class}
                      onChange={handleChangeFamilyDetails}
                      requried
                    />
                    {familyError?.class && <p className="error">{familyError?.class}</p>}
                  </Grid>
                  <Grid item xs={4} >
                    <InputFieldWithIcon

                      title={t('mobileNumber')}
                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="number"
                      onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
                      name="mobile"
                      value={familyDetailsExtra?.mobile}
                      onChange={(e) => e.target.value?.length > 10 ? null : handleChangeFamilyDetails(e)}
                      requried
                    />
                    {familyError?.mobile && <p className="error">{familyError?.mobile}</p>}

                  </Grid>
                </Grid>
              </td>
            </tr> : null}
          </tbody>
        </table>


      </div>
      {saveHof ?
        <>
          <div className={style.heading} style={{ marginBottom: "5px", marginTop: "20px" }}>Family Head Details</div>
          <div className={style.tablewrapper} style={{ margin: "0" }}>
            <table className={style.table}>
              <thead className={style.thead}>
                <tr className={style.tr}>
                  <th className={style.th}>Head of Family Name</th>
                  <th className={style.th}>Rashan Card Number</th>
                  <th className={style.th}>Religion</th>
                  <th className={style.th}>Social Category</th>
                  <th className={style.th}></th>
                </tr>
              </thead>
              <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>{formData?.EnglishName}</td>
                  <td className={style.td}>{formData?.rationCard}</td>
                  <td className={style.td}>{religionList?.find(v => v?.id == formData?.religion)?.nameE}</td>
                  <td className={style.td}>{categorylist?.find(v => v?.id == formData?.category)?.nameE}</td>
                  <td className={style.td}>

                    <div className="action">
                      {isEditModeHead ? <>
                        <SaveBtn title="Save" onClick={() => { saveHeadAfterEdit() }} />
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
                        <p className={style.expandMargin}><b>Head Of Family:</b> {formData?.EnglishName}</p>
                        <p className={style.expandMargin}><b>Date of Birth:</b> {formData?.dob}</p>
                        <p className={style.expandMargin}><b>Gender:</b> {genderlist?.find(v => v?.id == formData?.gender)?.nameE}</p>
                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Refrance Number:</b> {formData?.refrence}</p>
                        <p className={style.expandMargin}><b>Religion:</b> {religionList?.find(v => v?.id == formData?.religion)?.nameE}</p>
                        <p className={style.expandMargin}><b>Category:</b> {categorylist?.find(v => v?.id == formData?.category)?.nameE}</p>

                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Ration card number:</b> {formData?.rationCard}</p>
                        <p className={style.expandMargin}><b>Aadhar Card Number:</b> {formData?.adharCard}</p>
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
                          name="EnglishName"
                          value={headDetailsExtra?.EnglishName}
                          onChange={handleChangeHeadDetails}
                          onKeyDown={(e) => {
                            if (!isAlphabateKey(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          requried
                        />
                        {headError?.EnglishName && <p className="error">{headError?.EnglishName}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <DatePicker
                          title={t('dateOfBirth')}

                          type="date"
                          requried
                          name="dob"
                          value={headDetailsExtra?.dob}
                          onChange={handleChangeHeadDetails}
                        />
                        {headError?.dob && <p className="error">{headError?.dob}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <SelectDropdown
                          title={t('gender')}

                          name="gender"
                          options={genderlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                          value={headDetailsExtra?.gender}
                          onChange={handleChangeHeadDetails}
                          requried
                        />
                        {headError?.gender && <p className="error">{headError?.gender}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <InputFieldWithIcon

                          title={t('refrenceNumber')}
                          // icon={<IoIosDocument size={20} />}
                          placeholder=""
                          type="text"
                          name="refrence"
                          value={headDetailsExtra?.refrence}
                          onChange={handleChangeHeadDetails}
                          requried
                          onKeyDown={(e) => {
                            if (!isAlphanumericKey(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {headError?.refrence && <p className="error">{headError?.refrence}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <SelectDropdown
                          title={t('religion')}

                          name="religion"
                          options={religionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                          value={headDetailsExtra?.religion}
                          onChange={handleChangeHeadDetails}
                          requried
                        />
                        {headError?.religion && <p className="error">{headError?.religion}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <SelectDropdown

                          title={t('category')}
                          name="category"
                          options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
disabled
                          value={headDetailsExtra?.category}
                          onChange={handleChangeHeadDetails}
                          requried
                        />
                        {headError?.category && <p className="error">{headError?.category}</p>}

                      </Grid>
                      <Grid item xs={4}>
                        <InputFieldWithIcon
                          title={t('subCategory')}

                          // icon={<IoIosDocument size={20} />}
                          placeholder=""
                          type="text"
                          name="subCategory"
                          value={headDetailsExtra?.subCategory}
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
                          name="rationCard"
                          value={headDetailsExtra?.rationCard}
                          onChange={handleChangeHeadDetails}
                          onKeyDown={(e) => {
                            if (!isAlphanumericKey(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          requried
                        />
                        {headError?.rationCard && <p className="error">{headError?.rationCard}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <InputFieldWithIcon
                          title={t('aadharCardNumber')}

                          // icon={<IoIosDocument size={20} />}
                          placeholder=""
                          type="number"
                          onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
                          name="adharCard"
                          value={headDetailsExtra?.adharCard}
                          onChange={(e) => e.target.value?.length > 12 ? null : handleChangeHeadDetails(e)}
                          requried
                        />
                        {headError?.adharCard && <p className="error">{headError?.adharCard}</p>}

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
                      <td className={style.td}>{v?.EnglishName}</td>
                      <td className={style.td}>{v?.dob}</td>
                      <td className={style.td}>{v?.adharCard}</td>
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
                            <p className={style.expandMargin}><b>Member Name:</b> {v?.EnglishName}</p>
                            <p className={style.expandMargin}><b>Date of Birth:</b> {v?.dob}</p>
                            <p className={style.expandMargin}><b>Gender:</b> {genderlist?.find(k => k?.id == v?.gender)?.nameE}</p>
                            {/* <p className={style.expandMargin}><b>Is Verified:</b> Document not Attached</p> */}

                          </Grid>
                          <Grid item xs={4}>
                            <p className={style.expandMargin}><b>Refrance Number:</b> {v?.refrence}</p>
                            <p className={style.expandMargin}><b>Religion:</b> {religionList?.find(k => k?.id == v?.religion)?.nameE}</p>
                            <p className={style.expandMargin}><b>Category:</b> {categorylist?.find(k => k?.id == v?.category)?.nameE}</p>

                          </Grid>
                          <Grid item xs={4}>
                            {/* <p className={style.expandMargin}><b>Sub Category:</b> {v?.subCategory}</p> */}
                            <p className={style.expandMargin}><b>Ration card number:</b> {v?.rationCard}</p>
                            <p className={style.expandMargin}><b>Aadhar Card Number:</b> {v?.adharCard}</p>

                          </Grid>
                        </Grid>
                      </td>
                    </tr> : v?.isEditModeMember ? <tr  >
                      <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                        <Grid container spacing={3} style={{ marginBottom: "20px" }}>
                          <Grid item xs={4}>
                            <InputFieldWithIcon


                              title={t('headOfFamilyName')}
                              subTitle="(in English)"
                              // icon={<IoIosDocument size={20} />}
                              placeholder=""
                              type="text"
                              name="EnglishName"
                              value={memberDetailsExtra?.EnglishName}
                              onChange={handleChangeMemberDetails}
                              onKeyDown={(e) => {
                                if (!isAlphabateKey(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              requried
                            />
                            {memberError?.EnglishName && <p className="error">{memberError?.EnglishName}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <DatePicker
                              title={t('dateOfBirth')}

                              type="date"
                              requried
                              name="dob"
                              value={memberDetailsExtra?.dob}
                              onChange={handleChangeMemberDetails}
                            />
                            {memberError?.dob && <p className="error">{memberError?.dob}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <SelectDropdown
                              title={t('gender')}

                              name="gender"
                              options={genderlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                              value={memberDetailsExtra?.gender}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.gender && <p className="error">{memberError?.gender}</p>}
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
                              name="refrence"
                              value={memberDetailsExtra?.refrence}
                              onChange={handleChangeMemberDetails}
                              requried
                              onKeyDown={(e) => {
                                if (!isAlphanumericKey(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {memberError?.refrence && <p className="error">{memberError?.refrence}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <SelectDropdown
                              title={t('religion')}

                              name="religion"
                              options={religionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                              value={memberDetailsExtra?.religion}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.religion && <p className="error">{memberError?.religion}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <SelectDropdown

                              title={t('category')}
                              name="category"
                              options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
disabled
                              value={memberDetailsExtra?.category}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.category && <p className="error">{memberError?.category}</p>}

                          </Grid>
                          <Grid item xs={4}>
                            <InputFieldWithIcon

                              title={t('subCategory')}
                              placeholder=""
                              type="text"
                              name="subCategory"
                              value={memberDetailsExtra?.subCategory}
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
                              name="rationCard"
                              value={memberDetailsExtra?.rationCard}
                              onChange={handleChangeMemberDetails}
                              requried
                              onKeyDown={(e) => {
                                if (!isAlphanumericKey(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {memberError?.rationCard && <p className="error">{memberError?.rationCard}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <InputFieldWithIcon

                              title={t('aadharCardNumber')}
                              placeholder=""
                              type="number"
                              onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
                              name="adharCard"
                              value={memberDetailsExtra?.adharCard}
                              onChange={(e) => e.target.value?.length > 12 ? null : handleChangeMemberDetails(e)}
                              requried
                            />
                            {memberError?.adharCard && <p className="error">{memberError?.adharCard}</p>}

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
            <SubmitButton label="Save Family" onClick={() => router.push("/familyList")} style={{ marginLeft: "20px" }} />
          </div>
        </>

        : <>    <div className={style.heading} style={{ marginTop: "20px" }}>Add HOF/member</div>
          <Grid container spacing={3} >

            <Grid item xs={12} sm={4} md={3}>
              <InputFieldWithIcon
                title={t('headOfFamilyName')}
                subTitle="(in English)"
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
                name="EnglishName"
                value={formData?.EnglishName}
                onChange={(e) => {handleChange(e)}}
                onBlur={(e) => changeLang(e.target.value)}
                onKeyDown={(e) => {
                  if (!isAlphabateKey(e.key)) {
                    e.preventDefault();
                  }
                }}
                requried
              />
              {errors?.EnglishName && <p className="error">{errors?.EnglishName}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <InputFieldWithIcon
                title={t('headOfFamilyName')}
                disabled
                subTitle="(in Hindi)"
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
                name="hindiName"
                value={formData?.hindiName}
                onChange={handleChange}
                requried
              />
              {errors?.hindiName && <p className="error">{errors?.hindiName}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3} >
            <p className={style.title}>{t('nameOfRelative')}<span className="requried"> *</span></p>
           <div style={{display : "flex"}}>
           <SelectDropdown
                style={{paddingTop : 0, paddingBottom : 0}}
                name="relation"
                options={relationlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                value={formData?.relation}
                onChange={handleChange}
                // requried
              />
              <InputFieldWithIcon
                // title={t('nameOfRelative')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
                name="relative"
                value={formData?.relative}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (!isAlphabateKey(e.key)) {
                    e.preventDefault();
                  }
                }}
                // requried
              />
           </div>
              {errors?.relative && <p className="error">{errors?.relative}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                title={t('dateOfBirth')}
                type="date"
                requried
                name="dob"
                value={formData?.dob}
                onChange={handleChange}
              />
              {errors?.dob && <p className="error">{errors?.dob}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <SelectDropdown
                title={t('gender')}
                name="gender"
                options={genderlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                value={formData?.gender}
                onChange={handleChange}
                requried
              />
              {errors?.gender && <p className="error">{errors?.gender}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <SelectDropdown
                title={t('baseOfRegistration')}
                name="registrationBase"
                options={memberStatusList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                value={formData?.registrationBase}
                onChange={handleChange}
                requried
              />
              {errors?.registrationBase && <p className="error">{errors?.registrationBase}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <InputFieldWithIcon
                title={t('refrenceNumber')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
                name="refrence"
                value={formData?.refrence}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (!isAlphanumericKey(e.key)) {
                    e.preventDefault();
                  }
                }}
                requried
              />
              {errors?.refrence && <p className="error">{errors?.refrence}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <SelectDropdown
                title={t('education')}
                name="education"
                options={qualificationList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                value={formData?.education}
                onChange={handleChange}
                requried
              />
              {errors?.education && <p className="error">{errors?.education}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <SelectDropdown
                title={t('livelihoodResource')}
                name="work"
                options={profesionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                value={formData?.work}
                onChange={handleChange}
                requried
              />
              {errors?.work && <p className="error">{errors?.work}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <SelectDropdown
                title={t('category')}
                name="category"
                options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
disabled
                value={formData?.category}
                onChange={handleChange}
                requried
              />
              {errors?.category && <p className="error">{errors?.category}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <InputFieldWithIcon
                title={t('subCategory')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
                name="subCategory"
                value={formData?.subCategory}
                onChange={(e) => (/^[a-zA-Z]+$/.test(e.target.value) || e.target.value == "") ? handleChange(e) : null}
                onKeyDown={(e) => {
                  if (!isAlphabateKey(e.key)) {
                    e.preventDefault();
                  }
                }}              />
              {/* {errors?.subCategory && <p className="error">{errors?.subCategory}</p>} */}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <InputFieldWithIcon
                title={t('rathinCardNumber')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
                name="rationCard"
                value={formData?.rationCard}
                onChange={handleChange}
                requried
                disabled
              />
              {errors?.rationCard && <p className="error">{errors?.rationCard}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <SelectDropdown
                title={t('religion')}
                name="religion"
                options={religionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                value={formData?.religion}
                onChange={handleChange}
                requried
              />
              {errors?.religion && <p className="error">{errors?.religion}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <InputFieldWithIcon
                title={t('aadharCardNumber')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="number"
                onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
                name="adharCard"
                value={formData?.adharCard}
                onChange={(e) => e.target.value?.length > 12 ? null : handleChange(e)}
                requried
              />
              {errors?.adharCard && <p className="error">{errors?.adharCard}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <FileUpload
                title={t('document')}
                subTitle="(Bonafide Himachal)"
                requried
                name="dastavage"
                // value={formData?.rationCard}
                onChange={handleChange}
                accept="image/*,.pdf"

              />
              {errors?.dastavage && <p className="error">{errors?.dastavage}</p>}

            </Grid>
            <Grid item xs={24} sm={8} md={6}>
              <TextArea
                title={t('comment')}
                placeholder="Text area"
                requried
                name="description"
                value={formData?.description}
                onChange={handleChange}

              />
              {errors?.description && <p className="error">{errors?.description}</p>}

            </Grid>


          </Grid>
          <div className={style.save}>
            <SubmitButton label="Save" onClick={() => handleSaveHOF()} />
            {/* <SubmitButton label="Back" onClick={() => setState("1")} />
        <SubmitButton label="Add member" onClick={addMember} style={{ marginLeft: "20px" }}/>
        <SubmitButton label="Proceed" onClick={onSave} style={{ marginLeft: "20px" }} /> */}
          </div></>}
      <EditFamilyConfirmation nameTitle={nameTitle} memberList={memberList} setMemberList={setMemberList} handleClose={handleClose} open={open} data={confirmationData} EditModalType={EditModalType} setIsEditMode={setIsEditMode} setisEditModeHead={setisEditModeHead} />
    </>
  )
}

export default AddHOF
