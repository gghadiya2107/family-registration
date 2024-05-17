import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import style from "./layout.module.css"


const MainLayout = ({children}) => {
  const [test, settest] = useState(false)

  useEffect(() => {
    settest(true)
}, [])
  return (
    test && <>

      <div className={style.container}>
      <Sidebar />
      
      {/* Main content */}
      <div className={style.mainContent}>
      {children}
      </div>
    </div>
    </>
  )
}

export default MainLayout
