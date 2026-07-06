import React, { useState } from "react";
import logo from "../assets/logo/blood.svg";
import { useForm } from "react-hook-form";
import { usepatientApi } from "../api/patient.api";
import Donorlist from "./Donorlist";
import { useDispatch } from "react-redux";
import { logout as authlogout } from "../App/slice";
import { useNavigate } from "react-router-dom";
import { FiDroplet, FiMapPin, FiLogOut, FiSearch } from "react-icons/fi";

const Details = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [donor, setdonor] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { findBlood, logout } = usepatientApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requesthandeler = async (data) => {
    setIsLoading(true);
    try {
      const res = await findBlood(data);
      setdonor(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (donor) {
    return <Donorlist donor={donor} close={() => setdonor(0)} />;
  }

  const logouthandel = async () => {
    try {
      const res = await logout();
      if (res.statusCode === 200) {
        dispatch(authlogout());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 to-base-100">
      {/* Logout Button */}
      <div className="flex justify-end p-6">
        <button
          onClick={logouthandel}
          className="btn btn-error gap-2 hover:scale-105 transition-transform shadow-lg"
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Logo Section */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="card bg-gradient-to-br from-secondary/10 to-accent/10 shadow-xl border border-base-300 p-8">
              <img
                src={logo}
                alt="blood-bank-logo"
                className="w-full max-w-xs"
              />
              <div className="text-center mt-6 space-y-2">
                <h3 className="text-2xl font-bold text-secondary">BloodBank</h3>
                <p className="text-base-content/70">Find donors near you</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="card bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body space-y-6">
              {/* Header */}
              <div className="text-center space-y-2 mb-4">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-secondary to-accent p-3 rounded-full">
                    <FiDroplet size={32} className="text-white" />
                  </div>
                </div>
                <h1 className="card-title text-3xl text-center justify-center text-transparent bg-gradient-to-r from-secondary to-accent bg-clip-text">
                  Find a Donor
                </h1>
                <p className="text-base-content/70">
                  Search for available blood donors in your area
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(requesthandeler)}
                className="space-y-4"
              >
                {/* Blood Type */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Blood Type</span>
                  </label>
                  <select
                    className={`select select-bordered focus:select-secondary ${errors.bloodType ? "select-error" : ""}`}
                    {...register("bloodType", {
                      required: "Blood type is required",
                    })}
                  >
                    <option value="">Select Blood Type</option>
                    <option value="O_pos">O+</option>
                    <option value="O_neg">O-</option>
                    <option value="A_pos">A+</option>
                    <option value="A_neg">A-</option>
                    <option value="B_pos">B+</option>
                    <option value="B_neg">B-</option>
                    <option value="AB_pos">AB+</option>
                    <option value="AB_neg">AB-</option>
                  </select>
                  {errors.bloodType && (
                    <span className="text-error text-sm mt-1">
                      {errors.bloodType.message}
                    </span>
                  )}
                </div>

                {/* Location Section */}
                <div className="divider my-2">Location</div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">State</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-secondary/60">
                        <FiMapPin size={20} />
                      </span>
                      <input
                        type="text"
                        placeholder="Enter state"
                        className={`input input-bordered w-full pl-10 focus:input-secondary ${errors.address ? "input-error" : ""}`}
                        {...register("address", {
                          required: "State is required",
                        })}
                      />
                    </div>
                    {errors.address && (
                      <span className="text-error text-sm mt-1">
                        {errors.address.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">District</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter district"
                      className="input input-bordered focus:input-secondary"
                      {...register("district")}
                    />
                  </div>
                </div>

                {/* Info Box */}
                <div className="alert alert-info text-sm">
                  <svg
                    className="stroke-current shrink-0 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>
                    We'll search nearby donors matching your blood type and
                    location
                  </span>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-secondary w-full gap-2 hover:scale-105 transition-transform shadow-lg disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Searching...
                    </>
                  ) : (
                    <>
                      <FiSearch size={20} />
                      Find Donors
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="text-center text-sm text-base-content/70 border-t pt-4">
                <p>All donor information is handled securely</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
