import React, { useState } from 'react'
import OtpInput from './Otp_Verification'
import {usepatientApi} from "../api/patient.api"
import toast from 'react-hot-toast'
const Register = () => {
const [email ,setemail]=useState()
const [popUpvisible,isPopUpVisible]=useState(false)
 console.log(email)
 const hadelregister=()=>{

  const {loginPatient}=usepatientApi()
  loginPatient(email).then((res)=>{
    console.log(res)
    if(res.statusCode===200){
      isPopUpVisible(true)
      toast.success(res.message)
      
    } else {
      isPopUpVisible(false); // Ensure popup hides if registration fails
      toast.error(res.message);
    }

  }).catch((error)=>{
    console.log(error)
  })
 
 

 }

  return (<>
  
{
  popUpvisible?<OtpInput email={email} onclose={()=>isPopUpVisible(false)}/> :


    <div className=' m-auto py-20 flex justify-center items-center gap-4'>
      <div className='bg-white m-auto p-4 rounded-xl shadow-xl  flex flex-col justify-center items-center'>
        <h1 className='font-bold text-2xl text-center p-4'>Registration</h1>
        <p className='p-4'>An OTP will be sent to your email for verification</p>
        <input type="email" required placeholder='Enter your email address... ' className='p-1 border border-black  m-4 rounded-lg w-full'  onChange={(e)=>setemail(e.target.value)} />
        <button type='submit' className='bg-black text-white font-bold flex justify-center m-auto text-sm px-8 p-2 rounded-lg hover:bg-gray-300 hover:text-black hover:border border-black' onClick={hadelregister}>Get OTP</button>
      </div>
  
    </div> }
  
    
    </>



  )
}

export default Register
