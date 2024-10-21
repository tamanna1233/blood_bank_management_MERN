import React from 'react'
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import logo from "../assets/logo/blood.svg"
import {useForm} from "react-hook-form"
import { useOrgainzationApi } from '../api/Oraganization.api';
const Organization_register = () => {
 const {register,handleSubmit}=useForm()

const handelregister=async(data)=>{
 console.log(data)
 const {registerOrganization}=useOrgainzationApi()

 await registerOrganization(data).then((res)=>{
 console.log(res)
 })
}

  return (
    <div className='  justify-center w-[80%] mx-auto my-4  bg-gray-400 rounded-lg shadow-lg'>
       <div className='bg-[#6A0B37] w-full p-4 text-white font-bold text-2xl  rounded-t-lg'>
        <h1>Organization Register</h1>
      </div>
      <div className='w-full flex justify-center items-center'>
     
      <form className='p-6 w-full sm:w-3/4  ' onSubmit={handleSubmit(handelregister)}>
        <div className='flex flex-col gap-2'>   
            <label className='mb-1 text-sm font-medium text-gray-700'>Organization Name:</label>
            <input type="text" className='p-2 w-[50%] border border-gray-300 rounded-md focus:ring focus:ring-blue-500'
            placeholder='Enter Organization Name' {...register("organizationName")} />
            <label className='mb-1 text-sm font-medium text-gray-700 '>Address:</label>
            <textarea rows="4" 
                  cols="4" 
                  name=""
                  placeholder='enter address'
                  className='p-2 border border-gray-300 w-[50%] rounded-md focus:ring focus:ring-blue-500' {...register("location")}>

        </textarea>
            <label className='mb-1 text-sm font-medium text-gray-700 '>Head of Organization:</label>
            <input type="text" className='p-2  border border-gray-300 w-[50%] rounded-md focus:ring focus:ring-blue-500'
            placeholder=' Name' {...register("headName")}/>
            <label className='mb-1 text-sm font-medium text-gray-700'>Phone no. :</label>
            <input type="tel" className='p-2 w-[50%] border border-gray-300 rounded-md focus:ring focus:ring-blue-500'
            placeholder='Phone number' {...register("phoneno")} />


            {/* Submit Button */}
        <div className='flex justify-end'>
        <button type="submit" className="flex gap-2  p-2 bg-black text-white font-semibold rounded-md hover:bg-gray-700 transition">
          Submit  <FaRegCheckCircle className='' size={23}/>
        </button>
        </div>

        </div>
      </form>

      <div className='hidden sm:flex'>
      <img src={logo} alt=""  className='w-full -translate-x-32 -translate-y-14'/>
     </div>
      </div>
    

    </div>
  )
}

export default Organization_register
