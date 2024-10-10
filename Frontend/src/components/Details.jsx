import React from 'react'

import logo from '../assets/logo/blood.svg'
const Details = () => {
  return (
    <div className='p-8 flex justify-center w-[80%] mx-auto  my-8  bg-gray-300 rounded-lg shadow-lg shadow-gray-700'>
        <div className=' hidden sm:flex h-96   '>
            <img src={logo} alt="" />
        </div>
        
      <div className='w-[100%] sm:w-[50%]'>
      <h1 className=' flex flex-col items-center font-bold text-xl text-black p-2'>Recipient details </h1> <br />
        <form action="" className='flex flex-col'>
        <label htmlFor="">Blood Type</label>
        <select name="" id="" className='border border-black rounded-lg m-1  '>
            <option value="">Select Blood Type</option>
            <option value="">A+</option>
            <option value="">A-</option>
            <option value="">B+</option>
            <option value="">B-</option>
            <option value="">AB+</option>
            <option value="">AB-</option>
            <option value="">O+</option>
            <option value="">O-</option>
            </select>
<br />
            {/* ======current location ==== */}
            {/* <button className='bg-black text-white  font-bold text-xl  rounded-xl p-1  w-[50%] mx-auto hover:bg-gray-500 hover:border border-black'>Current Location</button> */}
            <br />
            {/* <hr /> */}
            {/* <h1 className='text-center'>OR</h1> */}
            {/* <hr />  */}
           <div className='flex flex-col m-2'>
           <label htmlFor="">State</label>
        <input type="text" name="" id="" className='border border-black rounded-lg m-1 hover:border-blue-600' />
        <label htmlFor="">District</label>
        <input type="text" name="" id="" className='border border-black rounded-lg m-1 hover:border-blue-600' />
           </div>
           <button className='bg-black text-white text-lg font-bold rounded-lg mx-auto px-2 p-1 hover:bg-gray-500 hover:border border-black'>Proceed</button>
        </form>
        <div className="join join-vertical  border border-black rounded-2xl lg:join-horizontal ">
  <button className="hover:bg-black hover:text-white rounded-2xl p-1 active:bg-black">Blood Donors</button>
  <button className="hover:bg-black hover:text-white  rounded-2xl p-1 active:bg-black">Blood Banks</button>
</div>
      </div>
    </div>
  )
}

export default Details
