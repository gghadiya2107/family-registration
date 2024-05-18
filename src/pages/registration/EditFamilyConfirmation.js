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

const EditFamilyConfirmation = ({handleClose, open}) => {
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
        <p >Are you sure you want to edit the Family residing in:</p>
        <p style={{margin : "10px 0"}}><b>Municipality:</b> <>Shimla</></p>
        <p><b>Ward:</b> <>Mehli</></p>
      </DialogContent>
      <DialogActions>
        <CancelBtn  onClick={handleClose} label="Cancel" />
        <SubmitButton onClick={() => {}} style={{marginLeft : "10px",borderRadius : "4px"}} label="Confirm" />

      </DialogActions>
    </BootstrapDialog>
    </>
  )
}

export default EditFamilyConfirmation
