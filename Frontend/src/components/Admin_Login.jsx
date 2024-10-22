import React, { useState } from 'react'

const Admin_Login = () => {
    const [email,setemail] =useState()
    const [password,setpassword] =useState()
  return (
    <div>
       <div className='flex   m-auto py-20 justify-center items-center gap-3'>
      <div className='bg-white m-auto p-4 rounded-xl shadow-xl  flex flex-col justify-center items-center'>
        <h1 className='font-bold text-2xl  p-4'> Admin Login</h1>
        <input type="email" required placeholder='Enter your email address... ' className='p-1 border border-black  m-4 rounded-lg w-full'  onChange={(e)=>setemail(e.target.value)} />
        <input type="password" required placeholder='Enter your password... ' className='p-1 border border-black  m-4 rounded-lg w-full'  onChange={(e)=>setpassword(e.target.value)} />

        <button type='submit' className='bg-black text-white font-bold flex justify-center m-auto text-sm px-8 p-2 rounded-lg hover:bg-gray-300 hover:text-black hover:border border-black'>login</button>
      </div>
  
    </div>
    </div>
  )
}

export default Admin_Login
