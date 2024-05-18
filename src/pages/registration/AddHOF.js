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
import MoreBtn from '@/components/MoreBtn'
import EditBtn from '@/components/EditBtn'
import EditFamilyConfirmation from './EditFamilyConfirmation'
import { useRouter } from 'next/router'
import AddMemberModal from './AddMemberModal'
import CloseBtn from '@/components/MoreBtn/CloseBtn'
import SaveBtn from '@/components/MoreBtn/SaveBtn'
import DeleteBtn from '@/components/MoreBtn/DeleteBtn'



const AddHOF = ({ setState, familyDetails }) => {
  const { t } = useTranslation("translation");
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [confirmationData, setConfirmationData] = useState({})
  const [EditModalType, setEditModalType] = useState(null) // family, head, member
  const [saveHof, setSaveHof] = useState(false)
  const [memberList, setMemberList] = useState([])
  const [openModal, setOpenModal] = React.useState(false);
  const [familyDetailsMore, setFamilyDetailsMore] = useState(false)
  const [headDetailsMore, setHeadDetailsMore] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isEditModeHead, setisEditModeHead] = useState(false)
  const [isEditModeMember, setisEditModeMember] = useState(false)
  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  console.log('memberList', memberList)
  console.log('familyDetails', familyDetails)

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
  console.log('formData', formData)

  const handleChange = (e) => {
    const { value, name } = e.target
    if (name == "dastavage") {

      const selectedFile = e.target.files[0];

      if (selectedFile && selectedFile.size <= 1024 * 1024) {
        setFormData({ ...formData, [name]: e.target.files[0] })
        setErrors({ ...errors, dastavage: "" })
      } else {
        setFormData({ ...formData, [name]: null })

        setErrors({ ...errors, dastavage: "File size must be less than 1MB" })
        // setError('File size must be less than 1MB');
      }
    } else {

      setFormData({ ...formData, [name]: value })
    }
  }

  const addMember = () => {
    const validationErrors = {};
    // const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setErrors({})
      handleClickOpen()
      console.log("Form submitted successfully:", formData);
    } else {
      setErrors(validationErrors);
    }
  }

  const onSave = () => {
    const validationErrors = {};
    // const validationErrors = validateForm(formData);
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
    } else if (!formData.adharCard?.trim()?.length < 12) {
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

  const openMemberDetails = (i) => {
    let data = [...memberList]
    let newData = data?.map((v,index) => index==i ? {...v, memberDetailsMore: !v?.memberDetailsMore}  : v)
    setMemberList(newData)
  }

  const changeisEditModeMember = (v) => {
    let data = [...memberList]
    let newData = data?.map((k,index) => index == v ? {...k, isEditModeMember: false}  : k)
    setMemberList(newData)
  }
  console.log('memberList', memberList)
  return (
    <>
      <AddMemberModal handleClose={handleCloseModal} open={openModal} setMemberList={setMemberList} memberList={memberList} />

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
              <td className={style.td}>{familyDetails?.municipal}</td>
              <td className={style.td}>{familyDetails?.ward}</td>
              <td className={style.td}>{familyDetails?.bpl}</td>
              <td className={style.td}>{familyDetails?.rationCard}</td>
              <td className={style.td}>{familyDetails?.mobile}</td>
              <td className={style.td}>

                <div className="action">

                  {isEditMode ? <>
                  <SaveBtn title="Save" onClick={() => {  setIsEditMode(false) }}/>
                  <CloseBtn title="Close" onClick={() => { setIsEditMode(false) }}/></> 
                :  
                <>{familyDetailsMore ? <CloseBtn title="Close" onClick={() => { setFamilyDetailsMore(!familyDetailsMore) }}/> : 
                <MoreBtn title="More" onClick={() => { setFamilyDetailsMore(!familyDetailsMore) }} /> }

                <EditBtn title="Edit" onClick={() => { setConfirmationData(familyDetails); setEditModalType("family"); handleOpen() }} /></>
                }
                 </div>
              </td>
            </tr>
            {familyDetailsMore && <tr >
              <td colspan="6" style={{padding : "20px 20px 0 20px"}}>

                <Grid container spacing={5}>
                  <Grid item xs={4}>
                    <p className={style.expandMargin}><b>Municipality:</b> {familyDetails?.municipal}</p>
                    <p className={style.expandMargin}><b>Financial Condition:</b> {familyDetails?.condition}</p>
                    <p className={style.expandMargin}><b>Sub Category:</b> {familyDetails?.subclass}</p>
                  </Grid>
                  <Grid item xs={4}>
                  <p className={style.expandMargin}><b>Ward:</b> {familyDetails?.ward}</p>
                  <p className={style.expandMargin}><b>BPL Number:</b> {familyDetails?.bpl}</p>
                  <p className={style.expandMargin}><b>Ration card number:</b> {familyDetails?.rationCard}</p>

                  </Grid>
                  <Grid item xs={4}>
                  <p className={style.expandMargin}><b>House Number:</b> {familyDetails?.makan}</p>
                  <p className={style.expandMargin}><b>Category:</b> {familyDetails?.class}</p>
                  <p className={style.expandMargin}><b>Mobile Number:</b> {familyDetails?.mobile}</p>

                  </Grid>
                </Grid>
              </td>
            </tr>}
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
                  <th className={style.th}>Economic Status</th>
                  <th className={style.th}>Social Category</th>
                  <th className={style.th}></th>
                </tr>
              </thead>
              <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>{formData?.EnglishName}</td>
                  <td className={style.td}>{formData?.rationCard}</td>
                  <td className={style.td}>A.P.L</td>
                  <td className={style.td}>{formData?.category}</td>
                  <td className={style.td}>

                    <div className="action">
                    {isEditModeHead ? <>
                  <SaveBtn title="Save" onClick={() => {  setisEditModeHead(false) }}/>
                  <CloseBtn title="Close" onClick={() => { setisEditModeHead(false) }}/></> 
                :  
                <>  
                      {headDetailsMore ? <CloseBtn title="Close" onClick={() => { setHeadDetailsMore(!headDetailsMore) }}/> : 
                  <MoreBtn title="More" onClick={() => { setHeadDetailsMore(!headDetailsMore) }} /> }

                      <EditBtn title="Edit" onClick={() => { setConfirmationData(formData); setEditModalType("head"); handleOpen() }} />
                      </>}
                      </div>
                  </td>
                </tr>
                {headDetailsMore && <tr  >
              <td colspan="6" style={{padding : "20px 20px 0 20px"}}>

                <Grid container spacing={5}>
                  <Grid item xs={4}>
                    <p className={style.expandMargin}><b>Head Of Family:</b> {formData?.EnglishName}</p>
                    <p className={style.expandMargin}><b>Date of Birth:</b> {formData?.dob}</p>
                    <p className={style.expandMargin}><b>Gender:</b> {formData?.gender}</p>
                  </Grid>
                  <Grid item xs={4}>
                  <p className={style.expandMargin}><b>Refrance Number:</b> {formData?.refrence}</p>
                  <p className={style.expandMargin}><b>Religion:</b> {formData?.religion}</p>
                  <p className={style.expandMargin}><b>Category:</b> {formData?.category}</p>

                  </Grid>
                  <Grid item xs={4}>
                  <p className={style.expandMargin}><b>Sub Category:</b> {formData?.subCategory}</p>
                  <p className={style.expandMargin}><b>Ration card number:</b> {formData?.rationCard}</p>
                  <p className={style.expandMargin}><b>Aadhar Card Number:</b> {formData?.adharCard}</p>

                  </Grid>
                </Grid>
              </td>
            </tr>}
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
                  {memberList?.map((v,index) => (<>
                    <tr className={style.tr}>
                      <td className={style.td}>{v?.EnglishName}</td>
                      <td className={style.td}>{v?.dob}</td>
                      <td className={style.td}>{v?.adharCard}</td>
                      <td className={style.td}>Document not Attached</td>
                      <td className={style.td}>

                        <div className="action">

                        {v?.isEditModeMember ? <>
                  <SaveBtn title="Save" onClick={() => {  changeisEditModeMember(index) }}/>
                  <DeleteBtn title="Delete" onClick={() => {  changeisEditModeMember(index) }}/>
                  <CloseBtn title="Close" onClick={() => { changeisEditModeMember(index) }}/></> 
                :  
                <>  
                        {v?.memberDetailsMore  ? <CloseBtn title="Close" onClick={() => { openMemberDetails(index) }}/> : 
                  <MoreBtn title="More" onClick={() => { openMemberDetails(index) }} /> }

                          <EditBtn title="Edit" onClick={() => { setConfirmationData(v); setEditModalType("member"); handleOpen() }} />
                          </>}
                          </div>
                      </td>
                    </tr>
                    {v?.memberDetailsMore && <tr  >
              <td colspan="6" style={{padding : "20px 20px 0 20px"}}>

                <Grid container spacing={5}>
                  <Grid item xs={4}>
                    <p className={style.expandMargin}><b>Member Name:</b> {v?.EnglishName}</p>
                    <p className={style.expandMargin}><b>Date of Birth:</b> {v?.dob}</p>
                    <p className={style.expandMargin}><b>Gender:</b> {v?.gender}</p>
                    <p className={style.expandMargin}><b>Is Verified:</b> Document not Attached</p>

                  </Grid>
                  <Grid item xs={4}>
                  <p className={style.expandMargin}><b>Refrance Number:</b> {v?.refrence}</p>
                  <p className={style.expandMargin}><b>Religion:</b> {v?.religion}</p>
                  <p className={style.expandMargin}><b>Category:</b> {v?.category}</p>

                  </Grid>
                  <Grid item xs={4}>
                  <p className={style.expandMargin}><b>Sub Category:</b> {v?.subCategory}</p>
                  <p className={style.expandMargin}><b>Ration card number:</b> {v?.rationCard}</p>
                  <p className={style.expandMargin}><b>Aadhar Card Number:</b> {v?.adharCard}</p>

                  </Grid>
                </Grid>
              </td>
            </tr>}
                  </>))}
                </tbody>
              </table>


            </div></>}
          <div className={style.save} style={{ float: "none", textAlign: "center" }}>
            <SubmitButton label="Add member" onClick={addMember} />
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
          <div className={style.save}>
            <SubmitButton label="Save" onClick={() => setSaveHof(true)} />
            {/* <SubmitButton label="Back" onClick={() => setState("1")} />
        <SubmitButton label="Add member" onClick={addMember} style={{ marginLeft: "20px" }}/>
        <SubmitButton label="Proceed" onClick={onSave} style={{ marginLeft: "20px" }} /> */}
          </div></>}
      <EditFamilyConfirmation memberList={memberList} setMemberList={setMemberList} handleClose={handleClose} open={open} data={confirmationData} EditModalType={EditModalType} setIsEditMode={setIsEditMode}setisEditModeHead={setisEditModeHead} setisEditModeMember={setisEditModeMember}/>
    </>
  )
}

export default AddHOF
