import React, { useState } from 'react'
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AddMemberModal = ({ handleClose, open }) => {
  const { t } = useTranslation("translation");

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
    category: "",
    subCategory: "",
    rationCard: "",
    religion: "",
    adharCard: "",
    dastavage: "",
    description: ""
  })
  const [errors, setErrors] = useState({});
  console.log('errors', errors)

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
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setErrors({})
      handleClose()
      console.log("Form submitted successfully:", formData);
    } else {
      setErrors(validationErrors);
    }
  }

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.EnglishName?.trim()) {
      errors.EnglishName = "Name is required";
    }
    if (!formData.hindiName?.trim()) {
      errors.hindiName = "Name is required";
    }
    if (!formData.relative?.trim()) {
      errors.relative = "Relative is required";
    }
    if (!formData.dob?.trim()) {
      errors.dob = "Date of birth is required";
    }
    if (!formData.gender?.trim()) {
      errors.gender = "Gender is required";
    }
    if (!formData.registrationBase?.trim()) {
      errors.registrationBase = "Base of registraation is required";
    }
    if (!formData.refrence?.trim()) {
      errors.refrence = "Refrance is required";
    }
    if (!formData.education?.trim()) {
      errors.education = "Education is required";
    }
    if (!formData.work) {
      errors.work = "Work is required";
    }
    if (!formData.category) {
      errors.category = "Category is required";
    }
    if (!formData.subCategory) {
      errors.subCategory = "Sub category is required";
    }
    if (!formData.rationCard) {
      errors.rationCard = "Ration Card is required";
    }
    if (!formData.religion) {
      errors.religion = "Religion is required";
    }
    if (!formData.adharCard) {
      errors.adharCard = "Aadhar card is required";
    }else if (!formData.adharCard?.trim()?.length < 12) {
      errors.adharCard = "Please enter 12 digit aadhar card number";
    }
    
    if (!formData.dastavage) {
      errors.dastavage = "Document is required";
    }
    if (!formData.description) {
      errors.description = "Description is required";
    }

    return errors;
  };
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
              requried
            />
            {errors?.EnglishName && <p className="error">{errors?.EnglishName}</p>}

          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <InputFieldWithIcon
                title={t('headOfFamilyName')}
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
              options={[
                { value: "poor", label: "Male" },
                { value: "rich", label: "Female" },
              ]}
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
              options={[
                { value: "poor", label: "Poor" },
                { value: "rich", label: "Rich" },
              ]}
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
              options={[
                { value: "poor", label: "10th" },
                { value: "rich", label: "12th" },
              ]}
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
              options={[
                { value: "poor", label: "Poor" },
                { value: "rich", label: "Rich" },
              ]}
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
              options={[
                { value: "poor", label: "Poor" },
                { value: "rich", label: "Rich" },
              ]}
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
            />
            {errors?.rationCard && <p className="error">{errors?.rationCard}</p>}

          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <SelectDropdown
                title={t('religion')}
                name="religion"
              options={[
                { value: "poor", label: "Poor" },
                { value: "rich", label: "Rich" },
              ]}
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
