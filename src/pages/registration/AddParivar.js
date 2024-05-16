import React, { useState } from 'react'
import style from "./registration.module.css"
import { Grid } from '@mui/material'
import SelectDropdown from '@/components/SelectDropdown'
import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import useTranslation from 'next-translate/useTranslation';
import SubmitButton from '@/components/SubmitBtn'
import FileUpload from '@/components/FileUpload'
import DatePicker from '@/components/DatePicker'
import TextArea from '@/components/TextArea'
import AddMemberModal from './AddMemberModal'
import KeyValueDetails from '@/components/KeyValueDetails'

import Table from '@mui/material/Table';
import FamilyDetails from './FamilyDetails'
import NewFamily from './NewFamily'
import AddHOF from './AddHOF'

const AddParivar = () => {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation('common');
    const [state, setState] = useState("1")
  

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };






  
    return (
        <>
            {state == "1" ?
                <NewFamily setState={setState}/>
                : state == "2" ?

                  <AddHOF setState={setState} handleClickOpen={handleClickOpen}/>
                    :
                    <FamilyDetails  />
            }

            <AddMemberModal handleClose={handleClose} open={open} />
        </>
    )
}

export default AddParivar
