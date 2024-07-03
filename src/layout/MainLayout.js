import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import style from "./layout.module.css"
import { useRouter } from 'next/router'
import { Box, CircularProgress } from '@mui/material'
import Loader from '@/utils/Loader'


const MainLayout = ({children}) => {
  const router = useRouter()
  const [test, settest] = useState(false)
  const [loading, setLoading] = useState(false);


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
      <Sidebar />
      
      {/* Main content */}
      <div className={style.mainContent}>
      {loading ? <Loader /> : children}

      {/* {children} */}
      </div>
    </div>
    </>
  )
}

export default MainLayout
