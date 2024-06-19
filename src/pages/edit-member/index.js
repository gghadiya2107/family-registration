import SelectDropdown from '@/components/SelectDropdown';
import MainLayout from '@/layout/MainLayout'
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import style from "./editMember.module.css"
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import { isAlphabateKey } from '@/utils/regex';
import TextArea from '@/components/TextArea';
import FileUpload from '@/components/FileUpload';
import SubmitButton from '@/components/SubmitBtn';
import { getEditType } from '@/network/actions/getEditType';
import translateToHindi, { translateToHindi2 } from '@/utils/translate';
import { getDocumentList } from '@/network/actions/getDocumentList';
import formatDate from '@/utils/formatDate';
import DatePicker from '@/components/DatePicker';
import { getRelation } from '@/network/actions/getRelation';
import { getCategory } from '@/network/actions/getCategory';
import { getReligion } from '@/network/actions/getReligion';
import { getGender } from '@/network/actions/getGender';
import { getQualification } from '@/network/actions/getQualification';
import { getProfession } from '@/network/actions/getProfession';
import { editMember } from '@/network/actions/editMember';
import { getMemberStatus } from '@/network/actions/getMemberStatus';
import { getfamilymember } from '@/network/actions/getfamilymember';

const EditMember = () => {
  const { t } = useTranslation("translation");
  const router = useRouter();
  const dispatch = useDispatch()
  const getEditTypeList = useSelector((state) => state.getEditType?.data)
  const documentList = useSelector((state) => state.getDocumentList?.data)
  const relationlist = useSelector((state) => state.getRelation?.data)
  const categorylist = useSelector((state) => state.getCategory?.data)
  const religionList = useSelector((state) => state.getReligion?.data)
  const genderlist = useSelector((state) => state.getGender?.data)
  const qualificationList = useSelector((state) => state.getQualification?.data)
  const profesionList = useSelector((state) => state.getProfession?.data)
  const memberStatusList = useSelector((state) => state.getMemberStatus?.data)
  const getfamilymemberList = useSelector((state) => state.getfamilymember?.data)


  console.log('getfamilymemberList', getfamilymemberList)
  const [userData, setUserData] = useState({})
  const [selectedEditType, setSelectedEditType] = useState(null)
  const [selectedDocumentType, setSelectedDocumentType] = useState(null)
  const [upoadedDocument, setUpoadedDocument] = useState("")
  const [remarks, setRemarks] = useState("")
  const [translatedText, setTranslatedText] = useState('');
  const [oldValue, setOldValue] = useState({})
  const [EnglishRelativeNameOther, setEnglishRelativeNameOther] = useState("")

  const [currentValue, setCurrentValue] = useState({})


  console.log('upoadedDocument', upoadedDocument)

  console.log('userData', userData, selectedEditType)

  useEffect(() => {
    setSelectedDocumentType(null)
    setUpoadedDocument(null)
    setRemarks(null)
  }, [selectedEditType])

  useEffect(() => {
    if (router?.query?.state) {
      const stateObject = JSON.parse(router?.query?.state) || "";
      console.log('stateObject', stateObject)
      setUserData(stateObject)
      router.replace(router.pathname)
    }
  }, [router])

  useEffect(() => {
    dispatch(getEditType())
    dispatch(getRelation())
    dispatch(getCategory())
    dispatch(getReligion())
    dispatch(getGender())
    dispatch(getQualification())
    dispatch(getProfession())
    dispatch(getMemberStatus())



  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const text = await translateToHindi2(userData?.relation + " " + userData?.relativeName); // Replace with actual data source or dynamic value
      if (text) {
        console.log('text', text)
        setTranslatedText(text);
      }

    };

    if (userData?.relation) fetchData();
    dispatch(getfamilymember(userData?.familyId))
  }, [userData]);


  useEffect(() => {
    if (userData && selectedEditType) {
      setCurrentValue(null)
      if (selectedEditType == 1) {
        setOldValue({ englishName: userData?.memberName, hindiName: userData?.memberNameH })
      }
      if (selectedEditType == 2) {
        setOldValue({
          EnglishRelation: userData?.relationId, EnglishRelativeName: userData?.relativeName,
          HindiRelation: translatedText
        })

      }
      if (selectedEditType == 3) {
        setOldValue({ birthDate: userData?.date_of_birth })

      }
      if (selectedEditType == 4) {
        setOldValue({ category: userData?.socialCategoryId, subCategory: userData?.socialSubCategory || "NA" })

      }
      if (selectedEditType == 5) {
        setOldValue({ aadhaarNo: userData?.aadhaarNo })
      }
      if (selectedEditType == 6) {
        setOldValue({ religion: userData?.religionId })
      }
      if (selectedEditType == 7) {
        setOldValue({ memberStatus: userData?.memberStatusId })


      }
      if (selectedEditType == 8) {
        setOldValue({ memberStatus: userData?.memberStatusId })


      }

      if (selectedEditType == 9) {
        setOldValue({ gender: userData?.genderId, qualification: userData?.qualificationId, profession: userData?.professionId, rationCardNo: userData?.rationCardNo })
      }
    }

  }, [userData, selectedEditType])

  console.log("oldValue", oldValue)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentValue({ ...currentValue, [name]: value })
  }

  const handleSubmit = () => {
    let body = {
      documentFiles: upoadedDocument,
      memberUpdate: { "memberId": userData?.familyMemberId, "editTypeId": selectedEditType, "oldValue": JSON.stringify(oldValue), "currentValue": JSON.stringify(currentValue), "documentId": selectedDocumentType, remarks: remarks }
    }
    const extra = () => {
      setSelectedDocumentType("")
      setUpoadedDocument(null)
      setRemarks(null)
      setOldValue(null)
      setCurrentValue("")
    }
    console.log("body", body)
    dispatch(editMember(body, extra))
  }

  const changeLang = async (name, key="") => {
    if (name) {

      const text = await translateToHindi(name);
      if(text && key){
        setCurrentValue({ ...currentValue, [key]: text })
      }else if (text) {

        setCurrentValue({ ...currentValue, hindiName: text })
        // return text
      }
    }
  }


  return (
    <MainLayout>
      <Box>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={"Select type of editing"}
              name="district"
              options={getEditTypeList?.map(v => ({ value: v?.id, label: v?.editType })) || []}
              value={selectedEditType}
              onChange={(e => { setSelectedEditType(+e.target.value); dispatch(getDocumentList(e.target.value)) })}
              requried
            />


          </Grid>
        </Grid>
        {selectedEditType && <><Divider style={{ margin: "30px 0" }} />
          <div className={style.heading} style={{ marginBottom: "5px" }}>Editing History</div>
          <div className={style.tablewrapper} >
            <table className={style.table}>
              <thead className={style.thead}>
                <tr className={style.tr}>
                  <th className={style.th}>Change In	</th>
                  <th className={style.th}>Details Before Editing	</th>
                  <th className={style.th}>Details After Editing</th>
                  <th className={style.th}>Date & Time	</th>
                  <th className={style.th}>IP</th>
                  <th className={style.th}>Supporting Documents</th>
                </tr>
              </thead>
              <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>{"v?.headMemberName"}	</td>
                  <td className={style.td}>{"v?.rationCardNo"}	</td>
                  <td className={style.td}>{"v?.totalMembers"}</td>
                  <td className={style.td}>{"v?.economic"}	</td>
                  <td className={style.td}>{"v?.district"}</td>
                  <td className={style.td}>{"v?.municipalName"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={style.heading} style={{ marginBottom: "5px", marginTop: "30px" }}>Changes</div>

          <div className={style.tablewrapper} >
            <table className={style.table}>
              <thead className={style.thead}>
                <tr className={style.tr}>
                  <th className={style.th}>Changes In</th>
                  <th className={style.th}>Existing Details</th>
                  <th className={style.th}>New Details</th>
                </tr>
              </thead>
              {selectedEditType == 1 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Name (English)	</td>
                  <td className={style.td}>{oldValue?.englishName || ""}	</td>
                  <td className={style.td}><InputFieldWithIcon


                    title={""}
                    subTitle=""
                    placeholder=""
                    type="text"
                    name="englishName"
                    style={{ width: "80%" }}
                    value={currentValue?.englishName || ""}
                    onChange={handleChange}
                    onBlur={(e) => changeLang(e.target.value)}

                    onKeyDown={(e) => {
                      if (!isAlphabateKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  /></td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>Name (Hindi)	</td>
                  <td className={style.td}>{oldValue?.hindiName || ""}	</td>
                  <td className={style.td}><InputFieldWithIcon


                    title={""}
                    subTitle=""
                    placeholder=""
                    type="text"
                    name="hindiName"
                    style={{ width: "80%" }}
                    disabled
                    value={currentValue?.hindiName || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!isAlphabateKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  /></td>
                </tr>





              </tbody>}
              {selectedEditType == 2 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Relative's Name (English)	</td>
                  <td className={style.td}>{userData?.relation + " " + userData?.relativeName || ""}	</td>
                  <td className={style.td} style={{ display: "flex" }}>

                    <SelectDropdown
                      name="EnglishRelation"
                      value={currentValue?.EnglishRelation}
                      onChange={handleChange}
                      style={{ paddingTop: "5.5px", paddingBottom: "5.5px" }}
                      options={relationlist?.map(v => ({ value: v?.id, label: v?.nameE }))}
                      onBlur={(e) => { changeLang(relationlist?.find(v => v?.id == e.target.value)?.nameE, "HindiRelation")}}

                    />
                    <SelectDropdown
                      name="EnglishRelativeName"
                      value={currentValue?.EnglishRelativeName}
                      onChange={handleChange}
                      style={{ paddingTop: "5.5px", paddingBottom: "5.5px" }}
                      onBlur={(e) => { changeLang(e.target.value, "HindiRelativeName")}}

                      options={[{ value: "other", label: "Other" }, ...getfamilymemberList?.map(v => ({ value: v?.memberName, label: v?.memberName }))]}

                    />
                    {currentValue?.EnglishRelativeName == "other" && <InputFieldWithIcon
                      style={{ width: "100%" }}

                      type="text"
                      name="EnglishRelativeNameOther"
                      value={currentValue?.EnglishRelativeNameOther}
                      onBlur={(e) => { changeLang(e.target.value, "HindiRelativeNameOther")}}

                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (!isAlphabateKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />}
                  </td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>Relative's Name (Hindi)	</td>
                  <td className={style.td}>{translatedText && translatedText || ""}	</td>
                  <td className={style.td} style={{ display: "flex" }}>

                    <InputFieldWithIcon

                      style={{ width: "100%" }}
                      name="HindiRelation"
                      value={currentValue?.HindiRelation || ""}
                      disabled

                      onKeyDown={(e) => {
                        if (!isAlphabateKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <InputFieldWithIcon

                      style={{ width: "100%" }}
                      name="HindiRelativeName"
                      value={currentValue?.HindiRelativeName || ""}
                      disabled

                      onKeyDown={(e) => {
                        if (!isAlphabateKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {currentValue?.EnglishRelativeName == "other" && <InputFieldWithIcon

                      style={{ width: "100%" }}
                      name="HindiRelativeNameOther"
                      value={currentValue?.HindiRelativeNameOther || ""}
                      disabled

                      onKeyDown={(e) => {
                        if (!isAlphabateKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />}</td>
                </tr>





              </tbody>}
              {selectedEditType == 3 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Date of Birth	</td>
                  <td className={style.td}>{formatDate(oldValue?.birthDate) || ""}	</td>
                  <td className={style.td}>  <DatePicker
                    // title={t('dateOfBirth')}
                    // style={{width : "80%"}}
                    type="date"
                    // requried
                    name="birthDate"
                    value={currentValue?.birthDate || ""}
                    onChange={handleChange}
                  /></td>
                </tr>
              </tbody>}
              {selectedEditType == 4 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Category	</td>
                  <td className={style.td}>{userData?.socialCategory || ""}	</td>
                  <td className={style.td}> <SelectDropdown
                    name="category"
                    style={{ width: "80%" }}
                    options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
                    value={currentValue?.category || ""}
                    onChange={handleChange}
                  /></td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>Sub Category</td>
                  <td className={style.td}>{userData?.socialSubCategory || "-"}	</td>
                  <td className={style.td}><InputFieldWithIcon


                    title={""}
                    subTitle=""
                    placeholder=""
                    type="text"
                    name="subCategory"
                    style={{ width: "80%" }}
                    value={currentValue?.subCategory || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!isAlphabateKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  /></td>
                </tr>
              </tbody>}
              {selectedEditType == 5 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Aadhar Number</td>
                  <td className={style.td}>{userData?.aadhaarNo || ""}	</td>
                  <td className={style.td}><InputFieldWithIcon


                    title={""}
                    subTitle=""
                    placeholder=""
                    type="number"
                    name="aadhaarNo"
                    value={currentValue?.aadhaarNo || ""}
                    style={{ width: "80%" }}
                    onChange={(e) => e.target.value?.length > 12 ? null : handleChange(e)}

                  /></td>
                </tr>
              </tbody>}
              {selectedEditType == 6 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Religion</td>
                  <td className={style.td}>{userData?.religion || ""}	</td>
                  <td className={style.td}> <SelectDropdown
                    // title={t('district')}
                    name="religion"
                    value={currentValue?.religion || ""}
                    onChange={handleChange}
                    style={{ width: "80%" }}
                    options={religionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                  /></td>
                </tr>
              </tbody>}
              {selectedEditType == 7 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Status</td>
                  <td className={style.td}>{userData?.memberStatus || ""}	</td>
                  <td className={style.td}> <DatePicker
                    // title={t('dateOfBirth')}
                    // style={{width : "80%"}}
                    type="date"
                    // requried
                    name="deadDate"
                    value={currentValue?.deadDate || ""}
                    onChange={handleChange}
                  /></td>
                </tr>
              </tbody>}
              {selectedEditType == 8 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Status</td>
                  <td className={style.td}>{userData?.memberStatus || ""}	</td>
                  <td className={style.td}><SelectDropdown
                    // title={t('district')}
                    name="memberStatus"
                    value={currentValue?.memberStatus || ""}
                    onChange={handleChange}
                    style={{ width: "80%" }}
                    options={memberStatusList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                  /></td>
                </tr>
              </tbody>}
              {selectedEditType == 9 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Gender</td>
                  <td className={style.td}>{userData?.gender || ""}	</td>
                  <td className={style.td}><SelectDropdown
                    // title={t('district')}
                    name="gender"
                    value={currentValue?.gender || ""}
                    onChange={handleChange}
                    style={{ width: "80%" }}
                    options={genderlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                  /></td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>Educational Status</td>
                  <td className={style.td}>{userData?.qualification || ""}	</td>
                  <td className={style.td}><SelectDropdown
                    // title={t('district')}
                    name="qualification"
                    value={currentValue?.qualification || ""}
                    onChange={handleChange}
                    style={{ width: "80%" }}
                    options={qualificationList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                  /></td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>Means of Leaving</td>
                  <td className={style.td}>{userData?.profession || ""}	</td>
                  <td className={style.td}><SelectDropdown
                    // title={t('district')}
                    name="profession"
                    value={currentValue?.profession || ""}
                    onChange={handleChange}
                    style={{ width: "80%" }}
                    options={profesionList?.map(v => ({ value: v?.id, label: v?.nameE }))}
                  // options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
                  // value={formData?.district}
                  // onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value })) }}
                  // requried
                  /></td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>Ration Card Number</td>
                  <td className={style.td}>{userData?.rationCardNo || ""}	</td>
                  <td className={style.td}><InputFieldWithIcon


                    title={""}
                    subTitle=""
                    placeholder=""
                    type="text"
                    name="rationCardNo"
                    value={currentValue?.rationCardNo || ""}
                    onChange={handleChange}
                    style={{ width: "80%" }}
                    // value={memberDetailsExtra?.memberName}
                    // onChange={handleChangeMemberDetails}
                    onKeyDown={(e) => {
                      if (!isAlphabateKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  /></td>
                </tr>

              </tbody>}
            </table>


          </div>

          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Typography fontSize={14} fontWeight={"bold"}>Remark (if any)</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextArea
                placeholder="Add remarks..."
                name="remarks"
                value={remarks || ""}
                onChange={(e) => setRemarks(e.target.value)}

              />
            </Grid>
            <Grid item xs={2}>
              <Typography fontSize={14} fontWeight={"bold"}>Upload Documents</Typography>
            </Grid>
            <Grid item xs={4}>
              <SelectDropdown
                name="document"
                options={[{ value: "", label: "Select..." }, ...documentList?.map(v => ({ value: v?.id, label: v?.documentName }))]}

                value={selectedDocumentType || null}
                onChange={(e) => setSelectedDocumentType(+e.target.value)}
              />
            </Grid>
            {selectedDocumentType && <Grid item xs={4}>
              <FileUpload
                name="dastavage"
                onChange={(e) => setUpoadedDocument(e.target.files?.[0])}
                accept="image/*,.pdf"

              />
            </Grid>}
          </Grid>

          <Box textAlign={"center"} mt={5}>
            <SubmitButton label="Save Details" onClick={handleSubmit} />
          </Box></>}

      </Box>
    </MainLayout>
  )
}

export default EditMember
