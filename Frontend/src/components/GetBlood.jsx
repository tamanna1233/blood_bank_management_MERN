import React from 'react'
// import img1 from '../assets/logo/bi_pencil-square.svg'
import img2 from '../assets/logo/pngwing 1.svg'
import { FaPenToSquare } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";

const GetBlood = () => {
  return (

<>
<div className='flex flex-col items-center justify-center border-black border  gap-12 py-8 flex-wrap'>
<span className='text-center font-bold font-serif text-3xl'>HOW TO GET BLOOD </span>

{/* first section */}
  <div className='flex justify-center  '>
    <div className='h-6 sm:h-10 w-6 sm:w-10 rounded-full border -z-10 bg-black border-black text-center translate-x-4 sm:translate-x-11 text-white font-bold'>1</div>
    <div className='w-20 md:w-52 h-20 md:h-52 border gap-y-2 bg-white border-black rounded-full flex flex-col items-center justify-center flex-wrap'>
    <FaPenToSquare size={35} className='text-red-500 w-6 sm:w-16' />
      <p className='text-[0.42rem] sm:text-xs text-center'>register your details</p>
    </div>
  </div>
{/* n */}
{/* second section */}
<div className=' flex justify-center items-center'>
  {/* second section first section */}
<div className='flex justify-center '>
<div className='h-6 sm:h-10 w-6 sm:w-10 rounded-full border -z-10 bg-black border-black text-center translate-x-4 sm:translate-x-11 text-white font-bold'>2</div>
    <div className='w-20 md:w-52 h-20 md:h-52 gap-y-2 bg-white border border-black rounded-full flex flex-col items-center justify-center  flex-wrap'>
    <FiCheckCircle  size={35} className='text-green-500 w-6 sm:w-16'/>
          <p className=' text-[0.42rem] sm:text-xs text-center'>verify you details</p>
    </div>
  </div>
  {/* second section second section */}
  <div>
    <img src={img2} alt="" />
  </div>
    {/* second section third section */}
    <div className='flex justify-center '>
    <div className='w-20 md:w-52 h-20 md:h-52  gap-y-2 border bg-white border-black rounded-full flex flex-col items-center justify-center flex-wrap'>
    <FaPenToSquare size={35} className='text-black w-6 sm: w-16'/>
      <p className='text-[0.42rem] sm:text-xs text-center'>login to the website</p>
    </div>
    <div className='h-6 sm:h-10 w-6 sm:w-10 rounded-full border -z-10 bg-black border-black text-center -translate-x-4 sm:-translate-x-11 text-white font-bold'>3</div>

  </div>
  </div>

</div>






</>
   
  )
}

export default GetBlood
