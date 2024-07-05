import MainLayout from '@/layout/MainLayout'
import { getFamilyUpdationList } from '@/network/actions/getFamilyUpdationList'
import removeQueryParam from '@/utils/removeQueryParam'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from "./edithistory.module.css"
import formatDate, { formatDateTime } from '@/utils/formatDate'
import SubmitButton from '@/components/SubmitBtn'
import { getEditType } from '@/network/actions/getEditType'
import { getRelation } from '@/network/actions/getRelation'
import { getCategory } from '@/network/actions/getCategory'
import { getReligion } from '@/network/actions/getReligion'
import { getGender } from '@/network/actions/getGender'
import { getQualification } from '@/network/actions/getQualification'
import { getProfession } from '@/network/actions/getProfession'
import { getMemberStatus } from '@/network/actions/getMemberStatus'
import FormatAadharNumber from '@/utils/formatAadharNumber'
import RevertModal from './RevertModal'

const EditingHistory = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const searchParams = useSearchParams()
    const getFamilyUpdationListData = useSelector((state) => state.getFamilyUpdationList?.data)
    const documentList = useSelector((state) => state.getDocumentList?.data)
    const relationlist = useSelector((state) => state.getRelation?.data)
    const categorylist = useSelector((state) => state.getCategory?.data)
    const religionList = useSelector((state) => state.getReligion?.data)
    const genderlist = useSelector((state) => state.getGender?.data)
    const qualificationList = useSelector((state) => state.getQualification?.data)
    const profesionList = useSelector((state) => state.getProfession?.data)
    const memberStatusList = useSelector((state) => state.getMemberStatus?.data)
    const [open, setOpen] = useState(false)
    const [revertData, setRevertData] = useState({})

    const openModal = () => {
      setOpen(true)
    }
    const closeModal = () => {
      setOpen(false)
    }

    console.log('getFamilyUpdationListData', getFamilyUpdationListData)

  const familyId = searchParams.get('familyId')

  useLayoutEffect(() => {
    if(familyId) dispatch(getFamilyUpdationList({family_id : familyId}, router))

  }, [familyId])

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

  const getOldValue = (data) => {
    let value = JSON.parse(data?.oldValue)
    if(data?.editTypeId == 1){
        return value?.englishName || "-"
      }
      if(data?.editTypeId == 2){
        return  (value?.EnglishRelativeName == "other" ? value?.EnglishRelativeNameOther : value?.EnglishRelativeName ) || "-"
      }
    if(data?.editTypeId == 3){
        return formatDate(value?.birthDate) || "-"
      }
    if(data?.editTypeId == 4){
        return <div>
        <p>Category: {categorylist?.find(v => v?.id == value?.category)?.nameE || "-"}</p>
        <p style={{marginTop: "5px"}}>Subcategory: {value?.subCategory|| "-"}</p>
      </div>
    }
    if(data?.editTypeId == 5){
        return FormatAadharNumber(value?.aadhaarNo) || "-"
      }
      if(data?.editTypeId == 6){
        return religionList?.find(v => v?.id == value?.religion)?.nameE || "-"
      }
      if(data?.editTypeId == 7){
        return  "-"
      }
      if(data?.editTypeId == 8){
        return memberStatusList?.find(v => v?.id == value?.memberStatus)?.nameE || "-"
      }
      if(data?.editTypeId == 9){
        return <div>
          <p>Gender: {genderlist?.find(v => v?.id == value?.gender)?.nameE || "-"}</p>
          <p style={{marginTop: "5px"}}>Education: {qualificationList?.find(v => v?.id == value?.qualification)?.nameE || "-"}</p>
          <p style={{marginTop: "5px"}}>Means of Leaving: {profesionList?.find(v => v?.id == value?.profession)?.nameE || "-"}</p>
          <p style={{marginTop: "5px"}}>Ration Card Number: {value?.rationCardNo || "-"}</p>
        </div>
      }
  }
  const getCurrentValue = (data) => {
    let value = JSON.parse(data?.currentValue)
    if(data?.editTypeId == 1){
        return value?.englishName || "-"
      }
      if(data?.editTypeId == 2){
        return  (value?.EnglishRelativeName == "other" ? value?.EnglishRelativeNameOther : value?.EnglishRelativeName ) || "-"
      }
    if(data?.editTypeId == 3){
        return formatDate(value?.birthDate) || "-"
      }
    if(data?.editTypeId == 4){
        return <div>
        <p>Category: {categorylist?.find(v => v?.id == value?.category)?.nameE || "-"}</p>
        <p style={{marginTop: "5px"}}>Subcategory: {value?.subCategory|| "-"}</p>
      </div>
    }
    if(data?.editTypeId == 5){
        return FormatAadharNumber(value?.aadhaarNo) || "-"
      }
      if(data?.editTypeId == 6){
        return religionList?.find(v => v?.id == value?.religion)?.nameE || "-"
      }
      if(data?.editTypeId == 7){
        return formatDate(value?.deadDate) || "-"
    }
      if(data?.editTypeId == 8){
        return memberStatusList?.find(v => v?.id == value?.memberStatus)?.nameE || "-"
      }
      if(data?.editTypeId == 9){
        return <div>
          <p>Gender: {genderlist?.find(v => v?.id == value?.gender)?.nameE || "-"}</p>
          <p style={{marginTop: "5px"}}>Education: {qualificationList?.find(v => v?.id == value?.qualification)?.nameE || "-"}</p>
          <p style={{marginTop: "5px"}}>Means of Leaving: {profesionList?.find(v => v?.id == value?.profession)?.nameE || "-"}</p>
          <p style={{marginTop: "5px"}}>Ration Card Number: {value?.rationCardNo || "-"}</p>
        </div>
      }
  }

  return (
    <MainLayout>
      <div className={style.heading} style={{ marginBottom: "5px" }}>Editing History</div>
          <div className={style.tablewrapper} >
            <table className={style.table}>
              <thead className={style.thead}>
                <tr className={style.tr}>
                  <th className={style.th}>Member Name & Id</th>
                  <th className={style.th}>Change In</th>
                  <th className={style.th}>Details Before Editing	</th>
                  <th className={style.th}>Details After Editing</th>
                  <th className={style.th}>Date & Time	</th>
                  <th className={style.th}>Supporting Documents</th>
                  <th className={style.th}>Action</th>
                </tr>
              </thead>
              <tbody>
              {getFamilyUpdationListData?.map(v =>  <tr className={style.tr}>
                  <td className={style.td}>{v?.memberName+" ("+v?.memberId+")" }	</td>
                  <td className={style.td}>{v?.editType }	</td>
                  <td className={style.td}>{getOldValue(v)}	</td>
                  <td className={style.td}>{getCurrentValue(v)}</td>
                  <td className={style.td}>{formatDateTime(v?.createdOn)}	</td>
                  <td className={style.td}><p style={{color : "blue", cursor: "pointer"}} onClick={() => window.open(v?.filePath)}>{v?.documentName }</p></td>
                  <td className={style.td}><SubmitButton label={"Revert"} onClick={() => {openModal(); setRevertData(v)}}/></td>
                </tr>) }
              </tbody>
            </table>
          </div>
          <RevertModal open={open} onCancle={closeModal} revertData={revertData}/>
    </MainLayout>
  )
}

export default EditingHistory
