import React from 'react'
import Navbar from './components/Navbar'
import Mission from './components/Mission'
import Carousel from './components/Carousel'
import GetBlood from './components/GetBlood'
import Footer from './components/Footer'
import Donor_Register from './components/Donor_Register'
import Organization_register from './components/Organization_register'
import Home from './components/Home'
import Find_Blood from './components/Find_Blood'
import { Outlet } from 'react-router-dom'
import OtpInput from './components/Otp_Verification'
import Details from './components/Details'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Toaster/>
      <Navbar/>
      {/* <Home/>
      <Mission/>
      <Carousel/>
      <GetBlood/>
    <Donor_Register/> 
 <Organization_register/> 
<Find_Blood/> */}
      <Outlet/>
      <Footer/>
      <OtpInput/>
      <Details/>

    </div>
  )
}

export default App
