import React from "react";
import style from "./login.module.css";
import Image from "next/image";
import InputFieldWithIcon from "@/components/InputFieldWithIcon";
import { AiFillBank } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import SubmitBtn from "@/components/SubmitBtn";
import SubmitButton from "@/components/SubmitBtn";
import { useRouter } from "next/router";
import CancelBtn from "@/components/CancelBtn";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className={style.main}>
        <div className={style.card}>
          <div className={style.cardBody}>
            <div className={style.logo}>
              <Image
                src="/hp.png"
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
                icon={<AiFillBank size={20} />}
                placeholder="UserId"
                type="text"
              />
            </div>
            <div className={style.inputField}>
              <InputFieldWithIcon
                title="Enter Password"
                icon={<FaEye size={20} />}
                placeholder="Password"
                type="password"
              />
            </div>

            <div className={style.btns}>
              <SubmitButton
                label="Sign in"
                onClick={() => {}}
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
      <Footer />
    </>
  );
};

export default Login;
