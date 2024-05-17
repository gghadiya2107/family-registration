'use client';
import React, { useState } from "react";
import style from "./login.module.css";
import Image from "next/image";
import InputFieldWithIcon from "@/components/InputFieldWithIcon";
import { AiFillBank } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import SubmitButton from "@/components/SubmitBtn";
import { useRouter } from "next/router";
import CancelBtn from "@/components/CancelBtn";
import Layout from "@/layout";
import { getImagePath } from "@/utils/CustomImagePath";
import HeaderTwo from "@/components/Header/HeaderTwo";
import HeaderThree from "@/components/Header/HeaderThree";

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    userID: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("loginData", loginData);
  };
  return (
    <>
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
              <h5 className={style.title}>Parivar Register Login</h5>

              <div className={style.inputField}>
                <InputFieldWithIcon
                  title="Enter UserID"
                  name="userID"
                  icon={<AiFillBank size={20} />}
                  placeholder="UserId"
                  type="text"
                  onChange={handleChange}
                  value={loginData?.userID}
                />
              </div>
              <div className={style.inputField}>
                <InputFieldWithIcon
                  title="Enter Password"
                  name="password"
                  icon={<FaEye size={20} />}
                  placeholder="Password"
                  type="password"
                  onChange={handleChange}
                  value={loginData?.password}
                />
              </div>

              <div className={style.btns}>
                <SubmitButton
                  label="Sign in"
                  onClick={handleSubmit}
                  style={{ width: "48%" }}
                />
                <CancelBtn
                  label="Back to Home"
                  onClick={() => {}}
                  style={{ width: "48%" }}
                />
              </div>

              <hr className={style.divider} />

              <p
                onClick={() => router.push("/signup")}
                className={style.headline}
              >
                Don't have an account? Signup
              </p>
            </div>
          </div>
        </div>
        
      </Layout>
    </>
  );
};

export default Login;
