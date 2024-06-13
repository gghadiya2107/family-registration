import MainLayout from '@/layout/MainLayout'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const EditMember = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({})

    useEffect(() => {
        if(router?.query?.state){
            const stateObject = JSON.parse(router?.query?.state) || "";
            setUserData(stateObject)
            router.replace(router.pathname)
        }      
    }, [router])
    

    

  return (
    <MainLayout>
      skjfsfh 
    </MainLayout>
  )
}

export default EditMember
