import React, { useEffect, useState } from 'react'
import {useSelector} from  'react-redux'
import {useNavigate } from 'react-router-dom'
export default function Protected ({children,Authentication=true}) {
    const navigate =useNavigate()
    const [loader,setloader]=useState(true)
    // const userdata=useSelector(state=>state.auth.userData)
    const authStatus =useSelector (state=>state.auth.status )
    const userData=useSelector(state=>state.userData)
    console.log(userData)
    console.log("authstatus",authStatus)

    useEffect(()=>{
    if (Authentication && authStatus!== Authentication){

        navigate('/find_blood')
    }else if (!Authentication && authStatus !== Authentication ){
            navigate("/details")
    }
    setloader(false)
    },[authStatus,navigate,Authentication])
  return loader ? <h1>Loading...</h1> : <>{children}</>
}