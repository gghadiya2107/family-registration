import React, { useState } from 'react'
import SelectDropdown from '@/components/SelectDropdown'
import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import SubmitButton from '@/components/SubmitBtn'
import FileUpload from '@/components/FileUpload'
import DatePicker from '@/components/DatePicker'
import TextArea from '@/components/TextArea'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const AddMemberModal = ({handleClose, open}) => {
    const [formData, setFormData] = useState({
        village : "",
        makan : "",
        condition : "",
        bpl : "",

        mobile: "",
        rationCard : "",
        class : "",
        subclass : "",
    })

    const handleChange = (e) => {
const {value, name} = e.target
setFormData({...formData, [name] : value})
}
  return (
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Member
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
        <DialogContent dividers>
        <Grid container spacing={3} >
           
           <Grid item xs={12} sm={4} md={3}>
               <InputFieldWithIcon 
                   title="सदस्य का नाम"
                   subTitle="(in English)"
                   // icon={<IoIosDocument size={20} />}
                   placeholder=""
                   type="text"
                   name="makan"
                   value={formData?.makan}
                   onChange={handleChange}
                   requried
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
           <InputFieldWithIcon 
                   title="सदस्य का नाम"
                   subTitle="(in Hindi)"
                   // icon={<IoIosDocument size={20} />}
                   placeholder=""
                   type="text"
                   name="makan"
                   value={formData?.makan}
                   onChange={handleChange}
                   requried
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
               <InputFieldWithIcon 
                   title="संबंधी का नाम एवं संबंध"
                   // icon={<IoIosDocument size={20} />}
                   placeholder=""
                   type="text"
                   name="bpl"
                   value={formData?.bpl}
                   onChange={handleChange}
                   requried
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
               <DatePicker
               title="जन्म तिथि"
               type="date"
               requried
               name="bpl"
               value={formData?.bpl}
                   onChange={handleChange}
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
           <SelectDropdown 
               title="लिंग"
               name="class"
               options={[
                 { value: "poor", label: "Poor" },
                 { value: "rich", label: "Rich" },
               ]}
               value={formData?.class}
               onChange={handleChange}
               requried
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
           <SelectDropdown 
               title="दर्ज करने का आधार"
               name="class"
               options={[
                 { value: "poor", label: "Poor" },
                 { value: "rich", label: "Rich" },
               ]}
               value={formData?.class}
               onChange={handleChange}
               requried
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
               <InputFieldWithIcon 
                   title="रेफ़्रेन्स नंबर"
                   // icon={<IoIosDocument size={20} />}
                   placeholder=""
                   type="text"
                   name="bpl"
                   value={formData?.bpl}
                   onChange={handleChange}
                   requried
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
           <SelectDropdown 
               title="शैक्षिक योग्यता"
               name="class"
               options={[
                 { value: "poor", label: "Poor" },
                 { value: "rich", label: "Rich" },
               ]}
               value={formData?.class}
               onChange={handleChange}
               requried
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
           <SelectDropdown 
               title="आजीविका का साधन"
               name="class"
               options={[
                 { value: "poor", label: "Poor" },
                 { value: "rich", label: "Rich" },
               ]}
               value={formData?.class}
               onChange={handleChange}
               requried
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
           <SelectDropdown 
               title="वर्ग"
               name="class"
               options={[
                 { value: "poor", label: "Poor" },
                 { value: "rich", label: "Rich" },
               ]}
               value={formData?.class}
               onChange={handleChange}
               requried
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
               <InputFieldWithIcon 
                   title="उप-वर्ग"
                   // icon={<IoIosDocument size={20} />}
                   placeholder=""
                   type="text"
                   name="sabClass"
                   value={formData?.subclass}
                   onChange={handleChange}
                   requried
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
               <InputFieldWithIcon 
                   title="राशन कार्ड नंबर"
                   // icon={<IoIosDocument size={20} />}
                   placeholder=""
                   type="text"
                   name="rationCard"
                   value={formData?.rationCard}
                   onChange={handleChange}
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
           <SelectDropdown 
               title="धर्म"
               name="class"
               options={[
                 { value: "poor", label: "Poor" },
                 { value: "rich", label: "Rich" },
               ]}
               value={formData?.class}
               onChange={handleChange}
               requried
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
               <InputFieldWithIcon 
                   title="आधार कार्ड नंबर"
                   // icon={<IoIosDocument size={20} />}
                   placeholder=""
                   type="number"
                   name="rationCard"
                   value={formData?.rationCard}
                   onChange={handleChange}
               />
           </Grid>
           <Grid item xs={12} sm={4} md={3}>
               <FileUpload 
               title="दस्तावेज़"
               subTitle="(Bonafide Himachal)"
               requried
               />
           </Grid> 
           <Grid item xs={24} sm={8} md={6}>
               <TextArea 
               title="टिपण्णी"
               placeholder="Text area"
               
               />
           </Grid> 
           
         
           </Grid>
        </DialogContent>
        <DialogActions>
          <SubmitButton onClick={handleClose} label="Save" />
           
        </DialogActions>
      </BootstrapDialog>
  )
}

export default AddMemberModal
