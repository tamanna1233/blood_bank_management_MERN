import React from 'react'
import  logo from "../assets/logo/blood.svg"
const Footer = () => {
  return (
    <div className='bg-base-200'>

<div className='flex justify-end w-full py-2 items-center px-8'>
<img src={logo} alt="" className='w-12'/>
<div className=''>
    <span className=' flex gap-x-3'> ready to get started ? <button className=' bg-[#991747] px-4 py-2 rounded-lg '>donate</button></span>
</div>

 
</div>
<hr  />
      <footer className="footer bg-base-200 text-base-content p-10">
        
  <aside>
    <img src={logo} alt="" className='w-24' />
    <p> all rights are reserved by aurpit and tamanna</p>
    
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
    </div>
  )
}

export default Footer
