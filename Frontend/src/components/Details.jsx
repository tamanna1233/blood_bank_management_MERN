import React, { useState } from 'react'

import logo from '../assets/logo/blood.svg'
import { useForm } from 'react-hook-form'
import { usepatientApi } from '../api/patient.api'
import Donorlist from './Donorlist'
import { useDispatch } from 'react-redux'
import { logout as authlogout } from '../App/slice'
import { useNavigate } from 'react-router-dom'
const Details = () => {
 const {register,handleSubmit}=useForm()
 const [donor ,setdonor ]=useState()
 const {findBlood,logout}=usepatientApi()
const navigate =useNavigate()
 const requesthandeler=(data)=>{
console.log(data)

findBlood(data).then((res)=>{
  console.log(res)
  setdonor(res)

})


 }

 if(donor){
  return(
    <Donorlist donor={donor}  close={()=>setdonor(0)}/>
  )
 }
 const dispatch=useDispatch()
 const logouthandel=()=>{
  console.log("click")
  logout().then((res)=>{
    console.log(res)
if(res.statusCode===200){
  dispatch(authlogout())
  navigate("/")
  
}

  })
 }

  return (<div>
    <div className='flex justify-end'>
    <button className='bg-red-500 px-6 py-2 rounded-md mx-7 'onClick={logouthandel} >logout</button>

    </div>
    <div className='p-8 flex justify-center w-[60%] mx-auto  my-8  bg-gray-300 rounded-lg shadow-lg shadow-gray-700'> 
        <div className=' hidden sm:flex h-96   '>
            <img src={logo} alt="" />
        </div>
        
      <div className='w-[100%] sm:w-[50%]'>
      <h1 className=' flex flex-col items-center font-bold text-xl text-black p-2'>Recipient details </h1> <br />
        <form action="" className='flex flex-col' onSubmit={handleSubmit(requesthandeler)}>
        <label htmlFor="">Blood Type</label>
        <select name="" id="" className='border border-black rounded-lg m-1  ' {...register("bloodType") }>
            <option value="">Select Blood Type</option>
            <option value="A_pos">A_pos</option>
            <option value="A_neg">A_neg</option>
            <option value="B_pos">B_pos</option>
            <option value="B_neg">B_neg</option>
            <option value="B_neg">AB_neg</option>
            <option value="AB_pos">AB_pos</option>
            <option value="O_pos">O_pos</option>
            <option value="O_neg">O_neg</option>
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
        <input type="text" name="" id="" className='border border-black rounded-lg m-1 hover:border-blue-600'{...register("address")} />
        <label htmlFor="">District</label>
        <input type="text" name="" id="" className='border border-black rounded-lg m-1 hover:border-blue-600' />
           </div>
           <button className='bg-black text-white text-lg font-bold rounded-lg mx-auto px-2 p-1 hover:bg-gray-500 hover:border border-black'>Proceed</button>
        </form>
        {/* <div className="join join-vertical  border border-black rounded-2xl lg:join-horizontal ">
  <button className="hover:bg-black hover:text-white rounded-2xl p-1 active:bg-black">Blood Donors</button>
  <button className="hover:bg-black hover:text-white  rounded-2xl p-1 active:bg-black">Blood Banks</button>
</div> */}
      </div>
    </div>
    </div>
  )
}

export default Details
