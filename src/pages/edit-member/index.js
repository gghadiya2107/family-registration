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

const EditMember = () => {
  const { t } = useTranslation("translation");
  const router = useRouter();
  const dispatch = useDispatch()
  const getEditTypeList = useSelector((state) => state.getEditType?.data)
  const documentList = useSelector((state) => state.getDocumentList?.data)
console.log('documentList', documentList)
  const [userData, setUserData] = useState({})
  const [selectedEditType, setSelectedEditType] = useState("")
  const [selectedDocumentType, setSelectedDocumentType] = useState("")
  const [remarks, setRemarks] = useState("")
  const [translatedText, setTranslatedText] = useState('');

console.log('userData', userData,selectedEditType)
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
    
  }, [])

  useEffect(() => {
    const fetchData = async () => {
        const text = await translateToHindi2(userData?.relation + " " +  userData?.relativeName); // Replace with actual data source or dynamic value
        if (text) {
          console.log('text', text)
          setTranslatedText(text);
        }
      
    };

if(userData?.relation) fetchData();
  }, [userData]);


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
              onChange={(e=> {setSelectedEditType(e.target.value); dispatch(getDocumentList(e.target.value))})}
              //   onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value })) }}
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
            {selectedEditType == 1 &&<tbody>
              <tr className={style.tr}>
                <td className={style.td}>Name (English)	</td>
                <td className={style.td}>{userData?.memberName || ""}	</td>
                <td className={style.td}><InputFieldWithIcon


                  title={""}
                  subTitle=""
                  placeholder=""
                  type="text"
                  name="memberName"
                  style={{width : "80%"}}
                  // value={memberDetailsExtra?.memberName}
                  // onChange={handleChangeMemberDetails}
                  onKeyDown={(e) => {
                    if (!isAlphabateKey(e.key)) {
                      e.preventDefault();
                    }
                  }}
                /></td>
              </tr>
              <tr className={style.tr}>
                <td className={style.td}>Name (Hindi)	</td>
                <td className={style.td}>{userData?.memberNameH || ""}	</td>
                <td className={style.td}><InputFieldWithIcon


                  title={""}
                  subTitle=""
                  placeholder=""
                  type="text"
                  name="memberName"
                  style={{width : "80%"}}
                  disabled
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
            {selectedEditType == 2 &&<tbody>
              <tr className={style.tr}>
                <td className={style.td}>Relative's Name (English)	</td>
                <td className={style.td}>{userData?.relation + " " +  userData?.relativeName || ""}	</td>
                <td className={style.td}><InputFieldWithIcon


                  title={""}
                  subTitle=""
                  placeholder=""
                  type="text"
                  name="memberName"
                  style={{width : "80%"}}
                  // value={memberDetailsExtra?.memberName}
                  // onChange={handleChangeMemberDetails}
                  onKeyDown={(e) => {
                    if (!isAlphabateKey(e.key)) {
                      e.preventDefault();
                    }
                  }}
                /></td>
              </tr>
              <tr className={style.tr}>
                <td className={style.td}>Relative's Name (Hindi)	</td>
                <td className={style.td}>{ translatedText && translatedText || ""}	</td>
                <td className={style.td}><InputFieldWithIcon


                  title={""}
                  subTitle=""
                  placeholder=""
                  type="text"
                  name="memberName"
                  style={{width : "80%"}}
                  disabled
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
            {selectedEditType == 3 &&<tbody>
              <tr className={style.tr}>
                <td className={style.td}>Date of Birth	</td>
                <td className={style.td}>{formatDate(userData?.date_of_birth) || ""}	</td>
                <td className={style.td}><InputFieldWithIcon


                  title={""}
                  subTitle=""
                  placeholder=""
                  type="text"
                  name="memberName"
                  style={{width : "80%"}}
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
            {selectedEditType == 4 &&<tbody>
              <tr className={style.tr}>
                <td className={style.td}>Category	</td>
                <td className={style.td}>{userData?.socialCategory || ""}	</td>
                <td className={style.td}><InputFieldWithIcon


                  title={""}
                  subTitle=""
                  placeholder=""
                  type="text"
                  name="memberName"
                  style={{width : "80%"}}
                  // value={memberDetailsExtra?.memberName}
                  // onChange={handleChangeMemberDetails}
                  onKeyDown={(e) => {
                    if (!isAlphabateKey(e.key)) {
                      e.preventDefault();
                    }
                  }}
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
                  name="memberName"
                  style={{width : "80%"}}
                  disabled
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
            {selectedEditType == 5 &&<tbody>
              <tr className={style.tr}>
                <td className={style.td}>Aadhar Number</td>
                <td className={style.td}>{userData?.aadhaarNo || ""}	</td>
                <td className={style.td}><InputFieldWithIcon


                  title={""}
                  subTitle=""
                  placeholder=""
                  type="text"
                  name="memberName"
                  style={{width : "80%"}}
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
            {selectedEditType == 6 &&<tbody>
              <tr className={style.tr}>
                <td className={style.td}>Religion</td>
                <td className={style.td}>{userData?.religion || ""}	</td>
                <td className={style.td}><InputFieldWithIcon


                  title={""}
                  subTitle=""
                  placeholder=""
                  type="text"
                  name="memberName"
                  style={{width : "80%"}}
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
            {selectedEditType == 7 &&<tbody>
              <tr className={style.tr}>
                <td className={style.td}>Status</td>
                <td className={style.td}>{userData?.memberStatus || ""}	</td>
                <td className={style.td}><InputFieldWithIcon


                  title={""}
                  subTitle=""
                  placeholder=""
                  type="text"
                  name="memberName"
                  style={{width : "80%"}}
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
            {selectedEditType == 8 &&<tbody>
              <tr className={style.tr}>
                <td className={style.td}>Status</td>
                <td className={style.td}>{userData?.memberStatus || ""}	</td>
                <td className={style.td}><InputFieldWithIcon


                  title={""}
                  subTitle=""
                  placeholder=""
                  type="text"
                  name="memberName"
                  style={{width : "80%"}}
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
            {selectedEditType == 9 &&<tbody>
              <tr className={style.tr}>
                <td className={style.td}>Gender</td>
                <td className={style.td}>{userData?.gender || ""}	</td>
                <td className={style.td}><InputFieldWithIcon


                  title={""}
                  subTitle=""
                  placeholder=""
                  type="text"
                  name="memberName"
                  style={{width : "80%"}}
                  // value={memberDetailsExtra?.memberName}
                  // onChange={handleChangeMemberDetails}
                  onKeyDown={(e) => {
                    if (!isAlphabateKey(e.key)) {
                      e.preventDefault();
                    }
                  }}
                /></td>
              </tr>
              <tr className={style.tr}>
                <td className={style.td}>Educational Status</td>
                <td className={style.td}>{userData?.qualification || ""}	</td>
                <td className={style.td}><InputFieldWithIcon


                  title={""}
                  subTitle=""
                  placeholder=""
                  type="text"
                  name="memberName"
                  style={{width : "80%"}}
                  // value={memberDetailsExtra?.memberName}
                  // onChange={handleChangeMemberDetails}
                  onKeyDown={(e) => {
                    if (!isAlphabateKey(e.key)) {
                      e.preventDefault();
                    }
                  }}
                /></td>
              </tr>
              <tr className={style.tr}>
                <td className={style.td}>Means of Leaving</td>
                <td className={style.td}>{userData?.profession || ""}	</td>
                <td className={style.td}><InputFieldWithIcon


                  title={""}
                  subTitle=""
                  placeholder=""
                  type="text"
                  name="memberName"
                  style={{width : "80%"}}
                  // value={memberDetailsExtra?.memberName}
                  // onChange={handleChangeMemberDetails}
                  onKeyDown={(e) => {
                    if (!isAlphabateKey(e.key)) {
                      e.preventDefault();
                    }
                  }}
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
                  name="memberName"
                  style={{width : "80%"}}
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
                // title={t('comment')}
                placeholder="Add remarks..."
                name="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}

              />
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize={14} fontWeight={"bold"}>Upload Documents</Typography>
        </Grid>
        <Grid item xs={4}>
        <SelectDropdown
                // title={t('religion')}
                name="document"
                // options={[]}
                options={documentList?.map(v => ({ value: v?.id, label: v?.documentName }))}

                value={selectedDocumentType}
                onChange={(e) => setSelectedDocumentType(e.target.value)}
                // requried
              />
        </Grid>
        {selectedDocumentType && <Grid item xs={4}>
        <FileUpload
                // title={t('document')}
                // subTitle="(Bonafide Himachal)"
                // requried
                name="dastavage"
                // value={formData?.rationCard}
                // onChange={handleChange}
                accept="image/*,.pdf"

              />
        </Grid>}
        </Grid>



<Box textAlign={"center"} mt={5}>

         <SubmitButton label="Save Details" onClick={() => {}} />
</Box></>}

      </Box>
    </MainLayout>
  )
}

export default EditMember
