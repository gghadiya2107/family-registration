'use client';
import React, { useEffect, useState } from 'react'
import AddMemberModal from './AddMemberModal'
import FamilyDetails from './FamilyDetails'
import NewFamily from './NewFamily'
import AddHOF from './AddHOF'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// export async function getStaticProps({ locale }) {
//     return {
//         props: { ...await serverSideTranslations(locale, ['translation']) }
//     }
// }


const AddParivar = () => {
    const [open, setOpen] = React.useState(false);
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
                <NewFamily setState={setState} />
                : state == "2" ?

                    <AddHOF setState={setState} handleClickOpen={handleClickOpen} />
                    :
                    <FamilyDetails />
            }

            <AddMemberModal handleClose={handleClose} open={open} />
        </>
    )
}

export default AddParivar
