import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import style from "./layout.module.css"
import { useRouter } from 'next/router'
import { Box, CircularProgress } from '@mui/material'
import Loader from '@/utils/Loader'
import { IoMenu } from "react-icons/io5";
import { useLoading } from '@/utils/LoadingContext'

const MainLayout = ({ children }) => {
  const router = useRouter()
  const { loading } = useLoading();

  const [test, settest] = useState(false)
  const [loading1, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth< 768 ? false :true)
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    settest(true)
  }, [])

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);


  return (
    test && <>

      <div className={style.container}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {/* Main content */}

        <div
          //  className={style.mainContent}
          className={`content ${isSidebarOpen ? 'content-shift' : ''}`}>

         {windowWidth < 768 && <header style={{
            background: "white", margin: "-20px", marginBottom: "20px", height: "40px", backgroundColor: "#FBFCFE",
            borderBottom: "1px solid #D7DBDC", display: "flex", alignItems: "center"
          }}>
            <div style={{ marginLeft: "10px" }}>
              <IoMenu size={22} cursor={"pointer"} onClick={toggleSidebar} />

            </div>
          </header>}
{loading && <Loader />}
          {loading1 ? <Loader /> : children}

          {/* {children} */}
        </div>
      </div>
    </>
  )
}

export default MainLayout
