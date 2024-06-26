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
import { Box, Grid } from '@mui/material';
import KeyValueDetails from '@/components/KeyValueDetails';
import FormatAadharNumber from '@/utils/formatAadharNumber';
import formatDate from '@/utils/formatDate';
import { useTranslation } from 'react-i18next';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ViewMemberData({ onSubmit, onCancle, open, data }) {
    const { t } = useTranslation("translation");

    console.log('data', data)

    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={onCancle}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                maxWidth={"sm"}
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

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('name')} value={data?.memberName} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('ralativeName')} value={data?.relativeName} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('birthDate')} value={formatDate(data?.date_of_birth)} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('aadhaarNo')} value={FormatAadharNumber(data?.aadhaarNo || "")} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('gender')} value={data?.gender} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('profession')} value={data?.profession} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('qualification')} value={data?.qualification} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('rationCardNo')} value={data?.rationCardNo} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('category')} value={data?.socialCategory} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('remark')} value={data?.remarks} />
                        </Grid>
                      {data?.socialSubCategory && <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('subCategory')} value={data?.socialSubCategory} />
                        </Grid>}
                      
                      {data?.religion && <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('religion')} value={data?.religion} />
                        </Grid>}
                      
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('referanceNo')} value={data?.reference_no} />
                        </Grid>
                        
                    </Grid>
                    <Box style={{ textAlign: "center" }} mt={4}>
                        <SubmitButton label="Cancel" onClick={onCancle} />
                        <SubmitButton label="Edit Member" onClick={onSubmit} style={{ marginLeft: "10px" }} />
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
