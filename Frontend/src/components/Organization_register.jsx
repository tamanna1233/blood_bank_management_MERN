import React from 'react'
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";

const Organization_register = () => {
  return (
    <div className='w-[80%] mx-auto p-6 bg-gray-100 rounded-lg shadow-lg'>
      <div className='bg-[#6A0B37] text-white font-bold text-2xl p-4'>
        <h1>Organization Register</h1>
      </div>
      <form className='p-6'>
        <div className='flex flex-col gap-2'>   
            <label className='mb-1 text-sm font-medium text-gray-700'>Organization Name:</label>
            <input type="text" className='p-2 w-[50%] border border-gray-300 rounded-md focus:ring focus:ring-blue-500'
            placeholder='Enter Organization Name' />
            <label className='mb-1 text-sm font-medium text-gray-700 '>Address:</label>
            <textarea rows="4" 
                  cols="4" 
                  name=""
                  placeholder='enter address'
                  className='p-2 border border-gray-300 w-[50%] rounded-md focus:ring focus:ring-blue-500'>

        </textarea>
            <label className='mb-1 text-sm font-medium text-gray-700 '>Head of Organization:</label>
            <input type="text" className='p-2  border border-gray-300 w-[50%] rounded-md focus:ring focus:ring-blue-500'
            placeholder=' Name' />
            <label className='mb-1 text-sm font-medium text-gray-700'>Phone no. :</label>
            <input type="tel" className='p-2 w-[50%] border border-gray-300 rounded-md focus:ring focus:ring-blue-500'
            placeholder='Phone number' />


            {/* Submit Button */}
        <div className='flex justify-end'>
        <button type="submit" className="flex gap-2 items-right p-2 bg-black text-white font-semibold rounded-md hover:bg-gray-700 transition">
          Submit  <FaRegCheckCircle className='' size={23}/>
        </button>
        </div>

        </div>
      </form>
    </div>
  )
}

export default Organization_register
