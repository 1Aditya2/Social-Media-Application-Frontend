import React, { useEffect } from 'react'

import Navbar from '../../Components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getMyProfile } from '../../Redux/Slices/AppConfigSlice'

function Home() {
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getMyProfile())
  },[])
  
  return (
    <>
    <Navbar/>
    <div className="outlet" style={{marginTop:'60px'}}>
    <Outlet/>
    </div>
    
    </>
  )
}

export default Home