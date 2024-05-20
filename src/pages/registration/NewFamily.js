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

const NewFamily = ({setState, formData, setFormData}) => {
  const { t } = useTranslation("translation");

    
    const [errors, setErrors] = useState({});
    console.log('errors', errors)

    const handleChange = (e) => {
        const { value, name } = e.target
        if(name == "dastavage"){
          const selectedFile = e.target.files[0];

          if (selectedFile && selectedFile.size <= 1024 * 1024) {
            setFormData({ ...formData, [name]: e.target.files[0] })
            setErrors({...errors,dastavage :"" })
          } else {
            setFormData({ ...formData, [name]: null })

            setErrors({...errors,dastavage : t('validateFileSize') })
            // setError('File size must be less than 1MB');
          }
           
        }else{

            setFormData({ ...formData, [name]: value })
        }
    }

    const onSave = () => {
      console.log('errors', errors, formData.mobile?.trim()?.length)
        const validationErrors = {};
        // const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setState("2")
      console.log("Form submitted successfully:", formData);
    } else {
      setErrors(validationErrors);
    }
    }

    const validateForm = (formData) => {
        const errors = {};
        if (!formData.municipal?.trim()) {
          errors.municipal = t('validateMunucipal');
        }
        if (!formData.ward?.trim()) {
          errors.ward = t("validateward");
        }
        if (!formData.makan?.trim()) {
          errors.makan = t("ValidateHouseNumber");
        }
        if (!formData.condition?.trim()) {
          errors.condition = t("validateCondition");
        }
        if (!formData.bpl?.trim()) {
          errors.bpl = t("validateBPL");
        }
        if (!formData.class?.trim()) {
          errors.class = t("validateCategory");
        }
        if (!formData.subclass?.trim()) {
          errors.subclass = t("validateSubCategory");
        }
        if (!formData.rationCard?.trim()) {
          errors.rationCard = t("validateRationCard");
        }
        if (!formData.mobile?.trim()) {
          errors.mobile = t("validateMobile");
        }
         if (formData.mobile?.trim()?.length < 10) {
          errors.mobile = t("validateMobileLength");
        }
        
        if (!formData.dastavage) {
          errors.dastavage = t("validateDocument");
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
                name="municipal"
                options={[
                    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
                    { value: "Shimla", label: "Shimla" },
                ]}
                value={formData?.municipal}
                onChange={handleChange}
                requried
            />
   {errors?.municipal && <p className="error">{errors?.municipal}</p>}

        </Grid>
        <Grid item xs={3}>
        <SelectDropdown
                title={t('selectWard')}
                name="ward"
                options={[
                    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
                    { value: "Shimla", label: "Shimla" },
                ]}
                value={formData?.ward}
                onChange={handleChange}
                requried
            />
   {errors?.ward && <p className="error">{errors?.ward}</p>}
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={12} sm={4} md={3}>
            <InputFieldWithIcon
                title={t('houseNumber')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
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
                onChange={(e) => (/^[a-zA-Z]+$/.test(e.target.value) || e.target.value == "") ? handleChange(e) : null}
                requried
            />
               {errors?.subclass && <p className="error">{errors?.subclass}</p>}

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
            <InputFieldWithIcon
                title={t('mobileNumber')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="number"
                name="mobile"
                value={formData?.mobile}
                onChange={(e) => e.target.value?.length > 10 ? null : handleChange(e)}
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
                accept="image/*,.pdf"
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
