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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ViewMemberData({ onSubmit, onCancle, open, data }) {
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
                            <KeyValueDetails title="Name" value={data?.memberName} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title="Birth Date" value={data?.date_of_birth} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title="Aadhar No." value={FormatAadharNumber(data?.aadhaarNo || "")} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title="Gender" value={data?.gender} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title="Profession" value={data?.profession} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title="Qualification" value={data?.qualification} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title="Ration Card No." value={data?.rationCardNo} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title="Category" value={data?.socialCategory} />
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
