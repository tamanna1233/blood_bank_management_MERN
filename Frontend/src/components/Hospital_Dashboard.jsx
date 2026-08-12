import React, { useState, useEffect } from "react";
import { FiLogOut, FiActivity, FiClock, FiHeart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout as authLogout } from "../App/slice";
import toast from "react-hot-toast";
import { useWorkflowApi } from "../api/workflow.api";
import { useInventoryApi } from "../api/inventory.api";
import Details from "./Details";

const Hospital_Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [donationRequests, setDonationRequests] = useState([]);

  const { 
    getHospitalBloodRequests,
    updateHospitalBloodRequestStatus,
  } = useWorkflowApi();
  const { getHospitalInventory } = useInventoryApi();

  const [bloodRequests, setBloodRequests] = useState([]);
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const bRes = await getHospitalBloodRequests();
        if (bRes?.data?.requests) {
          setBloodRequests(bRes.data.requests);
        }

        const invRes = await getHospitalInventory();
        if (invRes?.data?.inventory) {
          setInventory(invRes.data.inventory);
        }
      } catch (error) {
        console.error("Failed to fetch requests", error);
      }
    };
    fetchRequests();
  }, []);

  const handleBloodRequestAction = async (id, status) => {
    const res = await updateHospitalBloodRequestStatus(id, status);
    if (res.statusCode === 200) {
      const msg =
        status === "APPROVED"
          ? "Request approved & inventory deducted!"
          : `Blood request marked as ${status}`;
      toast.success(msg);
      const newReqs = await getHospitalBloodRequests();
      setBloodRequests(newReqs?.data?.requests || []);
      // Refresh inventory so numbers stay in sync
      const invRes = await getHospitalInventory();
      if (invRes?.data?.inventory) setInventory(invRes.data.inventory);
    } else {
      toast.error(res.message || "Action failed");
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.post("/api/v1/hospital/logout", {}, { withCredentials: true });
      dispatch(authLogout());
      navigate("/hospital_login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      "O+": "#ef4444", "O-": "#dc2626", "A+": "#f97316", "A-": "#ea580c",
      "B+": "#eab308", "B-": "#ca8a04", "AB+": "#8b5cf6", "AB-": "#7c3aed",
    };
    return colors[bloodGroup] || "#6b7280";
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg p-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Hospital Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-error gap-2 hover:scale-105 transition-transform" disabled={loading}>
          <FiLogOut size={20} />
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8 mt-6">
        
       

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
                              onClick={() => handleBloodRequestAction(req._id, "APPROVED")}
                              className="btn btn-xs btn-success text-white"
                            >
                              Approve & Issue
                            </button>
                            <button
                              onClick={() => handleBloodRequestAction(req._id, "REJECTED")}
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
                  {bloodRequests.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-base-content/60">
                        No blood requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

         {/* Find a Donor (Details Component) */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <Details hideLogout={true} />
        </div>
      </div>
    </div>
  );
};

export default Hospital_Dashboard;
