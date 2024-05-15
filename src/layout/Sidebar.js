import React from 'react'
import style from "./layout.module.css"
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { IoDocumentsOutline } from "react-icons/io5";
import { BsPersonBoundingBox } from "react-icons/bs";
import { useRouter } from 'next/router';
import { IoLogOut } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";



const menu = [
    {
        title : "Registration",
        url : "/registration",
        icon : <IoMdPersonAdd size={20}/>
    },
    {
        title : "Modify / Edit",
        url : "/Update",
        icon : <FaUserEdit size={20}/>
    },
    {
        title : "Verifications",
        url : "/verification",
        icon : <MdVerifiedUser size={20}/>
    },
    {
        title : "Reports",
        url : "/reports",
        icon : <IoDocumentsOutline size={20}/>
    },
    {
        title : "Self eKYC",
        url : "/ekyc",
        icon : <BsPersonBoundingBox size={20}/>
    },
    {
        title : "Check Parivar Details",
        url : "/details",
        icon : <TbReportSearch size={20}/>
    },
]

const Sidebar = () => {
    const router = useRouter()
  return (
    <div className={style.sidebar} >
    
  <div className={style.outer}>
 <div>
 {menu?.map(v => (<>
   <div onClick={() => router.push(v?.url)} className={style.menu}>
    <div>{v?.icon}</div>
    <div className={style.menuTitle}>{v?.title}</div>
   </div>
   </>))}
 </div>
 <div>
 <div className={style.menu}>
    <div><IoLogOut size={21} style={{marginTop : "5px"}}/></div>
    <div className={style.menuTitle}>Logout</div>
   </div>
 <div className={style.menu}>
    <div><FaUserCircle size={20} style={{marginTop : "5px"}}/></div>
    <div className={style.menuTitle}>Login with Gaurang</div>
   </div>
 </div>
  </div>
  </div>
  )
}

export default Sidebar
