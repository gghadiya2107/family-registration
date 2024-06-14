import SelectDropdown from '@/components/SelectDropdown';
import MainLayout from '@/layout/MainLayout'
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import style from "./editMember.module.css"
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import { isAlphabateKey } from '@/utils/regex';
import TextArea from '@/components/TextArea';
import FileUpload from '@/components/FileUpload';
import SubmitButton from '@/components/SubmitBtn';

const EditMember = () => {
  const { t } = useTranslation("translation");
  const router = useRouter();
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({})

  useEffect(() => {
    if (router?.query?.state) {
      const stateObject = JSON.parse(router?.query?.state) || "";
      setUserData(stateObject)
      router.replace(router.pathname)
    }
  }, [router])




  return (
    <MainLayout>
      <Box>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={"Select type of editing"}
              name="district"
              options={[]}
              //   options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
              //   value={formData?.district}
              //   onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value })) }}
              requried
            />


          </Grid>
        </Grid>
        <Divider style={{ margin: "30px 0" }} />
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
            <tbody>
              <tr className={style.tr}>
                <td className={style.td}>{"v?.headMemberName"}	</td>
                <td className={style.td}>{"v?.rationCardNo"}	</td>
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
                <td className={style.td}>{"v?.headMemberName"}	</td>
                <td className={style.td}>{"v?.rationCardNo"}	</td>
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





            </tbody>
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
                name="description"
                // value={formData?.description}
                // onChange={handleChange}

              />
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize={14} fontWeight={"bold"}>Upload Documents</Typography>
        </Grid>
        <Grid item xs={4}>
        <SelectDropdown
                // title={t('religion')}
                name="religion"
                options={[]}
                // options={religionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                // value={formData?.religion}
                // onChange={handleChange}
                // requried
              />
        </Grid>
        <Grid item xs={4}>
        <FileUpload
                // title={t('document')}
                // subTitle="(Bonafide Himachal)"
                // requried
                name="dastavage"
                // value={formData?.rationCard}
                // onChange={handleChange}
                accept="image/*,.pdf"

              />
        </Grid>
        </Grid>

<Box textAlign={"center"} mt={5}>

         <SubmitButton label="Save Details" onClick={() => {}} />
</Box>

      </Box>
    </MainLayout>
  )
}

export default EditMember
