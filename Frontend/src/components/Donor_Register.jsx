import React, { useState } from "react";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDonorApi } from "../api/Donor.api";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
  FiCheck,
  FiChevronRight,
} from "react-icons/fi";

const Donor_Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { donorRegister } = useDonorApi();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    age: "",
    bloodGroup: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    password: "",
    agreement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const data = {
    name: `${formData?.firstName} ${formData?.lastName}`,
    age: formData?.age,
    phone: formData?.phone,
    email: formData?.email,
    location: `address:${formData?.addressLine1} city:${formData?.city} state:${formData?.state} zip:${formData?.zip} country:${formData?.country}`,
    bloodType: formData?.bloodGroup,
    password: formData?.password,
  };

  const registerHandler = async () => {
    await donorRegister(data)
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((error) => {
        toast.error("Registration failed");
      });
  };

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Become a Blood Donor
          </h1>
          <p className="text-base-content/70">Save lives by donating blood</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          <progress
            className="progress progress-primary w-full"
            value={progress}
            max="100"
          ></progress>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body">
            <form
              onSubmit={handleSubmit(registerHandler)}
              className="space-y-6"
            >
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fadeInUp">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          First Name
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        value={formData?.firstName}
                        onChange={handleChange}
                        name="firstName"
                        className="input input-bordered focus:input-primary"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Last Name
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        value={formData?.lastName}
                        onChange={handleChange}
                        name="lastName"
                        className="input input-bordered focus:input-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData?.email}
                      onChange={handleChange}
                      name="email"
                      className="input input-bordered focus:input-primary"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Phone Number
                      </span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData?.phone}
                      onChange={handleChange}
                      name="phone"
                      className="input input-bordered focus:input-primary"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Age</span>
                      </label>
                      <input
                        type="number"
                        placeholder="25"
                        min="18"
                        max="60"
                        value={formData?.age}
                        onChange={handleChange}
                        name="age"
                        className="input input-bordered focus:input-primary"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Blood Group
                        </span>
                      </label>
                      <select
                        value={formData?.bloodGroup}
                        onChange={handleChange}
                        name="bloodGroup"
                        className="select select-bordered focus:select-primary"
                        required
                      >
                        <option value="">Select Blood Group</option>
                        <option value="O_pos">O+</option>
                        <option value="O_neg">O-</option>
                        <option value="A_pos">A+</option>
                        <option value="A_neg">A-</option>
                        <option value="B_pos">B+</option>
                        <option value="B_neg">B-</option>
                        <option value="AB_pos">AB+</option>
                        <option value="AB_neg">AB-</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Address Information */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fadeInUp">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Address Information
                  </h2>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Street Address
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="123 Main Street"
                      value={formData?.addressLine1}
                      onChange={handleChange}
                      name="addressLine1"
                      className="input input-bordered focus:input-primary"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">City</span>
                      </label>
                      <input
                        type="text"
                        placeholder="New York"
                        value={formData?.city}
                        onChange={handleChange}
                        name="city"
                        className="input input-bordered focus:input-primary"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">State</span>
                      </label>
                      <input
                        type="text"
                        placeholder="NY"
                        value={formData?.state}
                        onChange={handleChange}
                        name="state"
                        className="input input-bordered focus:input-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Zip Code
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="10001"
                        value={formData?.zip}
                        onChange={handleChange}
                        name="zip"
                        className="input input-bordered focus:input-primary"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Country
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="United States"
                        value={formData?.country}
                        onChange={handleChange}
                        name="country"
                        className="input input-bordered focus:input-primary"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Security & Agreement */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fadeInUp">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Security & Terms
                  </h2>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={formData?.password}
                      onChange={handleChange}
                      name="password"
                      className="input input-bordered focus:input-primary"
                      required
                    />
                  </div>

                  {/* Summary Card */}
                  <div className="bg-base-200/50 rounded-lg p-4 space-y-2">
                    <h3 className="font-bold text-lg mb-4">
                      Verification Summary
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Name:</strong> {formData?.firstName}{" "}
                        {formData?.lastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {formData?.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {formData?.phone}
                      </p>
                      <p>
                        <strong>Blood Group:</strong> {formData?.bloodGroup}
                      </p>
                      <p>
                        <strong>Address:</strong> {formData?.addressLine1},{" "}
                        {formData?.city}, {formData?.state} {formData?.zip}
                      </p>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-4">
                      <input
                        type="checkbox"
                        checked={formData?.agreement}
                        onChange={handleChange}
                        name="agreement"
                        className="checkbox checkbox-primary"
                      />
                      <span className="label-text">
                        I accept the terms and conditions and privacy policy
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 justify-between pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="btn btn-outline"
                >
                  Previous
                </button>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="btn btn-primary gap-2"
                  >
                    Next
                    <FiChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!formData?.agreement}
                    className="btn btn-success gap-2"
                  >
                    <FiCheck size={20} />
                    Complete Registration
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donor_Register;
