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
import { Divider } from '@mui/material';
import { getImagePath } from '@/utils/CustomImagePath';
import Image from 'next/image';
import { removeCookie } from '@/utils/cookies';



const menu = [
    {
        title: "Registration",
        url: "/registration",
        icon: <IoMdPersonAdd size={20} />
    },
    {
        title: "Modify / Edit",
        url: "/update",
        icon: <FaUserEdit size={20} />
    },
    {
        title: "Verifications",
        url: "/verification",
        icon: <MdVerifiedUser size={20} />
    },
    {
        title: "Reports",
        url: "/reports",
        icon: <IoDocumentsOutline size={20} />
    },
    {
        title: "Self eKYC",
        url: "/ekyc",
        icon: <BsPersonBoundingBox size={20} />
    },
    {
        title: "Check Parivar Details",
        url: "/details",
        icon: <TbReportSearch size={20} />
    },
]

const Sidebar = () => {
    const router = useRouter()
    const currentPath = router.asPath;
    console.log('currentPath', currentPath)
    const logout = () => {

        removeCookie("userData");
        router.push("/")

    }
    return (
        <div className={style.sidebar} >
            <div className={style.topMenu}>
                <Image
                    src={getImagePath("/hp.png")}
                    width="45"
                    height="45"
                    alt="Himachal Pradesh Logo"

                    className={style.hpLogo}
                />
                <div className={style.title}>Family Register</div>
            </div>
            <Divider style={{ marginBottom: "7px" }} />
            <div className={style.outer}>
                <div>
                    {menu?.map(v => (<>
                        <div onClick={() => router.push(v?.url)} className={style.menu}
                            style={{ backgroundColor: currentPath?.includes(v?.url) ? "#F0F4F8" : "transperant", borderRadius: currentPath?.includes(v?.url) ? "4px" : "0px" }}
                        >
                            <div>{v?.icon}</div>
                            <div className={style.menuTitle}>{v?.title}</div>
                        </div>
                    </>))}
                </div>
                <div>
                    <Divider style={{ marginBottom: "7px" }} />
                    <div className={style.menu} onClick={logout}>
                        <div><IoLogOut size={21} style={{ marginTop: "5px" }} /></div>
                        <div className={style.menuTitle} >Logout</div>
                    </div>
                    <div className={style.menu}>
                        <div><FaUserCircle size={20} style={{ marginTop: "5px" }} /></div>
                        <div className={style.menuTitle}>Gaurang Ghadiya</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
