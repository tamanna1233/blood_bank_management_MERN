import React, { useEffect, useState } from "react";
import { useAdminApi } from "../api/admin.api";
import { useInventoryApi } from "../api/inventory.api";
import { useWorkflowApi } from "../api/workflow.api";
import toast from "react-hot-toast";
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
  const { donorlist, hospitallist, logout, updateHospitalStatus, deleteDonor, deleteHospital } = useAdminApi();
  const [donors, setDonors] = useState(null);
  const [hospitals, setHospitals] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [donationRequests, setDonationRequests] = useState([]);
  const [bloodRequests, setBloodRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getInventory } = useInventoryApi();
  const {
    getDonationRequests,
    getBloodRequests,
    updateDonationStatus,
    updateBloodRequestStatus,
  } = useWorkflowApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Chart data states
  const [bloodGroupData, setBloodGroupData] = useState([]);
  const [donorStatsData, setDonorStatsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donorRes = await donorlist();
        const hospitalRes = await hospitallist();
        const invRes = await getInventory();
        console.log(invRes);
        const donReqRes = await getDonationRequests();
        const bloodReqRes = await getBloodRequests();

        setDonors(donorRes);
        setHospitals(hospitalRes);
        setInventory(invRes?.data?.inventory || []);
        setDonationRequests(donReqRes?.data?.requests || []);
        setBloodRequests(bloodReqRes?.data?.requests || []);

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
            name: "Hospitals",
            value: hospitalRes?.data?.hospitalList?.length || 0,
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

  const handleDonationAction = async (id, status) => {
    const res = await updateDonationStatus(id, status);
    if (res.statusCode === 200) {
      toast.success(`Donation marked as ${status}`);
      // Quick refresh trick for now
      const newReqs = await getDonationRequests();
      setDonationRequests(newReqs?.data?.requests || []);
      const newInv = await getInventory();
      setInventory(newInv?.data?.inventory || []);
    } else {
      toast.error(res.message || "Action failed");
    }
  };

  const handleHospitalAction = async (id, status) => {
    const res = await updateHospitalStatus(id, status);
    if (res.statusCode === 200) {
      toast.success(`Hospital marked as ${status}`);
      const newHospitals = await hospitallist();
      setHospitals(newHospitals);
    } else {
      toast.error(res.message || "Action failed");
    }
  };


  const handleBloodRequestAction = async (id, status) => {
    const res = await updateBloodRequestStatus(id, status);
    if (res.statusCode === 200) {
      const msg =
        status === "APPROVED"
          ? "Request approved & inventory deducted!"
          : `Request marked as ${status}`;
      toast.success(msg);
      const newReqs = await getBloodRequests();
      setBloodRequests(newReqs?.data?.requests || []);
      // Always refresh inventory so numbers stay in sync
      const newInv = await getInventory();
      setInventory(newInv?.data?.inventory || []);
    } else {
      toast.error(res.message || "Action failed");
    }
  };

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
              <h2 className="text-xl font-semibold">Hospitals</h2>
              <p className="text-4xl font-bold">
                {hospitals?.data?.hospitalList?.length || 0}
              </p>
              <p className="text-sm opacity-80">Registered hospitals</p>
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

        {/* Blood Inventory Section */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">
              Blood Inventory Status
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {inventory && inventory.length > 0 ? (
                inventory.map((inv) => (
                  <div
                    key={inv._id}
                    className={`card border ${inv.availableUnits <= inv.minimumStockLevel ? "border-error bg-error/10" : "border-base-300"} p-4 text-center`}
                  >
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: getBloodGroupColor(inv.bloodGroup) }}
                    >
                      {inv.bloodGroup}
                    </h3>
                    <p className="text-3xl font-bold mt-2">
                      {inv.availableUnits}{" "}
                      <span className="text-sm font-normal opacity-70">
                        Units
                      </span>
                    </p>
                    {inv.availableUnits <= inv.minimumStockLevel && (
                      <div className="badge badge-error mt-2 font-semibold">
                        Low Stock
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-4 text-base-content/60">
                  No inventory data found.
                </div>
              )}
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

        {/* Hospital Details Table */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">Hospital Details</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th>Hospital Name</th>
                    <th>Contact</th>
                    <th>Contact Person</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals?.data?.hospitalList?.map((org) => (
                    <tr
                      key={org._id}
                      className="hover:bg-base-200 transition-colors"
                    >
                      <td className="font-medium">{org.hospitalName}</td>
                      <td>{org.phone}</td>
                      <td>{org.contactPerson}</td>
                      <td className="text-sm">{org.address}</td>
                      <td>
                        <span
                          className={`badge ${org.status === "APPROVED" ? "badge-success" : org.status === "PENDING" ? "badge-warning" : "badge-error"}`}
                        >
                          {org.status}
                        </span>
                      </td>
                      <td>
                        {org.status === "PENDING" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleHospitalAction(org._id, "APPROVED")}
                              className="btn btn-xs btn-success text-white"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleHospitalAction(org._id, "REJECTED")}
                              className="btn btn-xs btn-error text-white"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Donation Requests Table */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">Donation Requests</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th>Donor Name</th>
                    <th>Blood Type</th>
                    <th>Preferred Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donationRequests.map((req) => (
                    <tr key={req._id}>
                      <td className="font-medium">
                        {req.donor?.name || "Unknown"}
                      </td>
                      <td>
                        <span
                          className="badge badge-lg"
                          style={{
                            backgroundColor: getBloodGroupColor(
                              req.requestedBloodType,
                            ),
                            color: "white",
                          }}
                        >
                          {req.requestedBloodType}
                        </span>
                      </td>
                      <td>
                        {new Date(req.preferredDate).toLocaleDateString()}
                      </td>
                      <td>
                        <span
                          className={`badge ${req.status === "COMPLETED" ? "badge-success" : req.status === "PENDING" ? "badge-warning" : "badge-neutral"}`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td>
                        {req.status === "PENDING" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleDonationAction(req._id, "APPROVED")
                              }
                              className="btn btn-xs btn-success text-white"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleDonationAction(req._id, "REJECTED")
                              }
                              className="btn btn-xs btn-error text-white"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {req.status === "APPROVED" && (
                          <button
                            onClick={() =>
                              handleDonationAction(req._id, "COMPLETED")
                            }
                            className="btn btn-xs btn-primary"
                          >
                            Mark Completed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Blood Requests Table */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">Blood Requests</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-error text-white">
                    <th>Requester</th>
                    <th>Blood Group</th>
                    <th>Units</th>
                    <th>Urgency</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodRequests.map((req) => (
                    <tr key={req._id}>
                      <td>
                        <div className="font-bold">{req.requesterType}</div>
                        <div className="text-sm opacity-70">
                          {req.requesterType === "Hospital"
                            ? req.hospital?.hospitalName
                            : req.patient?.name}
                        </div>
                      </td>
                      <td>
                        <span
                          className="badge badge-lg"
                          style={{
                            backgroundColor: getBloodGroupColor(req.bloodGroup),
                            color: "white",
                          }}
                        >
                          {req.bloodGroup}
                        </span>
                      </td>
                      <td className="font-bold">{req.unitsRequired}</td>
                      <td>
                        <span
                          className={`badge ${req.urgency === "EMERGENCY" ? "badge-error" : req.urgency === "URGENT" ? "badge-warning" : "badge-info"}`}
                        >
                          {req.urgency}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            req.status === "ISSUED" || req.status === "COMPLETED"
                              ? "badge-success"
                              : req.status === "PENDING"
                              ? "badge-warning"
                              : req.status === "REJECTED" || req.status === "CANCELLED"
                              ? "badge-error"
                              : "badge-neutral"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td>
                        {req.status === "PENDING" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleBloodRequestAction(req._id, "APPROVED")
                              }
                              className="btn btn-xs btn-success text-white"
                            >
                              Approve & Issue
                            </button>
                            <button
                              onClick={() =>
                                handleBloodRequestAction(req._id, "REJECTED")
                              }
                              className="btn btn-xs btn-error text-white"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {(req.status === "ISSUED" || req.status === "COMPLETED") && (
                          <span className="text-success text-xs font-semibold">✓ Issued ({req.issuedUnits} units)</span>
                        )}
                      </td>
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
