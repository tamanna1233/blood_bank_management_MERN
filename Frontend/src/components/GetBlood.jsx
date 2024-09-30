import React from 'react'
import img1 from '../assets/logo/bi_pencil-square.svg'
import img2 from '../assets/logo/pngwing 1.svg'
const GetBlood = () => {
  return (
    <div>
      <div className='border shadow-black   ' >
        <h1 className='flex  text-3xl font-bold text-center'>How to Get Blood</h1>
        <div className='flex flex-col items-center   p-4 my-24'>
            {/* ============================================= */}
          <div className='flex flex-wrap flex-col justify-center items-center   w-max '>
          <div className='flex flex-col  border-4 border-black w-16  rounded-full text-center  p-2 relative '>
                <h1 className='font-bold text-2xl' >1</h1>
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
<div className='flex  justify-center flex-wrap  items-center '>
<div className='flex    w-max '>
          <div className='flex flex-col  border-4 border-black   rounded-full text-center w-16 p-2 relative '>
                <h1 className='font-bold text-2xl' >2</h1>
                <div className='bg-white rounded-full border border-black w-56 h-56  p-8
                  absolute '>
                    <div className='rounded-full'>
                        <img src={img1} alt="" className='w-16 m-auto '/>
                    </div>
                    <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing.</p>

                </div>
            </div>
          </div>

          {/* /////////////////////////// */}

<div className=' flex  justify-center h-80 border border-black w-96 '>
    <img src={img2} alt=""  />
</div>

          {/* ========================================== */}

          <div className='flex   w-max '>
          <div className='flex flex-col  border-4 border-black w-16  rounded-full text-center  p-2 relative '>
                <h1 className='font-bold text-2xl'>3</h1>
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
