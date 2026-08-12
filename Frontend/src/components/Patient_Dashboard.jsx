import React, { useState } from "react";
import { FiLogOut, FiActivity, FiDroplet } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usepatientApi } from "../api/patient.api";
import { logout as authLogout } from "../App/slice";
import toast from "react-hot-toast";
import axios from "axios";

const Patient_Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = usepatientApi();
  const [bloodType, setBloodType] = useState("O_pos");
  const [units, setUnits] = useState(1);
  const [urgency, setUrgency] = useState("NORMAL");
  const [medicalReason, setMedicalReason] = useState("");
  const [requiredDate, setRequiredDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [myRequests, setMyRequests] = useState([]);

  React.useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("/api/v1/workflow/request-blood/patient", { withCredentials: true });
        if (res.data?.statusCode === 200) {
          setMyRequests(res.data.data.requests);
        }
      } catch (error) {
        console.error("Failed to fetch requests", error);
      }
    };
    fetchRequests();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(authLogout());
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleRequestBlood = async (e) => {
    e.preventDefault();
    if (!requiredDate || !medicalReason) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/workflow/request-blood/patient", {
        bloodGroup: bloodType,
        unitsRequired: units,
        urgency,
        medicalReason,
        requiredDate
      }, { withCredentials: true });
      if (res.data?.statusCode === 201) {
        toast.success("Blood request submitted! Awaiting admin approval.");
        setMedicalReason("");
        setRequiredDate("");
        setUnits(1);
        
        // Refresh the list
        const fetchRes = await axios.get("/api/v1/workflow/request-blood/patient", { withCredentials: true });
        if (fetchRes.data?.statusCode === 200) {
          setMyRequests(fetchRes.data.data.requests);
        }
      } else {
        toast.error("Failed to submit request.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-error to-secondary text-white shadow-lg">
        <div className="max-w-7xl mx-auto p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Patient Dashboard</h1>
            <p className="text-error-content/80 mt-1">Submit and track your blood requests</p>
          </div>
          <button onClick={handleLogout} className="btn btn-neutral gap-2 hover:scale-105 transition-transform border-none">
            <FiLogOut size={20} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-xl border border-base-300 hover:border-error transition-colors">
            <div className="card-body">
              <h2 className="card-title text-error"><FiDroplet /> Request Blood</h2>
              <form onSubmit={handleRequestBlood} className="space-y-4 mt-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label"><span className="label-text">Blood Type</span></label>
                    <select className="select select-bordered" value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
                      {[
        "A_pos",
        "A_neg",
        "B_pos",
        "B_neg",
        "O_pos",
        "O_neg",
        "AB_pos",
        "AB_neg",
      ].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Units Required</span></label>
                    <input type="number" min="1" className="input input-bordered" value={units} onChange={(e) => setUnits(e.target.value)} required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label"><span className="label-text">Urgency</span></label>
                    <select className="select select-bordered" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                      <option value="NORMAL">Normal</option>
                      <option value="URGENT">Urgent</option>
                      <option value="EMERGENCY">Emergency</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">Required Date</span></label>
                    <input 
                      type="date" 
                      className="input input-bordered" 
                      value={requiredDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setRequiredDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text">Medical Reason</span></label>
                  <textarea 
                    className="textarea textarea-bordered h-24" 
                    placeholder="Briefly describe the medical reason..." 
                    value={medicalReason} 
                    onChange={(e) => setMedicalReason(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" disabled={loading} className="btn btn-error text-white w-full mt-4">
                  {loading ? <span className="loading loading-spinner"></span> : "Submit Blood Request"}
                </button>
              </form>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-info to-secondary text-white shadow-xl">
            <div className="card-body items-center text-center justify-center">
              <FiActivity size={48} className="mb-4 opacity-80" />
              <h2 className="text-2xl font-bold mb-2">Need Help?</h2>
              <p className="opacity-90">Our admins review emergency requests immediately. Ensure you provide accurate medical details so we can process your request as fast as possible.</p>
            </div>
          </div>
        </div>

        {/* My Requests Section */}
        <div className="card bg-base-100 shadow-xl border border-base-300 mt-8">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">My Blood Requests</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th>Date</th>
                    <th>Blood Type</th>
                    <th>Units</th>
                    <th>Urgency</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myRequests.map((req) => (
                    <tr key={req._id}>
                      <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span className="badge badge-lg badge-outline border-error text-error font-bold">
                          {req.bloodGroup}
                        </span>
                      </td>
                      <td>{req.unitsRequired}</td>
                      <td>
                        <span className={`badge ${req.urgency === 'EMERGENCY' ? 'badge-error' : req.urgency === 'URGENT' ? 'badge-warning' : 'badge-info'}`}>
                          {req.urgency}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${req.status === 'ISSUED' ? 'badge-success' : req.status === 'PENDING' ? 'badge-warning' : 'badge-neutral'}`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {myRequests.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-base-content/60">
                        You have not made any blood requests yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient_Dashboard;
