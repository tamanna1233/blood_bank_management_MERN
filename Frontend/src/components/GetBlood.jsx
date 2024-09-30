import React from 'react'
import img1 from '../assets/logo/bi_pencil-square.svg'

const GetBlood = () => {
  return (
    <div>
      <div className='border border-black p-16 my-16' >
        <h1 className='flex flex-col text-3xl font-bold text-center'>How to Get Blood</h1>
        <div className='flex flex-col items-center gap-16 border border-red-600 p-4 my-16'>
            {/* ============================================= */}
          <div className='flex flex-col  border border-blue-500 w-max '>
          <div className='flex flex-col  border border-black w-16  rounded-full text-center  p-4 relative '>
                <h1 >1</h1>
                <div className='bg-white rounded-full border border-black w-56 h-56  p-8
                  absolute '>
                    <div className='rounded-full'>
                        <img src={img1} alt="" className='w-16 m-auto '/>
                    </div>
                    <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing.</p>

                </div>
            </div>
          </div>
          </div>
{/* ========================================== */}
<div className='flex   justify-evenly items-center gap-8'>
<div className='flex flex-col  border border-blue-500 w-max '>
          <div className='flex flex-col  border border-black w-16  rounded-full text-center  p-4 relative '>
                <h1 >2</h1>
                <div className='bg-white rounded-full border border-black w-56 h-56  p-8
                  absolute '>
                    <div className='rounded-full'>
                        <img src={img1} alt="" className='w-16 m-auto '/>
                    </div>
                    <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing.</p>

                </div>
            </div>
          </div>
          {/* ========================================== */}

          <div className='flex flex-col  border border-blue-500 w-max '>
          <div className='flex flex-col  border border-black w-16  rounded-full text-center  p-4 relative '>
                <h1 >3</h1>
                <div className='bg-white rounded-full border border-black w-56 h-56  p-8
                  absolute '>
                    <div className='rounded-full'>
                        <img src={img1} alt="" className='w-16 m-auto '/>
                    </div>
                    <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing.</p>

                </div>
            </div>
          </div>

          </div>
          

       

      </div>
    </div>
  )
}

export default GetBlood
