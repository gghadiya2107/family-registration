import React from "react";
import style from "./Submit.module.css";

const SubmitButton = ({ label, onClick,type, ...rest }) => {
  return (
    <button onClick={onClick} style={{backgroundColor : type =="cancel" ? "#A04040": ""}} {...rest} className={style.signin}>
      {label}
    </button>
  );
};

export default SubmitButton;
