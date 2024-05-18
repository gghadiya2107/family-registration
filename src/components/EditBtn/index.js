import React from 'react'
import style from './editbtn.module.css'
import { FaClockRotateLeft } from "react-icons/fa6";


const EditBtn = ({ title, onClick, ...rest }) => {
    return (
        <div className={style.outer}  onClick={onClick}>
            <div>      <FaClockRotateLeft size={16}  style={{marginTop : "5px", marginRight : "7px"}}/>
            </div>
            <div  {...rest} className={style.more}>
                {title || "Edit"}
            </div>
        </div>
    )
}

export default EditBtn
