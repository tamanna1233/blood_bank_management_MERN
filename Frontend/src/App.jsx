import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Mission from './components/Mission'
import Carousel from './components/Carousel'
import GetBlood from './components/GetBlood'
import Footer from './components/Footer'
import Donor_Register from './components/Donor_Register'
import Organization_register from './components/Organization_register'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Mission/>
      <Carousel/>
      <GetBlood/>

      <Footer/>
      <Donor_Register/>
<Organization_register/>
    </div>
  )
}

export default App
