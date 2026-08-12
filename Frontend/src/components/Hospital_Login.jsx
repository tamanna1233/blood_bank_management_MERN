import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import {FaHospitalAlt} from "react-icons/fa"
import { useHospitalApi } from "../api/Hospital.api";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../App/slice";
import toast from "react-hot-toast";

const Hospital_Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loginHospital } = useHospitalApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const res = await loginHospital({ email, password });
      if (res.statusCode === 200) {
        toast.success(res.message);
        dispatch(authLogin({ token: res.data.accessToken, type: "hospital" }));
        navigate("/hospital_dashboard");
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-full">
                  <FaHospitalAlt size={32} className="text-white" /> 
                </div>
              </div>
              <h1 className="card-title text-3xl text-center justify-center text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                Hospital Login
              </h1>
              <p className="text-base-content/70">Access your dashboard securely</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-base-content/60">
                    <FiMail size={20} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hospital@example.com"
                    className="input input-bordered w-full pl-10 focus:input-primary"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-base-content/60">
                    <FiLock size={20} />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input input-bordered w-full pl-10 focus:input-primary"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full gap-2 mt-6 hover:scale-105 transition-transform shadow-lg"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                    <FiArrowRight size={20} />
                    Login
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-sm">
                Don't have an account?{' '}
                <Link to="/HospitalRegister" className="text-primary font-semibold hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospital_Login;
