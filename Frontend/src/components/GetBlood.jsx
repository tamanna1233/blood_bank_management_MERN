import React from 'react'
import img1 from '../assets/logo/bi_pencil-square.svg'

const GetBlood = () => {
  return (
    <div>
      <div className='border border-black p-8' >
        <h1 className='text-3xl font-bold text-center'>How to Get Blood</h1>
        <div className='border border-red-600 p-4'>
          <div className='border border-blue-500'>
          <div className='border border-black w-16  rounded-full text-center  p-4 relative'>
                <h1 >1</h1>
                <div className='bg-white rounded-full border border-black w-96  absolute'>
                    <div>
                        <img src={img1} alt="" className='h-[20%] w-[20%]'/>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>

                </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default GetBlood
