import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Mission from './components/Mission'
import Carousel from './components/Carousel'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Mission/>
      <Carousel/>

      <Footer/>
    </div>
  )
}

export default App
