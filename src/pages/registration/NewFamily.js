import React, { useState } from 'react'
import style from "./registration.module.css"
import { Grid } from '@mui/material'
import SelectDropdown from '@/components/SelectDropdown'
import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import SubmitButton from '@/components/SubmitBtn'
import FileUpload from '@/components/FileUpload'
import DatePicker from '@/components/DatePicker'
import TextArea from '@/components/TextArea'
import { useTranslation } from 'next-i18next'

const NewFamily = ({setState}) => {
  const { t } = useTranslation("translation");

    const [formData, setFormData] = useState({
        village: "",
        makan: "",
        condition: "",
        bpl: "",
        class: "",
        subclass: "",
        rationCard: "",
        mobile: "",
        dastavage:""
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

    const onSave = () => {
        const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setState("2")
      console.log("Form submitted successfully:", formData);
    } else {
      setErrors(validationErrors);
    }
    }

    const validateForm = (formData) => {
        const errors = {};
        if (!formData.village?.trim()) {
          errors.village = "Village is required";
        }
        if (!formData.makan?.trim()) {
          errors.makan = "House number is required";
        }
        if (!formData.condition?.trim()) {
          errors.condition = "Family condition is required";
        }
        if (!formData.bpl?.trim()) {
          errors.bpl = "BPL count is required";
        }
        if (!formData.class?.trim()) {
          errors.class = "Category is required";
        }
        if (!formData.subclass?.trim()) {
          errors.subclass = "Sub category is required";
        }
        if (!formData.rationCard?.trim()) {
          errors.rationCard = "Ration card number is required";
        }
        if (!formData.mobile?.trim()) {
          errors.mobile = "Mobile number is required";
        }
        if (!formData.dastavage) {
          errors.dastavage = "Document is required";
        }
       
        return errors;
      };
  return (
    <div style={{ marginTop: "20px" }}>
    {/* <div className={style.heading}>{t('newFamily')}</div> */}
    <div className={style.heading}>New Family</div>
    <Grid container spacing={3} >
        <Grid item xs={12} sm={4} md={3}>
            <SelectDropdown
                title={t('selectVillage')}
                name="village"
                options={[
                    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
                    { value: "Shimla", label: "Shimla" },
                ]}
                value={formData?.village}
                onChange={handleChange}
                requried
            />
   {errors?.village && <p className="error">{errors?.village}</p>}

        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={12} sm={4} md={3}>
            <InputFieldWithIcon
                title={t('houseNumber')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="number"
                name="makan"
                value={formData?.makan}
                onChange={handleChange}
                requried
            />
               {errors?.makan && <p className="error">{errors?.makan}</p>}

        </Grid>
        <Grid item xs={12} sm={4} md={3}>
            <SelectDropdown
                title={t('financialCondition')}
                name="condition"
                options={[
                    { value: "poor", label: "Poor" },
                    { value: "rich", label: "Rich" },
                ]}
                value={formData?.condition}
                onChange={handleChange}
                requried
            />
               {errors?.condition && <p className="error">{errors?.condition}</p>}

        </Grid>
        <Grid item xs={12} sm={4} md={3}>
            <InputFieldWithIcon
                title={t('bplCount')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="number"
                name="bpl"
                value={formData?.bpl}
                onChange={handleChange}
                requried
            />
               {errors?.bpl && <p className="error">{errors?.bpl}</p>}

        </Grid>
        <Grid item xs={12} sm={4} md={3}>
            <SelectDropdown
                title={t('category')}
                name="class"
                options={[
                    { value: "poor", label: "Poor" },
                    { value: "rich", label: "Rich" },
                ]}
                value={formData?.class}
                onChange={handleChange}
                requried
            />
               {errors?.class && <p className="error">{errors?.class}</p>}

        </Grid>
        <Grid item xs={12} sm={4} md={3}>
            <InputFieldWithIcon
                title={t('subCategory')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
                name="subclass"
                value={formData?.subclass}
                onChange={handleChange}
                requried
            />
               {errors?.subclass && <p className="error">{errors?.subclass}</p>}

        </Grid>
        <Grid item xs={12} sm={4} md={3}>
            <InputFieldWithIcon
                title={t('rathinCardNumber')}
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
            <InputFieldWithIcon
                title={t('mobileNumber')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="number"
                name="mobile"
                value={formData?.mobile}
                onChange={handleChange}
                requried
            />
                           {errors?.mobile && <p className="error">{errors?.mobile}</p>}

            
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
            <FileUpload
                title={t('document')}
                subTitle="(Declaration & Report)"
                requried
                name="dastavage"
                onChange={handleChange}
            />
                           {errors?.dastavage && <p className="error">{errors?.dastavage}</p>}

        </Grid>
    </Grid>
    <div className={style.save}>
        <SubmitButton label={t('saveAndAddHof')} onClick={onSave} />
    </div>
</div>
  )
}

export default NewFamily
