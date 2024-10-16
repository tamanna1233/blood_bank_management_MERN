import React from 'react';

function DonorList({ donor ,close}) {
  if (!donor || !donor.data || !Array.isArray(donor.data.donors)) {
    return(<div className='flex flex-col items-center mb-4'>
        <div className='text-center my-8'>donor not found</div>
          <button onClick={close} className='bg-black rounded-md p-4'>find another</button>

    </div> );
  }

  return (
    <div className='w-[60%] flex flex-col justify-center gap-y-4 my-8 py-8 bg-white rounded-xl items-center mx-auto'>
      {donor.data.donors.length > 0 ? (
        donor.data.donors.map((donorItem, index) => (
          <div
            key={index}
            className='flex flex-col border-b-2 bg-black text-white w-[80%] px-5 py-4 rounded-md gap-y-4'
          >
            <div className='flex justify-between'>
              <div>Name: {donorItem.name}</div>
              <div>Email: {donorItem.email}</div>
            </div>
            <div className='flex justify-between'>
              <div>Phone: {donorItem.phone}</div>
              <div>Address: {donorItem.address}</div>
            </div>
          </div>
        ))
      ) : (
        <div>Donor not available</div>
      )}

      <button onClick={close} className='bg-black rounded-md p-4'>find another</button>
    </div>
  );
}

export default DonorList;
