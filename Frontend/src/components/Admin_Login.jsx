import React from 'react'
import {useForm} from "react-hook-form"
import {useAdminApi} from "../api/admin.api"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as Authlogin } from '../App/slice'
const Admin_Login = () => {
    const  {register,handleSubmit}=useForm()
    const navigate=useNavigate()
    const dispatch=useDispatch()

const loginhandeler=async(data)=>{
console.log(data)

const {login}=useAdminApi()
await login(data).then((res)=>{
  console.log(res)
if(res.statusCode===200){
  toast.success(res.message)
dispatch(Authlogin(res))
 navigate("/admin_dashboard")
}
else{
  toast.error(res.message)
}

})
.catch((error)=>{
console.log(error)
})
}
 
  return (
    <div>
       <div className='flex   m-auto py-20 justify-center items-center gap-3'>
      <form className='bg-white m-auto p-4 rounded-xl shadow-xl  flex flex-col justify-center items-center' onSubmit={handleSubmit(loginhandeler)}>
        <h1 className='font-bold text-2xl  p-4'> Admin Login</h1>
        <input type="email" required placeholder='Enter your email address... ' className='p-1 border border-black  m-4 rounded-lg w-full' {...register("email")} />
        <input type="password" required placeholder='Enter your password... ' className='p-1 border border-black  m-4 rounded-lg w-full' {...register("password")}  />

        <button type='submit' className='bg-black text-white font-bold flex justify-center m-auto text-sm px-8 p-2 rounded-lg hover:bg-gray-300 hover:text-black hover:border border-black'>login</button>
      </form>
  
    </div>
    </div>
  )
}

export default Admin_Login
