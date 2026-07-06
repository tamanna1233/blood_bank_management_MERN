import React from "react";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import logo from "../assets/logo/blood.svg";
import { useForm } from "react-hook-form";
import { useOrgainzationApi } from "../api/Oraganization.api";
import toast from "react-hot-toast";
import {
  FiBriefcase,
  FiMapPin,
  FiUser,
  FiPhone,
  FiCheck,
} from "react-icons/fi";

const Organization_register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerOrganization } = useOrgainzationApi();

  const onSubmit = async (data) => {
    try {
      const res = await registerOrganization(data);
      if (res.statusCode === 200) {
        toast.success("Organization registered successfully!");
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Register Your Organization
          </h1>
          <p className="text-base-content/70">
            Join our blood donation network
          </p>
        </div>

        {/* Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="card bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl text-primary mb-6">
                Organization Details
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Organization Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Organization Name
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-primary/60">
                      <FiBriefcase size={20} />
                    </span>
                    <input
                      type="text"
                      placeholder="Red Cross Hospital"
                      className={`input input-bordered w-full pl-10 ${errors.organizationName ? "input-error" : "focus:input-primary"}`}
                      {...register("organizationName", {
                        required: "Organization name is required",
                      })}
                    />
                  </div>
                  {errors.organizationName && (
                    <span className="text-error text-sm mt-1">
                      {errors.organizationName.message}
                    </span>
                  )}
                </div>

                {/* Head of Organization */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Head of Organization
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-primary/60">
                      <FiUser size={20} />
                    </span>
                    <input
                      type="text"
                      placeholder="John Smith"
                      className={`input input-bordered w-full pl-10 ${errors.headName ? "input-error" : "focus:input-primary"}`}
                      {...register("headName", {
                        required: "Head name is required",
                      })}
                    />
                  </div>
                  {errors.headName && (
                    <span className="text-error text-sm mt-1">
                      {errors.headName.message}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Phone Number
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-primary/60">
                      <FiPhone size={20} />
                    </span>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className={`input input-bordered w-full pl-10 ${errors.phoneno ? "input-error" : "focus:input-primary"}`}
                      {...register("phoneno", {
                        required: "Phone number is required",
                      })}
                    />
                  </div>
                  {errors.phoneno && (
                    <span className="text-error text-sm mt-1">
                      {errors.phoneno.message}
                    </span>
                  )}
                </div>

                {/* Address */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Address</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-primary/60">
                      <FiMapPin size={20} />
                    </span>
                    <textarea
                      rows="4"
                      placeholder="123 Medical Street, Health City, HC 12345"
                      className={`textarea textarea-bordered w-full pl-10 ${errors.location ? "textarea-error" : "focus:textarea-primary"}`}
                      {...register("location", {
                        required: "Address is required",
                      })}
                    />
                  </div>
                  {errors.location && (
                    <span className="text-error text-sm mt-1">
                      {errors.location.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-2 pt-4 border-t">
                  <button
                    type="submit"
                    className="btn btn-primary w-full gap-2 hover:scale-105 transition-transform shadow-lg"
                  >
                    <FiCheck size={20} />
                    Register Organization
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Logo Section */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg border border-base-300 p-12">
              <img
                src={logo}
                alt="blood-bank-logo"
                className="w-full max-w-xs"
              />
              <div className="text-center mt-6 space-y-2">
                <h3 className="text-xl font-bold text-primary">BloodBank</h3>
                <p className="text-base-content/70">Saving lives together</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organization_register;
