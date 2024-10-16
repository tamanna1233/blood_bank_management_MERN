import React from 'react'
import  logo from "../assets/logo/blood.svg"
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='bg-gray-300 text-black'>

<div className='flex justify-end w-full py-2 items-center px-8'>
<img src={logo} alt="" className='w-12'/>
<div className=''>
    <span className=' flex  items-center gap-x-3'> ready to get started ? <button className=' bg-[#991747] text-white font-bold px-4 py-2 rounded-lg '><Link to='/Donor_Register'>Donate Blood</Link></button></span>
</div>

 
</div>
<hr  />
      <footer className="footer bg-gray-400  p-10 text-black">
        
  <aside>
    <img src={logo} alt="" className='w-24' />
    <p> all rights are reserved by aurpit and tamanna</p>
    
  </aside>
  <nav className='flex flex-col justify-center'>
    <h6 className=" text-black text-2xl">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav className='flex flex-col justify-center'>
    <h6 className=" text-black text-2xl">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav className='flex flex-col justify-center'>
    <h6 className=" text-black text-2xl">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
    </div>
  )
}

export default Footer
