import React from 'react'
import style from './datePicker.module.css'

const DatePicker = ({title,subTitle,type,requried,placeholder, ...rest}) => {
  return (
    <div>
    <p className={style.title}>{title}<span className={style.subtitle}> {subTitle}</span>{requried && <span className="requried"> *</span>}</p>
    <div className={style.inputField}>
      {/* <div className={style.icon}>{icon && icon}</div> */}
      <input className={style.input} type='date'  placeholder={placeholder} {...rest} />
    </div>
  </div>
  )
}

export default DatePicker
