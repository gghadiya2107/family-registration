'use client';
import React, { useState } from "react";
import style from "./Signup.module.css";
import Image from "next/image";
import InputFieldWithIcon from "@/components/InputFieldWithIcon";
import { AiFillBank } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import SubmitButton from "@/components/SubmitBtn";
import { useRouter } from "next/router";
import CancelBtn from "@/components/CancelBtn";
import Layout from "@/layout";
import { Grid } from "@mui/material";
import { RiHomeOfficeFill } from "react-icons/ri";
import { SiHiveBlockchain } from "react-icons/si";
import { HiBuildingOffice } from "react-icons/hi2";
import { IoIosDocument } from "react-icons/io";
import { MdAddHomeWork } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

import { MdDriveFileRenameOutline } from "react-icons/md";
import SelectDropdown from "@/components/SelectDropdown";
import { getImagePath } from "@/utils/CustomImagePath";

const SignUp = () => {
  const router = useRouter();
  const [signUpData, setSignUpData] = useState({
    district : "",
    block: "",
    panchayat: "",
    aadhaar: "",
    name:"",
    designation: "",
    department : "",
    mobileNumber: "",
    userName:""

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("signUpData", signUpData);
  };

  return (
    <Layout>
      <div className={style.main}>
        <div className={style.card}>
          <div className={style.cardBody}>
            <div className={style.logo}>
              <Image
                src={getImagePath("/hp.png")}
                width={100}
                height={100}
                alt="Himachal Pradesh logo"
                className={style.logo}
              />
            </div>
            <h5 className={style.title}>Parivar Register Signup</h5>

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div className={style.inputField}>
                  <SelectDropdown
                    title="Select District"
                    name="district"
                    icon={<RiHomeOfficeFill size={20} />}
                    options={[
                      { value: "shimla", label: "Shimla" },
                    ]}
                    value={signUpData?.district}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={style.inputField}>
                  <SelectDropdown
                    title="Select Block"
                    name="block"
                    icon={<SiHiveBlockchain size={20} />}
                    options={[
                      { value: "A", label: "Block - A" },
                      { value: "B", label: "Block - B" },
                    ]}
                    value={signUpData?.block}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div className={style.inputField}>
                  <SelectDropdown
                    title="Select Panchayat"
                    name="panchayat"
                    icon={<HiBuildingOffice size={20} />}
                    options={[
                      { value: "Himachal Pradesh", label: "Himachal Pradesh" },
                    ]}
                    value={signUpData?.panchayat}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={style.inputField}>
                  <InputFieldWithIcon
                    title="Enter Aadhaar"
                    icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="text"
                    name="aadhaar"
                    value={signUpData?.aadhaar}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div className={style.inputField}>
                  <InputFieldWithIcon
                    title="Enter Name"
                    icon={<MdDriveFileRenameOutline size={20} />}
                    placeholder=""
                    type="text"
                    name="name"
                    value={signUpData?.name}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={style.inputField}>
                  <SelectDropdown
                    title="Select Designation"
                    icon={<MdAddHomeWork size={20} />}
                    options={[
                      { value: "develoepr", label: "Developer" },
                      { value: "consultant", label: "Consultant" },
                    ]}
                    name="designation"
                    value={signUpData?.Designation}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div className={style.inputField}>
                  <SelectDropdown
                    title="Select Department"
                    icon={<AiFillBank size={20} />}
                    options={[
                      { value: "react js", label: "ReactJs" },
                      { value: "node js", label: "NodeJs" },
                    ]}
                    value={signUpData?.department}
                    name="department"
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={style.inputField}>
                  <InputFieldWithIcon
                    title="Enter Mobile Numer"
                    icon={<BsFillTelephoneFill size={20} />}
                    placeholder=""
                    type="number"
                    name="mobileNumber"
                    value={signUpData?.mobileNumber}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div className={style.inputField}>
                  <InputFieldWithIcon
                    title="Enter Username"
                    icon={<FaUser size={20} />}
                    placeholder=""
                    type="text"
                    name="userName"
                    value={signUpData?.userName}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
            </Grid>

            <div className={style.btns}>
              <SubmitButton
                label="Sign up"
                onClick={handleSubmit}
                style={{ width: "15%" }}
              />{" "}
              &nbsp;&nbsp;&nbsp;
              <CancelBtn
                label="Cancel"
                onClick={() => router.push("/login")}
                style={{ width: "15%" }}
              />
            </div>

            <hr className={style.divider} />

            <p onClick={() => router.push("/login")} className={style.headline}>
              Already have an account? Login
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
