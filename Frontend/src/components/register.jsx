import React, { useState } from "react";
import OtpInput from "./Otp_Verification";
import { usepatientApi } from "../api/patient.api";
import toast from "react-hot-toast";
import { FiMail, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const Register = () => {
  const [email, setEmail] = useState();
  const [popUpvisible, isPopUpVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    const { loginPatient } = usepatientApi();

    try {
      const res = await loginPatient(email);
      console.log(res);

      if (res.statusCode === 200) {
        isPopUpVisible(true);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {popUpvisible ? (
        <OtpInput email={email} onclose={() => isPopUpVisible(false)} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-secondary/5 to-accent/5 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {/* Card */}
            <div className="card bg-base-100 shadow-2xl border border-base-300">
              <div className="card-body space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="flex justify-center">
                    <div className="bg-gradient-to-br from-secondary to-accent p-3 rounded-full">
                      <FiMail size={32} className="text-white" />
                    </div>
                  </div>
                  <h1 className="card-title text-3xl text-center justify-center text-transparent bg-gradient-to-r from-secondary to-accent bg-clip-text">
                    Patient Registration
                  </h1>
                  <p className="text-base-content/70">
                    Find and request blood easily
                  </p>
                </div>

                {/* Info Box */}
                <div className="alert alert-info">
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
                    An OTP will be sent to your email for verification
                  </span>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Email Address
                      </span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-secondary/60">
                        <FiMail size={20} />
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="patient@example.com"
                        className="input input-bordered w-full pl-10 focus:input-secondary"
                        value={email || ""}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleRegister}
                    disabled={isLoading || !email}
                    className="btn btn-secondary w-full gap-2 mt-6 hover:scale-105 transition-transform shadow-lg disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <FiArrowRight size={20} />
                        Send OTP
                      </>
                    )}
                  </button>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-base-content/70 border-t pt-6">
                  <p>Your email will be used for verification only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
