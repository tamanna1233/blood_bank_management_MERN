import React from 'react'
import aboutUs from '../assets/Background image/aboutUs.png'

const AboutUs = () => {
  return (
    <div className='' style={{
        backgroundImage: `url(${aboutUs})`,backgroundRepeat:'no-repeat',backgroundSize: 'cover', height: '100vh',width: '100%',
      }} >

        <h1 className='text-2xl font-bold flex justify-center text-[#991747] py-3  '>About Us</h1>
        <hr />
        
            <div className='p-4 text-xl flex justify-center'>
        Welcome to  <b className='text-[#991747]'> Blood Bank</b> – your trusted platform for connecting life-saving blood donors with patients in need.
        </div>
<div>
<h1 className='font-bold text-xl text-[#991747] '>Who We Are</h1>
We are a dedicated team committed to making the process of donating and receiving blood easier, faster, and more reliable. Whether you're an individual donor or part of a healthcare organization, our mission is to bridge the gap between donors and those in urgent need of blood.
</div>
<div>
<h1 className='font-bold text-xl text-[#991747]' >How It Works</h1>
<li>
Donors can create an account, track their donation history, and be available when their blood type is required. Whenever a patient needs your help, you'll receive a direct request to connect.</li>
<li>
Patients can search for available donors based on location and blood type, ensuring that life-saving blood is just a click away.</li>
<li>
Organizations such as hospitals, blood banks, and NGOs can also register, making it easy for them to reach out to donors when supplies run low or in emergency situations.</li>
</div>
<div>
<h1 className='text-xl font-bold text-[#991747]'>Why Choose Us?</h1>
<li>
Convenience: We provide a seamless interface for donors to stay connected with patients in need, ensuring timely donations and minimizing delays.</li>
<li>
Safety and Reliability: Our platform verifies all users, ensuring a trusted and secure environment for both donors and patients.</li>
<li>
Accessibility: No matter where you are, our platform allows you to connect with people who need your help, making it easier than ever to donate and receive blood when it's needed most.
</li>
</div>
<div>
<h1 className='text-xl font-bold text-[#991747]'>Our Mission</h1>
We believe that no life should be lost due to a shortage of blood. Our mission is to ensure that anyone in need of blood can find a suitable donor quickly and effortlessly.
</div>
<div className='font-bold text-[#991747]' >
Join us today and help save lives. Because together, we can make a difference.
        </div>
    </div>
  )
}

export default AboutUs
