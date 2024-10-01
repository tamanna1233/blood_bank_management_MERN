import React from 'react'
import img1 from '../assets/logo/bi_pencil-square.svg'
import img2 from '../assets/logo/pngwing 1.svg'
import { FaPenToSquare } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";

const GetBlood = () => {
  return (

<>
<div className='flex flex-col items-center justify-center border-black border  gap-12 py-8 flex-wrap'>
<span className='text-center font-bold text-3xl'>HOW TO GET BLOOD </span>

{/* first section */}
  <div className='flex justify-center items-center'>
    <div className='w-20 md:w-52 h-20 md:h-52 border gap-y-2 border-black rounded-full flex flex-col items-center justify-center flex-wrap '>
    <FaPenToSquare size={35} />
      <p className='text-[0.42rem] sm:text-xs text-center'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
    </div>
  </div>

{/* second section */}
<div className=' flex justify-center'>
  {/* second section first section */}
<div className='flex justify-center items-center '>
    <div className='w-20 md:w-52 h-20 md:h-52 gap-y-2 border border-black rounded-full flex flex-col items-center justify-center  flex-wrap'>
    <FiCheckCircle  size={35}/>
          <p className=' text-[0.42rem] sm:text-xs text-center'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
    </div>
  </div>
  {/* second section second section */}
  <div>
    <img src={img2} alt="" />
  </div>
    {/* second section third section */}
    <div className='flex justify-center items-center'>
    <div className='w-20 md:w-52 h-20 md:h-52  gap-y-2 border border-black rounded-full flex flex-col items-center justify-center flex-wrap'>
    <FaPenToSquare size={35}/>
      <p className='text-[0.42rem] sm:text-xs text-center'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
    </div>
  </div>
  </div>

</div>






</>
   
  )
}

export default GetBlood

 // <div className=''>
    //   <div className='border shadow-black'>
    //     <h1 className='text-3xl font-bold text-center mb-8'>How to Get Blood</h1>

    //     {/* First Section */}
    //     <div className='flex flex-col items-center p-4'>
    //       <div className='flex flex-wrap flex-col items-center'>
    //         <div className='flex flex-col border-4 border-black w-16 rounded-full text-center p-2 relative'>
    //           <h1 className='font-bold text-2xl'>1</h1>
    //           <div className='bg-white rounded-full border border-black w-44 h-44 md:w-56 md:h-56 p-8 absolute -top-20 md:-top-24'>
    //             <div className='rounded-full'>
    //               <img src={img1} alt="" className='w-12 md:w-16 m-auto' />
    //             </div>
    //             <p className='text-sm text-center'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Second Section */}
    //     <div className='flex flex-col md:flex-row justify-center items-center gap-8 my-8'>
    //       <div className='flex flex-col items-center'>
    //         <div className='flex flex-col border-4 border-black bg-black rounded-full text-center w-16 p-2 relative'>
    //           <h1 className='font-bold text-2xl text-white'>2</h1>
    //           <div className='bg-white rounded-full border border-black w-44 h-44 md:w-56 md:h-56 p-8 absolute -top-20 md:-top-24'>
    //             <div className='rounded-full'>
    //               <img src={img1} alt="" className='w-12 md:w-16 m-auto' />
    //             </div>
    //             <p className='text-sm text-center'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Image */}
    //       <div className='flex justify-center'>
    //         <div className='hidden sm:flex'>
    //           <img src={img2} alt="" className='h-48 md:h-96' />
    //         </div>
    //       </div>

    //       {/* Third Section */}
    //       <div className='flex flex-col items-center'>
    //         <div className='flex flex-col border-4 border-black bg-black rounded-full text-center w-16 p-2 relative'>
    //           <h1 className='font-bold text-2xl text-white'>3</h1>
    //           <div className='bg-white rounded-full border border-black w-44 h-44 md:w-56 md:h-56 p-8 absolute -top-20 md:-top-24'>
    //             <div className='rounded-full'>
    //               <img src={img1} alt="" className='w-12 md:w-16 m-auto' />
    //             </div>
    //             <p className='text-sm text-center'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //   </div>
    // </div>