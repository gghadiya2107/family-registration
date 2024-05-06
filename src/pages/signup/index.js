import React from "react";
import style from "./Signup.module.css";
import Image from "next/image";
import InputFieldWithIcon from "@/components/InputFieldWithIcon";
import { AiFillBank } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import SubmitButton from "@/components/SubmitBtn";
import { useRouter } from "next/router";
import CancelBtn from "@/components/CancelBtn";

const SignUp = () => {
  const router = useRouter();

  return (
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
          <h5 className={style.title}>Parivar Register Signup</h5>

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
              label="Sign up"
              onClick={() => {}}
              style={{ width: "48%" }}
            />
            <CancelBtn
              label="Cancel"
              onClick={() => router.push("/login")}
              style={{ width: "48%" }}
            />
          </div>

          <hr className={style.divider} />

          <p onClick={() => router.push("/login")} className={style.headline}>
            Already have an account? Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
