import React from 'react'
import Sidebar from './Sidebar'
import style from "./layout.module.css"


const MainLayout = ({children}) => {
  return (
    <>
    {/* <Sidebar />
       */}

      <div className={style.container}>
      {/* Include the Sidebar component */}
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
