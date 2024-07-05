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
import SubmitButton from '@/components/SubmitBtn';
import CancelBtn from '@/components/CancelBtn';
import { Box } from '@mui/material';
import TextArea from '@/components/TextArea';
import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { editMember } from '@/network/actions/editMember';
import { getFamilyUpdationList } from '@/network/actions/getFamilyUpdationList';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function RevertModal({open, onCancle,revertData}) {
    const { t } = useTranslation("translation");
    const dispatch = useDispatch()
    const router = useRouter()

console.log("revertData",revertData)

    const [remarks, setRemarks] = useState("")
    const [upoadedDocument, setUpoadedDocument] = useState("")


const handleRevert = () => {
    let body = {
        documentFiles: upoadedDocument,
        memberUpdate: { "memberId": revertData?.memberId, "editTypeId": revertData?.editTypeId, "oldValue": revertData?.currentValue, "currentValue": revertData?.oldValue, "documentId": revertData?.documentId, remarks: remarks, familyId : revertData?.familyId }
      }
      const extra = () => {
        onCancle()
        dispatch(getFamilyUpdationList({family_id : revertData?.familyId}, router))
      }
      if(upoadedDocument){

          dispatch(editMember(body, extra))
      }else{
        toast.error("Please upload document.")
      }
    }
  return (
    <React.Fragment>
    
      <BootstrapDialog
        onClose={onCancle}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle> */}
        <IconButton
          aria-label="close"
          onClick={onCancle}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {/* <CloseIc/on /> */}
        </IconButton>
        <DialogContent dividers>
        <TextArea
        title={"Reason for Revision"}
                placeholder="Add reason..."
                name="remarks"
                value={remarks || ""}
                onChange={(e) => setRemarks(e.target.value)}

              />

<Box  mt={3}>
<FileUpload
title={t('uploadDocuments')}
requried
                name="dastavage"
                onChange={(e) => setUpoadedDocument(e.target.files?.[0])}
                accept="image/*,.pdf"

              />
</Box>
<Box mt={3} textAlign={"right"}>
          <SubmitButton label={"Cancel"} onClick={onCancle}/>
          <SubmitButton label={"Save"} style={{marginLeft : "10px"}} onClick={handleRevert}/>
</Box>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={onSubmit}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </React.Fragment>
  );
}
