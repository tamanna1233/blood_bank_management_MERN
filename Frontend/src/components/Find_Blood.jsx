import React from 'react'

const Find_Blood = () => {
  return (
    <div className=' m-auto py-24 flex justify-center items-center gap-4'>
      <div className='bg-white m-auto p-4 rounded-xl shadow-xl  flex flex-col justify-center items-center'>
        <h1 className='font-bold text-2xl text-center p-4'>Registration</h1>
        <p className='p-4'>An OTP will be sent to your mobile number for verification</p>
        <input type="tel" required placeholder='Enter your mobile number ' className='p-1 border border-black  m-4 rounded-lg w-full' />
        <button type='submit' className='bg-black text-white font-bold flex justify-center m-auto text-sm px-8 p-2 rounded-lg hover:bg-gray-300 hover:text-black hover:border border-black'>Get OTP</button>
      </div>
    </div>
  )
}

export default Find_Blood
