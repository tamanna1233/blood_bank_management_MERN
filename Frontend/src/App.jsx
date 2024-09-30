import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Mission from './components/Mission'
import Carousel from './components/Carousel'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Mission/>
      <Carousel/>
    </div>
  )
}

export default App
