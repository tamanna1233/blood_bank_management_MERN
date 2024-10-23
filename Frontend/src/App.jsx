import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import Footer from "./components/Footer"
import { useAdminApi } from './api/admin.api'
import { login } from './App/slice'
const App = () => {
  const dispatch =useDispatch()
  const userData=useSelector(state=>state.auth)
  console.log(userData)
  useEffect(()=>{
    const {currentuser}=useAdminApi()
    
    currentuser().then((res)=>{
      if(res.statusCode===200){
        console.log("hi",res)
        dispatch(login(res))
      }
      
    })
  },[])
  return (
    <div>
      <Toaster/>
      <Navbar/>
      <Outlet/>
      <Footer/>

    </div>
  )
}

export default App
