// components/InputFieldWithIcon.js

import React from "react";

import style from "./InputField.module.css";

const InputFieldWithIcon = ({ title, icon, placeholder, ...rest }) => {
  return (
    <div>
      <p className={style.title}>{title}</p>
      <div className={style.inputField}>
        <div className={style.icon}>{icon && icon}</div>
        <input className={style.input} placeholder={placeholder} {...rest} />
      </div>
    </div>
  );
};

export default InputFieldWithIcon;
