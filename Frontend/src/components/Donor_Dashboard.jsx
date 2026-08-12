import React, { useState } from "react";
import { FiLogOut, FiPlusCircle, FiClock, FiActivity } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDonorApi } from "../api/donor.api";
import { logout as authLogout } from "../App/slice";
import toast from "react-hot-toast";
import axios from "axios"; // For direct workflow calls for now

const Donor_Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useDonorApi();
  const [preferredDate, setPreferredDate] = useState("");
  const [bloodType, setBloodType] = useState("O_pos");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(authLogout());
      navigate("/donor_login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!preferredDate) {
      toast.error("Please select a preferred date");
      return;
    }
    setLoading(true);
    try {
      // Assuming donor token is automatically attached by interceptors or credentials
      const res = await axios.post(
        "/api/v1/workflow/donate",
        {
          requestedBloodType: bloodType,
          preferredDate: preferredDate,
        },
        { withCredentials: true },
      );
      if (res.data?.statusCode === 201) {
        toast.success("Donation request submitted! Awaiting admin approval.");
        setPreferredDate("");
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
      <div className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
        <div className="max-w-7xl mx-auto p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Donor Dashboard</h1>
            <p className="text-primary-content/80 mt-1">
              Manage your life-saving donations
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-error gap-2 hover:scale-105 transition-transform"
          >
            <FiLogOut size={20} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8 mt-6">
        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-xl border border-base-300 hover:border-primary transition-colors">
            <div className="card-body">
              <h2 className="card-title text-primary">
                <FiPlusCircle /> Schedule Donation
              </h2>
              <form onSubmit={handleDonate} className="space-y-4 mt-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Blood Type</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                  >
                    {[
                      "A_pos",
                      "A_neg",
                      "B_pos",
                      "B_neg",
                      "O_pos",
                      "O_neg",
                      "AB_pos",
                      "AB_neg",
                    ].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered"
                    value={preferredDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full mt-4"
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-secondary to-accent text-white shadow-xl">
            <div className="card-body items-center text-center justify-center">
              <FiActivity size={48} className="mb-4 opacity-80" />
              <h2 className="text-2xl font-bold mb-2">
                Thank you for being a hero!
              </h2>
              <p className="opacity-90">
                Every donation can save up to 3 lives. Your generosity makes a
                huge difference in the community.
              </p>
              <div className="mt-6 flex items-center gap-2 badge badge-lg badge-outline border-white">
                <FiClock /> Eligible to donate
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donor_Dashboard;
