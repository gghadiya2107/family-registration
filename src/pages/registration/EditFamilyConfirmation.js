import CancelBtn from '@/components/CancelBtn';
import SubmitButton from '@/components/SubmitBtn'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled } from '@mui/material'
import React from 'react'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const EditFamilyConfirmation = ({nameTitle,memberList, setMemberList, handleClose, open, data, EditModalType,setIsEditMode, setisEditModeHead}) => {
  const changeMemberList = () => {
    // setisEditModeMember(true);
     handleClose()

    let data1 = [...memberList]
    let newData = data1?.map(v => data?.EnglishName == v?.EnglishName ? {...v, isEditModeMember:true } : {...v, isEditModeMember:false } )
    setMemberList(newData)
  }
  return (
    <>
       <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Edit Family
      </DialogTitle>
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
      <DialogContent dividers style={{fontSize : "18px"}}>
        {EditModalType == "family" &&<div>

        <p >Are you sure you want to edit the Family residing in:</p>
        <p style={{margin : "10px 0"}}><b>Municipality:</b> <>{nameTitle?.municipal}</></p>
        <p><b>Ward:</b> <>{nameTitle?.ward}</></p>
        </div>}
        {EditModalType == "head" &&<div>

        <p >Are you sure you want to edit the Family residing in:</p>
        <p style={{margin : "10px 0"}}><b>Municipality:</b> <>{nameTitle?.municipal}</></p>
        <p><b>Ward:</b> <>{nameTitle?.ward}</></p>
        <p style={{marginTop : "10px"}}><b>With the Head of Family as:</b> <>{data?.EnglishName}</></p>
        </div>}
        {EditModalType == "member" &&<div>

        <p >Are you sure you want to edit the details of</p>
        <p style={{marginBottom : "10px"}}> <b>{data?.EnglishName}</b></p>
        <p><>with Aadhaar Number</> </p>
        <b>{data?.adharCard}</b>
        </div>}
      </DialogContent>
      <DialogActions>
       {EditModalType == "family" &&<> <CancelBtn  onClick={() => {setIsEditMode(false); handleClose()}} label="Cancel" />
        <SubmitButton onClick={() => {setIsEditMode(true); handleClose()}} style={{marginLeft : "10px",borderRadius : "4px"}} label="Confirm" /></>}
        {EditModalType == "head" &&<><CancelBtn  onClick={() => {setisEditModeHead(false); handleClose()}} label="Cancel" />
        <SubmitButton onClick={() => {setisEditModeHead(true); handleClose()}} style={{marginLeft : "10px",borderRadius : "4px"}} label="Confirm" /></>}
        {EditModalType == "member" &&<><CancelBtn  onClick={() => {setisEditModeMember(false); handleClose()}} label="Cancel" />
        <SubmitButton onClick={() => {changeMemberList()}} style={{marginLeft : "10px",borderRadius : "4px"}} label="Confirm" /></>}

      </DialogActions>
    </BootstrapDialog>
    </>
  )
}

export default EditFamilyConfirmation
