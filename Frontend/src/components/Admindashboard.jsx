import React, { useEffect, useState } from 'react';
import { useAdminApi } from '../api/admin.api';
import { logout as authlogout } from '../App/slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Admindashboard = () => {
  const { donorlist, organizationlist, logout } = useAdminApi();
  const [donors, setDonors] = useState(null);
  const [organizations, setOrganizations] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch donor and organization data on mount
    const fetchData = async () => {
      try {
        const donorRes = await donorlist();
        const orgRes = await organizationlist();
        console.log(orgRes)
        setDonors(donorRes);
        setOrganizations(orgRes);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await logout();
      if (res.statusCode === 200) {
        console.log("logout")
        dispatch(authlogout());
        navigate('/admin_login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between py-4">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <button
          onClick={logoutHandler}
          className="bg-red-600 p-4 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Overview section */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded shadow-md">
          <h2 className="text-2xl">Total Donors</h2>
          <p className="text-xl mt-2">{donors?.data?.donors?.length || 0}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow-md">
          <h2 className="text-2xl">Total Organizations</h2>
          <p className="text-xl mt-2">
            {organizations?.data?.orgainzationList?.length || 0}
          </p>
        </div>
      </div>

      {/* Donor details */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Donor Details</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Donor Phone</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Blood Group</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Address</th>
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
              <th className="border p-2">Organization</th>
              <th className="border p-2">Contact</th>
              <th className="border p-2">Organization Head</th>
              <th className="border p-2">Address</th>
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
