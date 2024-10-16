import React from 'react'
import bgimg from '../assets/Background image/Ellipse 8.svg'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
    <div className='flex justify-between py-28'>
<div className='flex'>
<img src={bgimg} alt="" className=' w-[43%] absolute top-0 z-[-100]'/>
</div>
<div className='w-96 mr-2 sm:mr-8'>
    <h1 className='text-5xl font-bold pt-16 pb-4  '>Save life Donate Blood</h1>
    <p className='p-4'>Donating blood is a simple yet powerful way to save lives. Each donation can help multiple patients in need, from accident victims to those battling chronic illnesses. Your willingness to give blood not only contributes to vital medical supplies but also fosters a sense of community and compassion. Together, we can make a profound difference—one donation at a time.</p>
    <button className='bg-black hover:text-black hover:border border-black hover:bg-white text-white font-bold py-2 px-4 rounded-lg items-right shadow-2xl '><Link to='/find_blood'> Get Blood Now</Link></button>
</div>

      </div>


      </div>
  )
}

export default Home
