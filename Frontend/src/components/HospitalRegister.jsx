import React from "react";
import { FaCheckCircle, FaKey, FaRegCheckCircle } from "react-icons/fa";
import logo from "../assets/logo/blood.svg";
import { useForm } from "react-hook-form";
import { useHospitalApi } from "../api/Hospital.api";
import toast from "react-hot-toast";
import {
  FiBriefcase,
  FiMapPin,
  FiUser,
  FiPhone,
  FiCheck,
  FiMail,
  FiFileText
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HospitalRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerHospital } = useHospitalApi();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await registerHospital(data);
      if (res.statusCode === 201) {
        toast.success("Hospital registered successfully! Awaiting Admin approval.");
        navigate("/");
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Register Your Hospital
          </h1>
          <p className="text-base-content/70">
            Join our blood donation network
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl text-primary mb-6">
                Hospital Details
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Hospital Name</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-primary/60">
                      <FiBriefcase size={20} />
                    </span>
                    <input
                      type="text"
                      placeholder="Red Cross Hospital"
                      className={`input input-bordered w-full pl-10 ${errors.hospitalName ? "input-error" : "focus:input-primary"}`}
                      {...register("hospitalName", { required: "Hospital name is required" })}
                    />
                  </div>
                  {errors.hospitalName && <span className="text-error text-sm mt-1">{errors.hospitalName.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Registration Number</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-primary/60">
                      <FiFileText size={20} />
                    </span>
                    <input
                      type="text"
                      placeholder="REG-12345"
                      className={`input input-bordered w-full pl-10 ${errors.registrationNumber ? "input-error" : "focus:input-primary"}`}
                      {...register("registrationNumber", { required: "Registration number is required" })}
                    />
                  </div>
                  {errors.registrationNumber && <span className="text-error text-sm mt-1">{errors.registrationNumber.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-primary/60">
                      <FiMail size={20} />
                    </span>
                    <input
                      type="email"
                      placeholder="contact@hospital.com"
                      className={`input input-bordered w-full pl-10 ${errors.email ? "input-error" : "focus:input-primary"}`}
                      {...register("email", { required: "Email is required" })}
                    />
                  </div>
                  {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Phone Number</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-primary/60">
                      <FiPhone size={20} />
                    </span>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className={`input input-bordered w-full pl-10 ${errors.phone ? "input-error" : "focus:input-primary"}`}
                      {...register("phone", { required: "Phone number is required" })}
                    />
                  </div>
                  {errors.phone && <span className="text-error text-sm mt-1">{errors.phone.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">City</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-primary/60">
                      <FiMapPin size={20} />
                    </span>
                    <input
                      type="text"
                      placeholder="New York"
                      className={`input input-bordered w-full pl-10 ${errors.city ? "input-error" : "focus:input-primary"}`}
                      {...register("city", { required: "City is required" })}
                    />
                  </div>
                  {errors.city && <span className="text-error text-sm mt-1">{errors.city.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Address</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-primary/60">
                      <FiMapPin size={20} />
                    </span>
                    <textarea
                      rows="2"
                      placeholder="123 Medical Street"
                      className={`textarea textarea-bordered w-full pl-10 ${errors.address ? "textarea-error" : "focus:textarea-primary"}`}
                      {...register("address", { required: "Address is required" })}
                    />
                  </div>
                  {errors.address && <span className="text-error text-sm mt-1">{errors.address.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-primary/60">
                      <FaKey size={20} />
                    </span>
                    <input
                      type="text"
                      placeholder="*******"
                      className={`input input-bordered w-full pl-10 ${errors.password ? "input-error" : "focus:input-primary"}`}
                      {...register("password", { required: "password is required" })}
                    />
                  </div>
                  {errors.contactPerson && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Contact Person (Head)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-primary/60">
                      <FiUser size={20} />
                    </span>
                    <input
                      type="text"
                      placeholder="Dr. John Smith"
                      className={`input input-bordered w-full pl-10 ${errors.contactPerson ? "input-error" : "focus:input-primary"}`}
                      {...register("contactPerson", { required: "Contact person is required" })}
                    />
                  </div>
                  {errors.contactPerson && <span className="text-error text-sm mt-1">{errors.contactPerson.message}</span>}
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <button
                    type="submit"
                    className="btn btn-primary w-full gap-2 hover:scale-105 transition-transform shadow-lg"
                  >
                    <FiCheck size={20} />
                    Register Hospital
                  </button>
                </div>
              </form>
            </div>
          </div>

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

export default HospitalRegister;
