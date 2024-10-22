import React, { useEffect, useState } from 'react';
import { useAdminApi } from '../api/admin.api';

const Admindashboard = () => {
  const { donorlist, organizationlist } = useAdminApi();
  const [donors, setDonors] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  // Fetch donor and organization data when the component mounts
  useEffect(() => {
    donorlist().then((res) => {
      console.log('Donors:', res);
      setDonors(res);
    });

    organizationlist().then((res) => {
      console.log('Organizations:', res);
      setOrganizations(res);
    });
  }, []); // Add dependencies for better useEffect behavior

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Overview section */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded shadow-md">
          <h2 className="text-2xl">Total Donors</h2>
          <p className="text-xl mt-2">{donors?.data?.donors?.length}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow-md">
          <h2 className="text-2xl">Total Organizations</h2>
          <p className="text-xl mt-2">{organizations?.data?.orgainzationList?.length}</p>
        </div>
      </div>

      {/* Donor details */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Donor Details</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Donor PHONE</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Blood Group</th>
              <th className="border p-2">EMAIL</th>
              <th className="border p-2">ADDRESS</th>

            </tr>
          </thead>
          <tbody>
            {donors?.data?.donors?.map((donor) => (
              <tr key={donor._id}>
                <td className="border p-2">{donor.phone}</td>
                <td className="border p-2">{donor.name}</td>
                <td className="border p-2">{donor.bloodType}</td>
                <td className="border p-2">{donor.email}</td>
                <td className="border p-2">{donor.address}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Organization details */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Organization Details</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ORGANIZATION</th>
              <th className="border p-2">CONTACT</th>
              <th className="border p-2">ORGAINZATION HEAD</th>
              <th className="border p-2">ADDRESS</th>
            </tr>
          </thead>
          <tbody>
            {organizations?.data?.orgainzationList?.map((org) => (
              <tr key={org._id}>
                <td className="border p-2">{org.orgainzationName}</td>
                <td className="border p-2">{org.phoneno}</td>
                <td className="border p-2">{org.headName}</td>
                <td className="border p-2">{org.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admindashboard;
