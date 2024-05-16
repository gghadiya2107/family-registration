import React from 'react';
import style from "./Dropdown.module.css"
const SelectDropdown = ({ options, value, onChange,icon, title ,requried, ...rest}) => {
  return (
    <div>
    <p className={style.title}>{title}{requried && <span className="requried"> *</span>}</p>
    <div className={style.inputField}>
      <select value={value} onChange={onChange} className={style.input} {...rest}>
      {options.map(option => (
        <option key={option.value} value={option.value} >
          {option.label}
        </option>
      ))}
    </select>
    </div>
  </div>


   
  );
};

export default SelectDropdown;