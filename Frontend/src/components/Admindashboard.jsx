import React, { useEffect, useState } from "react";
import { useAdminApi } from "../api/admin.api";
import { logout as authlogout } from "../App/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { FiLogOut, FiUsers, FiBriefcase, FiDroplet } from "react-icons/fi";

const Admindashboard = () => {
  const { donorlist, organizationlist, logout } = useAdminApi();
  const [donors, setDonors] = useState(null);
  const [organizations, setOrganizations] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Chart data states
  const [bloodGroupData, setBloodGroupData] = useState([]);
  const [donorStatsData, setDonorStatsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donorRes = await donorlist();
        const orgRes = await organizationlist();
        setDonors(donorRes);
        setOrganizations(orgRes);

        // Process blood group data
        const bloodGroups = {};
        donorRes?.data?.donors?.forEach((donor) => {
          const bg = donor.bloodType || "Unknown";
          bloodGroups[bg] = (bloodGroups[bg] || 0) + 1;
        });

        const bgData = Object.entries(bloodGroups).map(([name, value]) => ({
          name,
          value,
          fill: getBloodGroupColor(name),
        }));
        setBloodGroupData(bgData);

        // Process donor stats
        const statsData = [
          {
            name: "Total Donors",
            value: donorRes?.data?.donors?.length || 0,
            fill: "#dc2626",
          },
          {
            name: "Organizations",
            value: orgRes?.data?.orgainzationList?.length || 0,
            fill: "#0284c7",
          },
          {
            name: "Active",
            value: Math.floor((donorRes?.data?.donors?.length || 0) * 0.8),
            fill: "#10b981",
          },
        ];
        setDonorStatsData(statsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      "O+": "#ef4444",
      "O-": "#dc2626",
      "A+": "#f97316",
      "A-": "#ea580c",
      "B+": "#eab308",
      "B-": "#ca8a04",
      "AB+": "#8b5cf6",
      "AB-": "#7c3aed",
    };
    return colors[bloodGroup] || "#6b7280";
  };

  const logoutHandler = async () => {
    try {
      const res = await logout();
      if (res.statusCode === 200) {
        dispatch(authlogout());
        navigate("/admin_login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
        <div className="max-w-7xl mx-auto p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-primary-content/80 mt-1">
              Blood Bank Management System
            </p>
          </div>
          <button
            onClick={logoutHandler}
            className="btn btn-error gap-2 hover:scale-105 transition-transform"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-gradient-to-br from-primary to-primary-dark shadow-lg hover:shadow-xl transition-shadow">
            <figure className="px-6 pt-6">
              <div className="bg-primary-content/10 rounded-full p-4">
                <FiUsers size={32} className="text-white" />
              </div>
            </figure>
            <div className="card-body items-center text-center text-white">
              <h2 className="text-xl font-semibold">Total Donors</h2>
              <p className="text-4xl font-bold">
                {donors?.data?.donors?.length || 0}
              </p>
              <p className="text-sm opacity-80">Registered donors</p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-secondary to-secondary-dark shadow-lg hover:shadow-xl transition-shadow">
            <figure className="px-6 pt-6">
              <div className="bg-secondary-content/10 rounded-full p-4">
                <FiBriefcase size={32} className="text-white" />
              </div>
            </figure>
            <div className="card-body items-center text-center text-white">
              <h2 className="text-xl font-semibold">Organizations</h2>
              <p className="text-4xl font-bold">
                {organizations?.data?.orgainzationList?.length || 0}
              </p>
              <p className="text-sm opacity-80">Registered organizations</p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-accent to-accent-dark shadow-lg hover:shadow-xl transition-shadow">
            <figure className="px-6 pt-6">
              <div className="bg-accent-content/10 rounded-full p-4">
                <FiDroplet size={32} className="text-white" />
              </div>
            </figure>
            <div className="card-body items-center text-center text-white">
              <h2 className="text-xl font-semibold">Blood Groups</h2>
              <p className="text-4xl font-bold">{bloodGroupData.length}</p>
              <p className="text-sm opacity-80">Types available</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Blood Group Distribution */}
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-primary">
                Blood Group Distribution
              </h2>
              <div className="h-80">
                {bloodGroupData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bloodGroupData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {bloodGroupData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => value} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-base-content/50">
                    No blood group data available
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Statistics Overview */}
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-primary">System Statistics</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={donorStatsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#dc2626" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Donor Details Table */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">Donor Details</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th>Phone</th>
                    <th>Name</th>
                    <th>Blood Group</th>
                    <th>Email</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {donors?.data?.donors?.map((donor) => (
                    <tr
                      key={donor._id}
                      className="hover:bg-base-200 transition-colors"
                    >
                      <td className="font-medium">{donor.phone}</td>
                      <td>{donor.name}</td>
                      <td>
                        <div
                          className="badge badge-lg"
                          style={{
                            backgroundColor: getBloodGroupColor(
                              donor.bloodType,
                            ),
                            color: "white",
                          }}
                        >
                          {donor.bloodType}
                        </div>
                      </td>
                      <td>{donor.email}</td>
                      <td className="text-sm">{donor.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Organization Details Table */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">
              Organization Details
            </h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th>Organization</th>
                    <th>Contact</th>
                    <th>Organization Head</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations?.data?.orgainzationList?.map((org) => (
                    <tr
                      key={org._id}
                      className="hover:bg-base-200 transition-colors"
                    >
                      <td className="font-medium">{org.orgainzationName}</td>
                      <td>{org.phoneno}</td>
                      <td>{org.headName}</td>
                      <td className="text-sm">{org.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
