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

const AddParivar = () => {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation('common');
    const [state, setState] = useState("1")
    const [formData, setFormData] = useState({
        village: "",
        makan: "",
        condition: "",
        bpl: "",

        mobile: "",
        rationCard: "",
        class: "",
        subclass: "",
    })

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };






    const handleChange = (e) => {
        const { value, name } = e.target
        setFormData({ ...formData, [name]: value })
    }
    return (
        <>
            {state == "1" ?
                <div style={{ marginTop: "20px" }}>
                    {/* <h1>{t('welcome')}</h1> */}
                    <div className={style.heading}>New Family</div>
                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={4} md={3}>
                            <SelectDropdown
                                title="Select Village"
                                name="village"
                                options={[
                                    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
                                    { value: "Shimla", label: "Shimla" },
                                ]}
                                value={formData?.village}
                                onChange={handleChange}
                                requried={false}
                            />
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <InputFieldWithIcon
                                title="मकान नम्बर"
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
                            <SelectDropdown
                                title="परिवार की आर्थिक स्थिति"
                                name="condition"
                                options={[
                                    { value: "poor", label: "Poor" },
                                    { value: "rich", label: "Rich" },
                                ]}
                                value={formData?.condition}
                                onChange={handleChange}
                                requried
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <InputFieldWithIcon
                                title="बी पी एल संख्या"
                                // icon={<IoIosDocument size={20} />}
                                placeholder=""
                                type="text"
                                name="bpl"
                                value={formData?.bpl}
                                onChange={handleChange}
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
                            <InputFieldWithIcon
                                title="परिवार का मोबाइल नंबर"
                                // icon={<IoIosDocument size={20} />}
                                placeholder=""
                                type="text"
                                name="mobile"
                                value={formData?.mobile}
                                onChange={handleChange}
                                requried
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <FileUpload
                                title="दस्तावेज़"
                                subTitle="(Declaration & Report)"
                                requried
                            />
                        </Grid>
                    </Grid>
                    <div className={style.save}>
                        <SubmitButton label="Save and Add HOF" onClick={() => setState("2")} />
                    </div>
                </div>
                : state == "2" ?

                    <div style={{ marginTop: "20px" }}>

                        <div className={style.heading}>Add HOF/member</div>
                        <Grid container spacing={3} >

                            <Grid item xs={12} sm={4} md={3}>
                                <InputFieldWithIcon
                                    title="मुखिया का नाम"
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
                                    title="मुखिया का नाम"
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
                        <div className={style.save}>
                            <SubmitButton label="Add member" onClick={handleClickOpen} />
                            <SubmitButton label="Proceed" onClick={() => setState(3)} style={{ marginLeft: "20px" }} />
                        </div>
                    </div>
                    :
                    <FamilyDetails />
            }

            <AddMemberModal handleClose={handleClose} open={open} />
        </>
    )
}

export default AddParivar
