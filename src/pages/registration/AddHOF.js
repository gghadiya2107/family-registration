import React, { useState } from 'react'
import style from "./registration.module.css"
import { Grid } from '@mui/material'
import SelectDropdown from '@/components/SelectDropdown'
import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import useTranslation from 'next-translate/useTranslation';
import SubmitButton from '@/components/SubmitBtn'
import FileUpload from '@/components/FileUpload'
import DatePicker from '@/components/DatePicker'
import TextArea from '@/components/TextArea'


const AddHOF = ({setState,handleClickOpen}) => {
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
        rationCard : "",
        religion: "",
        adharCard: "",
        dastavage: "",
        description: ""
    })
    const [errors, setErrors] = useState({});
    console.log('errors', errors)

    const handleChange = (e) => {
        const { value, name } = e.target
        if(name == "dastavage"){

            setFormData({ ...formData, [name]: e.target.files[0] })
        }else{

            setFormData({ ...formData, [name]: value })
        }
    }

    const addMember = () => {
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            setErrors({})
            handleClickOpen()
            console.log("Form submitted successfully:", formData);
        } else {
          setErrors(validationErrors);
        }
    }

    const onSave = () => {
        const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setState("3")
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
    <div style={{ marginTop: "20px" }}>

    <div className={style.heading}>Add HOF/member</div>
    <Grid container spacing={3} >

        <Grid item xs={12} sm={4} md={3}>
            <InputFieldWithIcon
                title="मुखिया का नाम"
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
                title="मुखिया का नाम"
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
                title="संबंधी का नाम एवं संबंध"
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
                title="जन्म तिथि"
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
                title="लिंग"
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
                title="दर्ज करने का आधार"
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
                title="रेफ़्रेन्स नंबर"
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="number"
                name="refrence"
                value={formData?.refrence}
                onChange={handleChange}
                requried
            />
               {errors?.refrence && <p className="error">{errors?.refrence}</p>}

        </Grid>
        <Grid item xs={12} sm={4} md={3}>
            <SelectDropdown
                title="शैक्षिक योग्यता"
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
                title="आजीविका का साधन"
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
                title="वर्ग"
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
                title="उप-वर्ग"
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
                name="subCategory"
                value={formData?.subCategory}
                onChange={handleChange}
                requried
            />
               {errors?.subCategory && <p className="error">{errors?.subCategory}</p>}

        </Grid>
        <Grid item xs={12} sm={4} md={3}>
            <InputFieldWithIcon
                title="राशन कार्ड नंबर"
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="number"
                name="rationCard"
                value={formData?.rationCard}
                onChange={handleChange}
                requried
            />
               {errors?.rationCard && <p className="error">{errors?.rationCard}</p>}

        </Grid>
        <Grid item xs={12} sm={4} md={3}>
            <SelectDropdown
                title="धर्म"
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
                title="आधार कार्ड नंबर"
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="number"
                name="adharCard"
                value={formData?.adharCard}
                onChange={handleChange}
                requried
            />
               {errors?.adharCard && <p className="error">{errors?.adharCard}</p>}

        </Grid>
        <Grid item xs={12} sm={4} md={3}>
            <FileUpload
                title="दस्तावेज़"
                subTitle="(Bonafide Himachal)"
                requried
                name="dastavage"
                // value={formData?.rationCard}
                onChange={handleChange}
            />
               {errors?.dastavage && <p className="error">{errors?.dastavage}</p>}

        </Grid>
        <Grid item xs={24} sm={8} md={6}>
            <TextArea
                title="टिपण्णी"
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
        <SubmitButton label="Add member" onClick={addMember} />
        <SubmitButton label="Proceed" onClick={onSave} style={{ marginLeft: "20px" }} />
    </div>
</div>
  )
}

export default AddHOF
