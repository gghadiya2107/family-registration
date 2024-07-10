import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getfamilymember } from '@/network/actions/getfamilymember';
import style from "../registration/registration.module.css"
import MoreBtn from '@/components/MoreBtn';
import CloseBtn from '@/components/MoreBtn/CloseBtn';
import { Grid } from '@mui/material';
import SubmitButton from '@/components/SubmitBtn';
import formatDate from '@/utils/formatDate';
import FormatAadharNumber, { isValidMobileNumber } from '@/utils/formatAadharNumber';
import toast from 'react-hot-toast';
import SelectDropdown from '@/components/SelectDropdown';
import { getMunicipalities } from '@/network/actions/getMunicipalities';
import { getWard } from '@/network/actions/getWard';
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import { isAlphabateKey, isAlphanumericKey, isNumericKeyWithHifan } from '@/utils/regex';
import FileUpload from '@/components/FileUpload';
import { getDistrict } from '@/network/actions/getDistrict';
import { getEconomicStatus } from '@/network/actions/economicStatus';
import { getCategory } from '@/network/actions/getCategory';
import { useTranslation } from 'react-i18next';
import { separateMember } from '@/network/actions/separateMember';
import { getFamilyList } from '@/network/actions/getFamilyList';
import { memberTransferList } from '@/network/actions/memberTransferList';
import { AddTransferMember } from '@/network/actions/AddTransferMember';
import { useLoading } from '@/utils/LoadingContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ViewFamilyModal = ({ open, handleClose, viewData ,setTableData}) => {
  const { t } = useTranslation("translation");
  const { loading, startLoading, stopLoading } = useLoading();

  const dispatch = useDispatch()
  const getfamilymemberList = useSelector((state) => state.getfamilymember?.data?.familyData || [])
  console.log('getfamilymemberList', getfamilymemberList, viewData)
  const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const economicStatusList = useSelector((state) => state.getEconomicStatus?.data)
  const categorylist = useSelector((state) => state.getCategory?.data)
  const [memberList, setMemberList] = React.useState([])
  const [headData, setHeadData] = React.useState({})
  const [isHeadMore, setIsHeadMore] = React.useState(false)
  const [rationCardData, setRationCardData] = React.useState([])
  const [formData, setFormData] = React.useState({})
  const [errors, setErrors] = React.useState({});
  const [originalData, setOriginalData] = React.useState({})
  const [newData, setNewData] = React.useState({})




  console.log('newData', newData)
  React.useEffect(() => {
    setOriginalData(viewData)
    // setNewData(viewData)
  }, [viewData])
  // React.useEffect(() => {
  //   if(newData?.districtCode){
  //     dispatch(getMunicipalities({ districtCode: viewData?.districtCode }))
  //   }
  // }, [newData?.districtCode])
  // React.useEffect(() => {
  //   if(newData?.municipalityId){
  //     dispatch(getWard({ municipalId: viewData?.municipalityId }))
  //   }
  // }, [newData?.municipalityId])
  React.useEffect(() => {
    dispatch(getDistrict(startLoading, stopLoading))
    dispatch(getEconomicStatus())
    dispatch(getCategory())
  }, [])
  React.useEffect(() => {
    let data = [...getfamilymemberList]
    let newData = data?.map(v => ({ ...v, isChecked: false, isHead: false }))
    setRationCardData(newData)
  }, [getfamilymemberList])
  React.useEffect(() => {
    if (viewData?.family_id) {

      dispatch(getfamilymember(viewData?.family_id,startLoading, stopLoading))
    }
  }, [viewData])
  React.useEffect(() => {
    if (getfamilymemberList) {

      setMemberList(getfamilymemberList?.filter(v => v?.isHead != "true"))
      setHeadData(getfamilymemberList?.find(v => v?.isHead == "true"))
    }
  }, [getfamilymemberList])

  const viewMoreMember = (index, value) => {
    let newData = memberList?.map((v, i) => index == i ? { ...v, memberDetailsMore: value } : v)
    setMemberList(newData)
  }
  const handleChange = (e) => {
    const { value, name } = e.target
    if (name == "dastavage" || name == "dastavage2") {
      const selectedFile = e.target.files[0];

      if (selectedFile && selectedFile.size <= 1024 * 1024) {
        setNewData({ ...newData, [name]: e.target.files[0] })
        // console.log('URL.createObjectURL(e.target.files[0])', URL.createObjectURL(e.target.files[0]))
        setErrors({ ...errors, [name]: "" })
      } else {
        setNewData({ ...newData, [name]: null })

        setErrors({ ...errors, [name]: t('validateFileSize') })
      }

    } else {
      setNewData({ ...newData, [name]: value })

    }
  }
  const validateForm = (formData) => {
    const errors = {};
    if (!formData?.municipalityId?.trim() || formData?.municipalityId == "0") {
      errors.municipalityId = t('validateMunucipal');
    }
    if (!formData?.districtCode?.trim() || formData?.districtCode == "0") {
      errors.districtCode = t('validateDistrict');
    }
    if (!formData?.wardId?.trim() || formData?.wardId == "0") {
      errors.wardId = t("validateward");
    }
    if (!formData?.houseAddress?.trim()) {
      errors.houseAddress = t("ValidateHouseNumber");
    }
    if (!formData?.economicId?.trim() || formData?.economicId == "0") {
      errors.economicId = t("validateCondition");
    }
    if (!formData?.socialCategoryId?.trim() || formData?.socialCategoryId == "0") {
      errors.socialCategoryId = t("validateCategory");
    }
    // if (!formData.subclass?.trim()) {
    //   errors.subclass = t("validateSubCategory");
    // }
    if (!formData?.rationCardNo?.trim()) {
      errors.rationCardNo = t("validateRationCard");
    }
    if (!formData?.mobileNumber?.trim()) {
      errors.mobileNumber = t("validateMobile");
    }
   else if (formData?.mobileNumber?.length < 11) {
      errors.mobileNumber = t("validateMobileLength");
    }
    else if (!isValidMobileNumber(formData?.mobileNumber?.replace("-", "")?.trim())) {
      errors.mobileNumber = t("validateMobileStart");
    }    
    if (!formData?.dastavage) {
      errors.dastavage = t("validateDocument");
    }
    // if (formData?.subclass && !formData.dastavage2) {
    //   errors.dastavage2 = t("validateDocument");
    // }

    return errors;
  };

  const saveAndAddDetails = () => {
    const validationErrors = validateForm(newData);
    if (Object.keys(validationErrors).length === 0) {

      let isHead = viewData.some(v => v.isHead == true)
      if (!isHead) {
        toast.error("Please select head of family")
      } else {
        const extra = () => {
          setNewData(null)
          handleClose()
          dispatch(memberTransferList({...formData},startLoading, stopLoading))
  
  
        }
        let body = {
          AddFamily : {
            "districtCode":newData?.districtCode,
            "houseAddress":newData?.houseAddress,
            "rationCardNo":newData?.rationCardNo,
            "socialSubCategory":newData?.socialSubCategory || "",
            "wardId":newData?.wardId,
            "socialCategoryId":newData?.socialCategoryId,
            "municipalityId":newData?.municipalityId,
            "bplNumber":newData?.bplNumber,
            "mobileNumber":newData?.mobileNumber?.replace("-", ""),
            "active":"true",
            "verifiedBy":"1",
            "economicId":newData?.economicId
            },
            consentDocName : newData?.dastavage,
            TransferMembers : {"members":viewData?.map(k => +k?.memberId), isHead : viewData?.find(v => v?.isHead)?.memberId}
            
        }
        console.log("body123",body)
        
        dispatch(AddTransferMember(body, extra))
      }


  } else {
    console.log('validationErrors', validationErrors)
    setErrors(validationErrors);
  }
  
    

  }

  console.log('viewData', viewData)
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"lg"}
      >

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
          <Grid container spacing={3} mt={0}>
         
            <Grid item xs={12} sm={12} md={12}  >
              <Grid container spacing={3} mt={0} >
                <Grid item xs={12} sm={3} md={3}>
                  <SelectDropdown
                    title={t('district')}
                    name="districtCode"
                    options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
                    value={newData?.districtCode ?? null}
                    onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value }, startLoading, stopLoading )); console.log(e.target.value) }}
requried
                  />
                  {errors?.districtCode && <p className="error">{errors?.districtCode}</p>}

                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <SelectDropdown
                    title={t('selectVillage')}
                    name="municipalityId"
                    options={municipalList?.map(v => ({ value: v?.id, label: v?.name }))}
                    disabled={newData?.district != "" ? false : true}
                    value={newData?.municipalityId}
                    onChange={(e) => { handleChange(e); dispatch(getWard({ municipalId: e.target.value }, startLoading, stopLoading )) }}
                    requried
                  />
                  {errors?.municipalityId && <p className="error">{errors?.municipalityId}</p>}

                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <SelectDropdown
                    title={t('selectWard')}
                    name="wardId"
                    disabled={newData?.district != "" && newData?.municipal != "" ? false : true}

                    options={wardList?.map(v => ({ value: v?.id, label: v?.name }))}
                    requried
                    value={newData?.wardId}
                    onChange={handleChange}
                  />
                  {errors?.wardId && <p className="error">{errors?.wardId}</p>}
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <InputFieldWithIcon
                    title={t('houseNumber')}
                    // icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="text"
                    name="houseAddress"
                    value={newData?.houseAddress}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!isAlphanumericKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    requried
                  />
                  {errors?.houseAddress && <p className="error">{errors?.houseAddress}</p>}

                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <SelectDropdown
                    title={t('financialCondition')}
                    name="economicId"
                    options={economicStatusList?.map(v => ({ value: v?.id, label: v?.nameE }))}
                    value={newData?.economicId}
                    onChange={handleChange}
                    requried
                  />
                  {errors?.economicId && <p className="error">{errors?.economicId}</p>}

                </Grid>
                {formData?.condition == "2" && <Grid item xs={12} sm={3} md={3}>
                  <InputFieldWithIcon
                    title={t('bplCount')}
                    // icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="number"
                    onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
                    name="bplNumber"
                    value={newData?.bplNumber}
                    onChange={handleChange}
                    requried
                  />
                  {errors?.bplNumber && <p className="error">{errors?.bplNumber}</p>}

                </Grid>}
                <Grid item xs={12} sm={3} md={3}>
                  <SelectDropdown
                    title={t('category')}
                    name="socialCategoryId"
                    options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
                    value={newData?.socialCategoryId}
                    onChange={handleChange}
                    requried
                  />
                  {errors?.socialCategoryId && <p className="error">{errors?.socialCategoryId}</p>}

                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <InputFieldWithIcon
                    title={t('subCategory')}
                    // icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="text"
                    name="socialSubCategory"
                    value={newData?.socialSubCategory}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!isAlphabateKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {/* {errors?.subclass && <p className="error">{errors?.subclass}</p>} */}

                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <InputFieldWithIcon
                    title={t('rathinCardNumber')}
                    // icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="text"
                    name="rationCardNo"
                    value={newData?.rationCardNo}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!isAlphanumericKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    requried
                  />
                  {errors?.rationCardNo && <p className="error">{errors?.rationCardNo}</p>}

                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <InputFieldWithIcon
                    title={t('mobileNumber')}
                    // icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="text"
                    name="mobileNumber"
                    value={newData?.mobileNumber?.replace(/^(\d{5})(\d{1,5})/, '$1-$2')}
                    onChange={(e) => e.target.value?.length > 11 ? null : handleChange(e)}
                    onKeyDown={(e) => {
                      if (!(isNumericKeyWithHifan(e.key) || e.key === 'Backspace')) {
                        e.preventDefault();
                      }
                    }}                     requried
                  />
                  {errors?.mobileNumber && <p className="error">{errors?.mobileNumber}</p>}


                </Grid>
                <Grid item xs={12} sm={3} md={3}>
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
                {formData?.subclass && <Grid item xs={12} sm={3} md={3}>
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
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={2}>
            
            <Grid item xs={12} sm={12} md={12}>
              <div className={style.tablewrapper} style={{ margin: "0" }}>
                <table className={style.table}>
                  <thead className={style.thead}>
                    <tr className={style.tr}>
                      <th className={style.th}>Name</th>
                      <th className={style.th}>Birth Date</th>
                      <th className={style.th}>Aadhaar Number</th>
                      <th className={style.th}>District</th>
                      <th className={style.th}>Municipal</th>
                      <th className={style.th}>ward</th>
                      <th className={style.th}>HOF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewData?.map(v => <>
                      <tr className={style.tr}>
                        <td className={style.td}>{v?.memberName}</td>
                        <td className={style.td}>{formatDate(v?.dateOfBirth) || "-"}</td>
                        <td className={style.td}>{v?.aadhaarNo ? FormatAadharNumber(v?.aadhaarNo) : "-"}</td>
                        <td className={style.td}>{v?.district}</td>
                        <td className={style.td}>{v?.municipalName}</td>
                        <td className={style.td}>{v?.wardName}</td>

                        <td className={style.td}>
                          <input type="radio"
                            checked={v?.isHead == true}
                            name='head' className={style.checkbox}
                            onChange={(e) => setTableData(viewData?.map(p => p?.memberId == v?.memberId ? { ...p, isHead: e.target.checked } : p))}
                          />
                        </td>

                      </tr>
                    </>)}

                  </tbody>
                </table>


              </div>
            </Grid>
            <div className={style.save} style={{ textAlign: "right", width: "100%" }}>
              <SubmitButton onClick={() => {handleClose(); setNewData(null)}} label="Cancel" />

              <SubmitButton label="Save" style={{ marginLeft: "10px" }} onClick={() => saveAndAddDetails()} />
              {/* <SubmitButton label={t('proceedToAddFamily')} onClick={() => saveAndAddDetails()} /> */}
            </div>
          </Grid>


        </DialogContent>

      </BootstrapDialog>
    </React.Fragment>
  );
}

export default ViewFamilyModal