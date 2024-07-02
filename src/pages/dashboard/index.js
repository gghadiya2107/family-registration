'use client';
import MainLayout from '@/layout/MainLayout'
import { verifyToken } from '@/network/actions/verityToken';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux';



const Dashboard = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('token')
	


  const validateToken = async () => {
    let body = {
      token : search || "",
      secret_key : process.env.NEXT_PUBLIC_SECRET_KEY,
      service_id : process.env.NEXT_PUBLIC_SERVICE_ID
    }
    if(search){
      dispatch(verifyToken(body,router))

    }
  }
  useLayoutEffect(() => {
  
    validateToken()
  }, [search]);
	
  return (
	<MainLayout>

<div className='comingSoon'>
        <h3>
        Coming Soon...
        </h3>
      </div>
	</MainLayout>
  )
}

export default Dashboard
