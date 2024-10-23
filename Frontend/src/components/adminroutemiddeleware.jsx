import React, { useEffect, useState } from 'react'
import {useSelector} from  'react-redux'
import {useNavigate } from 'react-router-dom'
export default function Protected ({children,Authentication=true}) {
    const navigate =useNavigate()
    const [loader,setloader]=useState(true)
    // const userdata=useSelector(state=>state.auth.userData)
    const authStatus =useSelector (state=>state.auth.status )
    // console.log("authstatus",authStatus)
  const userdata = useSelector(state=>state.userData)
  console.log(userdata)
    useEffect(()=>{
    if (Authentication && authStatus!== Authentication){
        navigate('/admin_login')
    }else if (!Authentication && authStatus !== Authentication ){
            navigate("/admin_dashboard")
    }
    setloader(false)
    },[authStatus,navigate,Authentication])
  return loader ? <h1>Loading...</h1> : <>{children}</>
}