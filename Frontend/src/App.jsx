import React from 'react'
import Navbar from './components/Navbar'
import Mission from './components/Mission'
import Carousel from './components/Carousel'
import GetBlood from './components/GetBlood'
import Footer from './components/Footer'
import Donor_Register from './components/Donor_Register'
<<<<<<< HEAD
import Organization_register from './components/Organization_register'
import { Outlet } from 'react-router-dom'
import Home from './components/Home'
import Find_Blood from './components/Find_Blood'
=======
import { Outlet } from 'react-router-dom'
>>>>>>> 8d9b5e141a36906a81b6ffd1f7a900ed944b26da

const App = () => {
  return (
    <div>
      <Navbar/>
<<<<<<< HEAD
      <Home/>
      <Mission/>
      <Carousel/>
      <GetBlood/>
       {/* <Find_Blood/> */}
      <Footer/>
      <Donor_Register/>
<Organization_register/>
<Find_Blood/>
=======
>>>>>>> 8d9b5e141a36906a81b6ffd1f7a900ed944b26da
      <Outlet/>
      <Footer/>

    </div>
  )
}

export default App
