import React, { useState } from "react";
import { usepatientApi } from "../api/patient.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../App/slice";
import { FiMail, FiCheck, FiRotateCcw } from "react-icons/fi";

const OtpInput = ({ email, onclose }) => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to the next input box
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = e.target.previousSibling;
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyOtp();
  };

  const verifyOtp = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }

    setIsVerifying(true);
    const { verifyPatient } = usepatientApi();

    try {
      const res = await verifyPatient(email, otpValue);

      if (res.statusCode === 200) {
        toast.success(res.message);
        dispatch(login(res));
        onclose();
        navigate("/patient_dashboard");
      } else {
        toast.error(res.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
      console.log(error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-2xl border border-base-300 w-full max-w-md">
        <div className="card-body space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-secondary to-accent p-3 rounded-full">
                <FiMail size={32} className="text-white" />
              </div>
            </div>
            <h1 className="card-title text-3xl text-center justify-center text-transparent bg-gradient-to-r from-secondary to-accent bg-clip-text">
              OTP Verification
            </h1>
          </div>

          {/* Email Info */}
          <div className="text-center space-y-1">
            <p className="text-base-content/70">An OTP has been sent to:</p>
            <p className="font-semibold text-lg break-all">{email}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Fields */}
            <div className="flex gap-3 justify-center">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  className="input input-bordered w-16 h-16 text-center text-2xl font-bold focus:input-secondary focus:scale-105 transition-transform"
                  placeholder="•"
                />
              ))}
            </div>

            {/* Instructions */}
            <div className="alert alert-info text-sm">
              <svg
                className="stroke-current shrink-0 h-5 w-5"
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
              <span>Enter the 4-digit OTP sent to your email</span>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isVerifying || otp.some((val) => !val)}
              className="btn btn-secondary w-full gap-2 hover:scale-105 transition-transform shadow-lg disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Verifying...
                </>
              ) : (
                <>
                  <FiCheck size={20} />
                  Verify OTP
                </>
              )}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="text-center text-sm text-base-content/70 border-t pt-6">
            <p>Didn't receive the OTP?</p>
            <button
              type="button"
              className="link link-secondary gap-2 inline-flex items-center mt-2"
            >
              <FiRotateCcw size={16} />
              Resend OTP
            </button>
          </div>

          {/* Close Button */}
          <button onClick={onclose} className="btn btn-outline btn-sm w-full">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
