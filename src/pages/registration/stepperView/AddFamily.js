import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import SelectDropdown from '@/components/SelectDropdown';
import { addFamily } from '@/network/actions/addFamily';
import { getEconomicStatus } from '@/network/actions/economicStatus';
import { getCategory } from '@/network/actions/getCategory';
import { getDistrict } from '@/network/actions/getDistrict';
import { getRationDetails } from '@/network/actions/getRationDetails';
import { isAlphabateKey, isAlphanumericKey } from '@/utils/regex';
import { Divider, Grid } from '@mui/material';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import style from "../registration.module.css"
import FileUpload from '@/components/FileUpload';
import SubmitButton from '@/components/SubmitBtn';
import { getMunicipalities } from '@/network/actions/getMunicipalities';
import { getWard } from '@/network/actions/getWard';
import Image from 'next/image';
import { isValidMobileNumber } from '@/utils/formatAadharNumber';

const AddFamily = ({setActiveStepper,selectedFamilyMember}) => {
    console.log('selectedFamilyMember', selectedFamilyMember)
    const { t } = useTranslation("translation");
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({});
    const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const economicStatusList = useSelector((state) => state.getEconomicStatus?.data)
  const categorylist = useSelector((state) => state.getCategory?.data)
console.log('districtList', districtList)
  useEffect(() => {
    dispatch(getDistrict())
    dispatch(getEconomicStatus())
    dispatch(getCategory())
  }, [])

  useEffect(() => {
    setFormData({
        rationCard: selectedFamilyMember?.[0]?.rationCardNumber || "",
        // district: selectedFamilyMember?.[0]?.districtId || "",
        district:  "",
        municipal: "",
        ward: "",
        makan: selectedFamilyMember?.[0]?.address || "",
        condition: "",
        class : "",
        subclass: "",
        mobile : selectedFamilyMember?.[0]?.mobileNumber?.replace(/^(\d{5})(\d{1,5})/, '$1-$2')|| "",
        dastavage: ""
    })

    // dispatch(getMunicipalities({districtCode: selectedFamilyMember?.[0]?.districtId }))
  }, [selectedFamilyMember])

  console.log('formData', formData)
  

  const handleChange = (e) => {
    const { value, name } = e.target
    if (name == "dastavage" || name == "dastavage2") {
      const selectedFile = e.target.files[0];

      if (selectedFile && selectedFile.size <= 1024 * 1024) {
        setFormData({ ...formData, [name]: e.target.files[0] })
        // console.log('URL.createObjectURL(e.target.files[0])', URL.createObjectURL(e.target.files[0]))
        setErrors({ ...errors, [name]: "" })
      } else {
        setFormData({ ...formData, [name]: null })

        setErrors({ ...errors, [name]: t('validateFileSize') })
      }

    } else {
      setFormData({ ...formData, [name]: value })
      
    }
  }

  const onSave = () => {
    // const validationErrors = {};

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      let body = {
        houseAddress:formData?.makan || "",
        rationCardNo:formData?.rationCard || "",
        socialSubCategory: formData?.subclass || "",
        wardId: formData?.ward || 0,
        districtCode: formData?.district || 0,
        socialCategoryId: formData?.class || 0,
        municipalityId: formData?.municipal || 0,
        mobileNumber: formData?.mobile?.replace("-", "") || "",
        bplNumber: formData?.bpl || "",
        active:true,
        economicId : formData?.condition || 0
    }
    console.log('body', body)
    const extra = () => {
        setActiveStepper(1)
    }
      
      dispatch(addFamily(body,extra))

     
    } else {
      console.log('validationErrors', validationErrors)
      setErrors(validationErrors);
    }
  }

  console.log('formData', formData)
  const validateForm = (formData) => {
    const errors = {};
    if (!formData.municipal?.trim() || formData?.municipal == "0") {
      errors.municipal = t('validateMunucipal');
    }
    if (!formData.district?.trim() || formData?.district == "0") {
      errors.district = t('validateDistrict');
    }
    if (!formData.ward?.trim() || formData?.ward == "0") {
      errors.ward = t("validateward");
    }
    if (!formData.makan?.trim()) {
      errors.makan = t("ValidateHouseNumber");
    }
    if (!formData.condition?.trim() || formData?.condition == "0") {
      errors.condition = t("validateCondition");
    }
    if (formData?.condition == "2" && !formData.bpl?.trim()) {
      errors.bpl = t("validateBPL");
    }
    if (!formData.class?.trim() || formData?.class == "0") {
      errors.class = t("validateCategory");
    }
    // if (!formData.subclass?.trim()) {
    //   errors.subclass = t("validateSubCategory");
    // }
    if (!formData.rationCard?.trim()) {
      errors.rationCard = t("validateRationCard");
    }
    if (!formData.mobile?.trim()) {
      errors.mobile = t("validateMobile");
    }
   else if (formData.mobile?.length < 11) {
      errors.mobile = t("validateMobileLength");
    }
    else if (!isValidMobileNumber(formData.mobile?.replace("-", "")?.trim())) {
      errors.mobile = t("validateMobileStart");
    }    
    if (!formData.dastavage) {
      errors.dastavage = t("validateDocument");
    }
    if (formData?.subclass && !formData.dastavage2) {
      errors.dastavage2 = t("validateDocument");
    }

    return errors;
  };

  return (
    <div >
<Divider style={{marginTop : 20}}/>
    {/* <div className={style.heading}>{t('newFamily')}</div> */}
    {/* <div className={style.heading}>New Family</div> */}
    <Grid container spacing={3} mt={0}>
      <Grid item xs={12} sm={4} md={3}>
        <SelectDropdown
          title={t('district')}
          name="district"
          options={districtList?.map(v => ({value : v?.lgdCode, label : v?.nameE})) || []}
          value={formData?.district ?? null}
          onChange={(e) => {handleChange(e); dispatch(getMunicipalities({districtCode: e.target.value}))}}
          requried
        />
        {errors?.district && <p className="error">{errors?.district}</p>}

      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SelectDropdown
          title={t('selectVillage')}
          name="municipal"
          options={municipalList?.map(v => ({value : v?.id, label : v?.name}))}
          disabled={formData?.district != "" ?false : true}
          value={formData?.municipal}
          onChange={(e) => {handleChange(e); dispatch(getWard({municipalId: e.target.value}))}}
          requried
        />
        {errors?.municipal && <p className="error">{errors?.municipal}</p>}

      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SelectDropdown
          title={t('selectWard')}
          name="ward"
          disabled={formData?.district != "" && formData?.municipal != "" ? false : true}

          options={wardList?.map(v => ({value : v?.id, label : v?.name}))}

          value={formData?.ward}
          onChange={handleChange}
          requried
        />
        {errors?.ward && <p className="error">{errors?.ward}</p>}
      </Grid>
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
          onKeyDown={(e) => {
            if (!isAlphanumericKey(e.key)) {
              e.preventDefault();
            }
          }}
          requried
        />
        {errors?.makan && <p className="error">{errors?.makan}</p>}

      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SelectDropdown
          title={t('financialCondition')}
          name="condition"
          options={economicStatusList?.map(v => ({value : v?.id, label : v?.nameE}))}
          value={formData?.condition}
          onChange={handleChange}
          requried
        />
        {errors?.condition && <p className="error">{errors?.condition}</p>}

      </Grid>
    {formData?.condition == "2" &&  <Grid item xs={12} sm={4} md={3}>
        <InputFieldWithIcon
          title={t('bplCount')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="number"
          onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
          name="bpl"
          value={formData?.bpl}
          onChange={handleChange}
          requried
        />
        {errors?.bpl && <p className="error">{errors?.bpl}</p>}

      </Grid>}
      <Grid item xs={12} sm={4} md={3}>
        <SelectDropdown
          title={t('category')}
          name="class"
          options={categorylist?.map(v => ({value : v?.id, label : v?.nameE}))}
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
          onKeyDown={(e) => {
            if (!isAlphabateKey(e.key)) {
              e.preventDefault();
            }
          }}
        />
        {/* {errors?.subclass && <p className="error">{errors?.subclass}</p>} */}

      </Grid>
     {!selectedFamilyMember &&  <Grid item xs={12} sm={4} md={3}>
        <InputFieldWithIcon
          title={t('rathinCardNumber')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="text"
          name="rationCard"
          value={formData?.rationCard}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (!isAlphanumericKey(e.key)) {
              e.preventDefault();
            }
          }}
          requried
        />
        {errors?.rationCard && <p className="error">{errors?.rationCard}</p>}

      </Grid> }
      <Grid item xs={12} sm={4} md={3}>
        <InputFieldWithIcon
          title={t('mobileNumber')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="text"
          name="mobile"
          value={formData?.mobile?.replace(/^(\d{5})(\d{1,5})/, '$1-$2')}
          onChange={(e) => e.target.value?.length > 11 ? null : handleChange(e)}
          onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
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
       {/* {formData?.dastavage && ( formData.dastavage.type.startsWith('image/') ?   <Image src={URL.createObjectURL(formData?.dastavage)} alt="Uploaded file"  width={250} height={150}
        style={{marginTop: "10px", width : "100%", height : "auto"}}/> :          
           <a href={URL.createObjectURL(formData.dastavage)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View File</a>)
} */}

        {errors?.dastavage && <p className="error">{errors?.dastavage}</p>}

      </Grid>
      {formData?.subclass && <Grid item xs={12} sm={4} md={3}>
        <FileUpload
          title={t('manifesto')}
          // subTitle="(Declaration & Report)"
          requried
          name="dastavage2"
          onChange={handleChange}
          accept="image/*,.pdf"
        />
       {/* {formData?.dastavage && ( formData.dastavage.type.startsWith('image/') ?   <Image src={URL.createObjectURL(formData?.dastavage)} alt="Uploaded file"  width={250} height={150}
        style={{marginTop: "10px", width : "100%", height : "auto"}}/> :          
           <a href={URL.createObjectURL(formData.dastavage)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View File</a>)
} */}

        {errors?.dastavage2 && <p className="error">{errors?.dastavage2}</p>}

      </Grid>}
    </Grid>

 
    <div className={style.save}>
      <SubmitButton label={t('saveAndAddHof')} onClick={onSave} />
    </div>
  </div>
  )
}

export default AddFamily
