import React, { useEffect, useState } from 'react'
import SelectDropdown from '@/components/SelectDropdown'
import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import SubmitButton from '@/components/SubmitBtn'
import FileUpload from '@/components/FileUpload'
import DatePicker from '@/components/DatePicker'
import TextArea from '@/components/TextArea'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '@/network/actions/getCategory'
import { getGender } from '@/network/actions/getGender'
import { getMemberStatus } from '@/network/actions/getMemberStatus'
import { getQualification } from '@/network/actions/getQualification'
import { getProfession } from '@/network/actions/getProfession'
import { getReligion } from '@/network/actions/getReligion'
import translateToHindi from '@/utils/translate'

function generateUserId() {
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomNum = Math.floor(Math.random() * 9000) + 1000; // Random 4-digit number
  const userId = timestamp.toString() + randomNum.toString();
  return userId;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AddMemberModal = ({ handleClose, open,setMemberList ,memberList, familyDetails}) => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch()
  const categorylist = useSelector((state) => state.getCategory?.data)
  const genderlist = useSelector((state) => state.getGender?.data)
  const memberStatusList = useSelector((state) => state.getMemberStatus?.data)
  const qualificationList = useSelector((state) => state.getQualification?.data)
  const profesionList = useSelector((state) => state.getProfession?.data)
  const religionList = useSelector((state) => state.getReligion?.data)
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
    rationCard: familyDetails?.rationCard || "",
    religion: "",
    adharCard: "",
    dastavage: "",
    description: "",
    isEditModeMember : false,
  })
  const [errors, setErrors] = useState({});


  useEffect(() => {
    dispatch(getCategory())
    dispatch(getGender())
    dispatch(getMemberStatus())
    dispatch(getQualification())
    dispatch(getProfession())
    dispatch(getReligion())

  }, [])

  const handleChange = (e) => {
    const { value, name } = e.target
    if (name == "dastavage") {

      const selectedFile = e.target.files[0];

          if (selectedFile && selectedFile.size <= 1024 * 1024) {
            setFormData({ ...formData, [name]: e.target.files[0] })
            setErrors({...errors,dastavage :"" })
          } else {
            setFormData({ ...formData, [name]: null })

            setErrors({...errors,dastavage :"File size must be less than 1MB" })
            // setError('File size must be less than 1MB');
          }
    } else {

      setFormData({ ...formData, [name]: value })
    }
  }

  const onSave = () => {
    const validationErrors = {};
    // const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setErrors({})
      setFormData({  EnglishName: "", memberDetailsMore : false, isEditModeMember : false,
      hindiName: "",
      relative: "",
      dob: "",
      gender: "",
      registrationBase: "",
      refrence: "",
      education: "",
      work: "",
      category: "",
      subCategory: "",
      rationCard: "",
      religion: "",
      adharCard: "",
      dastavage: "",
      description: ""})
      setMemberList([...memberList,{...formData, id : generateUserId()}])
      handleClose()
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
    if (!formData.gender?.trim()) {
      errors.gender = t("validateGender")
    }
    if (!formData.registrationBase?.trim()) {
      errors.registrationBase = t("validateBaseOfRegistration");
    }
    if (!formData.refrence?.trim()) {
      errors.refrence = t("validateRefrenceNumber");
    }
    if (!formData.education?.trim()) {
      errors.education = t("validateEducation");
    }
    if (!formData.work) {
      errors.work = t("validateWork");
    }
    if (!formData.category) {
      errors.category = t("validateCategory");
    }
    if (!formData.subCategory) {
      errors.subCategory = t("validateSubCategory");
    }
    if (!formData.rationCard) {
      errors.rationCard = t("validateRationCard");
    }
    if (!formData.religion) {
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

  const changeLang = async(name) => {
    if(name){

      const text  = await translateToHindi(name);
      if(text){
        
        setFormData({ ...formData, hindiName: text })
        // return text
      }
    }
  }
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"lg"}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add Member
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        {/* <CloseIcon /> */}
      </IconButton>
      <DialogContent dividers>
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
              onChange={handleChange}
              onBlur={(e) => changeLang(e.target.value)}
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
          <Grid item xs={12} sm={4} md={3}>
            <InputFieldWithIcon
                title={t('nameOfRelative')}
                // icon={<IoIosDocument size={20} />}
              placeholder=""
              type="text"
              name="relative"
              value={formData?.relative}
              onChange={handleChange}
              requried
            />
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
                options={genderlist?.map(v => ({value : v?.id, label : v?.nameE}))}

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
                options={memberStatusList?.map(v => ({value : v?.id, label : v?.nameE}))}

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
              requried
            />
            {errors?.refrence && <p className="error">{errors?.refrence}</p>}

          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <SelectDropdown
                title={t('education')}
                name="education"
                options={qualificationList?.map(v => ({value : v?.id, label : v?.nameE}))}

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
                options={profesionList?.map(v => ({value : v?.id, label : v?.nameE}))}

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
                options={categorylist?.map(v => ({value : v?.id, label : v?.nameE}))}
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
              requried
            />
            {errors?.subCategory && <p className="error">{errors?.subCategory}</p>}

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
                options={religionList?.map(v => ({value : v?.id, label : v?.nameE}))}
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
              onKeyDown={(e) =>  e.key == "e" ? e.preventDefault() : null}
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
      </DialogContent>
      <DialogActions>
        <SubmitButton onClick={onSave} label="Save" />

      </DialogActions>
    </BootstrapDialog>
  )
}

export default AddMemberModal
