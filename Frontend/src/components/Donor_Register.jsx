import React, { useState } from 'react';
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";

const Donor_Register = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    age: '',
    bloodGroup: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    password:'',
    agreement: false
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

const data={
  name:`${formData.firstName} ${formData.lastName}`,
  age: formData.age,
  phone:formData.phone,
  email:formData.email,
  location:`address:${formData.addressLine1} city:${formData.city} state:${formData.state} zip:${formData.zip} country:${formData.country}`,
  bloodType:formData.bloodGroup,
  password:formData.password
}
console.log( data)

  return (
    
    <div className="w-2/3 mx-auto my-8 bg-gray-100 rounded-lg shadow-lg">
        <div className='bg-[#6A0B37] text-white text-2xl rounded-t-lg font-bold p-4 '>
            <h1>Register as Donor</h1>
        </div>
      <form className="space-y-6 px-4 sm:px-12">
        
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-1 text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="p-2 border w-auto border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="mb-1 text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
          </div>
        </div>
        
        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 text-sm font-medium text-gray-700">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
        </div>

        {/* Age and Blood Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="age" className="mb-1 text-sm font-medium text-gray-700">Age</label>
            <input type="number" id="age"  min="18" max="60" name="age" value={formData.age} onChange={handleChange} className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bloodGroup" className="mb-1 text-sm font-medium text-gray-700">Blood Group</label>
            <select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" value={formData.password} className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"/>
        </div>

        {/* Address Summary */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1 text-sm font-medium text-gray-700">Address</label>
            <input type="text" id="addressLine1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="city" className="mb-1 text-sm font-medium text-gray-700">City</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="state" className="mb-1 text-sm font-medium text-gray-700">State</label>
              <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="zip" className="mb-1 text-sm font-medium text-gray-700">Zip Code</label>
              <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="mb-1 text-sm font-medium text-gray-700">Country</label>
              <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center justify-center">
          <input type="checkbox" id="agreement" name="agreement" checked={formData.agreement} onChange={handleChange} className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" required />
          <label htmlFor="agreement" className="ml-2 text-sm text-gray-700">Accept our term and condition</label>
        </div>

        {/* Input Type Summary */}
        <div className="p-4 mt-4 bg-blue-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Entered detail</h3>
          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          <p><strong>Blood Group:</strong> {formData.bloodGroup}</p>
          <p><strong>Address:</strong> {formData.addressLine1}, {formData.city}, {formData.state}, {formData.zip}, {formData.country}</p>
          <p><strong>Agreement:</strong> {formData.agreement ? "Agreed" : "Not Agreed"}</p>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end py-2'>
       {formData.agreement?
        <button type="submit"  className="flex gap-2 items-right p-2 bg-black text-white font-semibold rounded-md hover:bg-gray-700 transition">
          Submit  <FaRegCheckCircle className='' size={23}/>
        </button> : <button type="submit" disabled  className="flex gap-2 items-right p-2 bg-white border border-black  text-black font-semibold rounded-md hover:bg-gray-700 transition cursor-not-allowed">
          Submit  <FaRegCheckCircle className='' size={23}/>
        </button> }
        </div>
      </form>
    </div>
  );  
};

export default Donor_Register;





// import React from 'react';

// const ResponsiveForm = () => {
//   return (
//     <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
//       <form className="space-y-6">
        
//         {/* Name Row */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="flex flex-col">
//             <label htmlFor="firstName" className="mb-1 text-sm font-medium text-gray-700">First Name</label>
//             <input type="text" id="firstName" name="firstName" className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="lastName" className="mb-1 text-sm font-medium text-gray-700">Last Name</label>
//             <input type="text" id="lastName" name="lastName" className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
//           </div>
//         </div>
        
//         {/* Phone Number */}
//         <div className="flex flex-col">
//           <label htmlFor="phone" className="mb-1 text-sm font-medium text-gray-700">Phone Number</label>
//           <input type="tel" id="phone" name="phone" className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
//         </div>

//         {/* Email */}
//         <div className="flex flex-col">
//           <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">Email Address</label>
//           <input type="email" id="email" name="email" className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
//         </div>


//         {/*Address   */}
//         <div className="flex flex-col">
//             <label htmlFor="address" className="mb-1 text-sm font-medium text-gray-700">Adress</label>
//             <input type="summary" id="firstName" name="address" className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
//           </div>
        
//         {/* Age and Blood Group */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="flex flex-col">
//             <label htmlFor="age" className="mb-1 text-sm font-medium text-gray-700">Age</label>
//             <input type="number" id="age" name="age" className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
//           </div>
//           <div className="flex flex-col">
//           <label htmlFor="bloodGroup" className="mb-1 text-sm font-medium text-gray-700">Blood Group</label>
//             <select id="bloodGroup" name="bloodGroup" className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required>
//               <option value="">Select Blood Group</option>
//               <option value="A+">A+</option>
//               <option value="A-">A-</option>
//               <option value="B+">B+</option>
//               <option value="B-">B-</option>
//               <option value="AB+">AB+</option>
//               <option value="AB-">AB-</option>
//               <option value="O+">O+</option>
//               <option value="O-">O-</option>
//             </select>
//           </div>
//         </div>
        
//         {/* District */}
//         <div className="flex flex-col">
//           <label htmlFor="district" className="mb-1 text-sm font-medium text-gray-700">District</label>
//           <input type="text" id="district" name="district" className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
//         </div>
        
//         {/* State and Pin Code */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="flex flex-col">
//             <label htmlFor="state" className="mb-1 text-sm font-medium text-gray-700">State</label>
//             <input type="text" id="state" name="state" className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="pinCode" className="mb-1 text-sm font-medium text-gray-700">Pin Code</label>
//             <input type="text" id="pinCode" name="pinCode" className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500" required />
//           </div>
//         </div>

//          {/* Checkbox in the center */}
//          <div className="flex items-center justify-center">
//           <input type="checkbox" id="agreement" name="agreement" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" required />
//           <label htmlFor="agreement" className="ml-2 text-sm text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit.</label>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="w-full p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResponsiveForm;
