import React, { useState } from 'react';
import { usepatientApi } from '../api/patient.api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../App/slice';

const OtpInput = ({email,onclose}) => {
  const [otp, setOtp] = useState(new Array(4).fill(""));

  // Function to handle input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to the next input box if a digit is entered
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("Entered OTP: " + otp.join(""));
    // You can send the OTP to your server here
  };
  const navigate=useNavigate()
const dispstch=useDispatch()
const verify=()=>{
  const {verifyPatient}=usepatientApi()
const Otp=otp.join("")
console.log(email,Otp)
  verifyPatient(email,Otp).then((res)=>{
    console.log(res)
    if(res.statusCode===200){
      toast.success(res.message)
   onclose()
   dispstch(login(res))

 navigate("/details")
    }
    else{
      toast.error(res.message)
}  })

}
  return (
    <div className="flex justify-center py-20 items-center bg-transparent">
      <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white p-6 rounded shadow-md">
      <h1 className='font-bold text-2xl'>OTP Verification</h1>

        <h3 className="text-lg font-semibold mb-4 text-center">An OTP has been send to <br />
       {email}</h3>
        <div className="flex space-x-2 mb-4">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors" onClick={verify}
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpInput;
