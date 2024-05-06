import React from "react";
import style from "./Submit.module.css";

const SubmitButton = ({ label, onClick, ...rest }) => {
  return (
    <button onClick={onClick} {...rest} className={style.signin}>
      {label}
    </button>
  );
};

export default SubmitButton;
