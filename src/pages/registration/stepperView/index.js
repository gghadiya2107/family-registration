import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography } from '@mui/material';
import AddFamily from './AddFamily';
import AddHOF from './AddHOF';
import AddMember from './AddMember';
import { useDispatch } from 'react-redux';
import { addFamily } from '@/network/actions/addFamily';
import { useLoading } from '@/utils/LoadingContext';
import { isValidMobileNumber } from '@/utils/formatAadharNumber';

const steps = [
  'Add Family',
  'Add HOF',
  'Add Member',
];

export default function StepperView({ selectedFamilyMember }) {
  const dispatch = useDispatch()
  const { loading, startLoading, stopLoading } = useLoading();

  const [activeStepper, setActiveStepper] = React.useState(0)
  const [formData, setFormData] = React.useState({})
  const [errors, setErrors] = React.useState({});

  const onSave = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {

      setActiveStepper(1)
    }else{
      setErrors(validationErrors);
    }
  }

  const onSaveFamily = () => {
    // const validationErrors = {};
 
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      let body = {
        houseAddress: formData?.makan || "",
        rationCardNo: formData?.rationCard || "",
        socialSubCategory: formData?.subclass || "",
        wardId: formData?.ward || 0,
        districtCode: formData?.district || 0,
        socialCategoryId: formData?.class || 0,
        municipalityId: formData?.municipal || 0,
        mobileNumber: formData?.mobile?.replace("-", "") || "",
        bplNumber: formData?.bpl || "",
        active: true,
        economicId: formData?.condition || 0,
        dastavage: formData?.dastavage || "",
        dastavage2: formData?.dastavage2 || ""
      }
      console.log('body', body)
      const extra = () => {
        // setActiveStepper(1)
      }

      dispatch(addFamily(body, extra, startLoading, stopLoading))


    } else {
      console.log('validationErrors', validationErrors)
      setErrors(validationErrors);
    }
  }

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
    <>
      <Box sx={{ width: '100%' }} mt={5}>
        <Stepper activeStep={activeStepper} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

      </Box>
      {activeStepper == 0 && <AddFamily setActiveStepper={setActiveStepper} selectedFamilyMember={selectedFamilyMember} formData={formData} setFormData={setFormData} onSave={onSave} errors={errors} setErrors={setErrors}/>}
      {activeStepper == 1 && <AddHOF setActiveStepper={setActiveStepper} selectedFamilyMember={selectedFamilyMember} onSaveFamily={onSaveFamily}/>}
      {activeStepper == 2 && <AddMember selectedFamilyMember={selectedFamilyMember} />}
    </>
  );
}
