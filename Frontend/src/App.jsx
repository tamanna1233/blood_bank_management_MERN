import React from 'react'
import Navbar from './components/Navbar'

import Footer from './components/Footer'
import Donor_Register from './components/Donor_Register'
<<<<<<< HEAD
import Organization_register from './components/Organization_register'
=======
import { Outlet } from 'react-router-dom'
>>>>>>> c2790a5717d7f59772d4783a7c1336e9f6f9c625

const App = () => {
  return (
    <div>
      <Navbar/>
<<<<<<< HEAD
      <Home/>
      <Mission/>
      <Carousel/>
      <GetBlood/>

      <Footer/>
      <Donor_Register/>
<Organization_register/>
=======
      <Outlet/>
      {/* <Footer/> */}

>>>>>>> c2790a5717d7f59772d4783a7c1336e9f6f9c625
    </div>
  )
}

export default App
