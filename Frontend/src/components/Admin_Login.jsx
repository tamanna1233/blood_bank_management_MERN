import React from "react";
import { useForm } from "react-hook-form";
import { useAdminApi } from "../api/admin.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as Authlogin } from "../App/slice";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

const Admin_Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginhandeler = async (data) => {
    const { login } = useAdminApi();
    await login(data)
      .then((res) => {
        if (res.statusCode === 200) {
          toast.success(res.message);
          dispatch(Authlogin(res));
          navigate("/admin_dashboard");
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        toast.error("Login failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-full">
                  <FiLock size={32} className="text-white" />
                </div>
              </div>
              <h1 className="card-title text-3xl text-center justify-center text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                Admin Login
              </h1>
              <p className="text-base-content/70">
                Access your admin dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(loginhandeler)} className="space-y-4">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Email Address
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-primary/60">
                    <FiMail size={20} />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="admin@bloodbank.com"
                    className={`input input-bordered w-full pl-10 ${errors.email ? "input-error" : "focus:input-primary"}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="text-error text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-primary/60">
                    <FiLock size={20} />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className={`input input-bordered w-full pl-10 ${errors.password ? "input-error" : "focus:input-primary"}`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <span className="text-error text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full gap-2 mt-6 hover:scale-105 transition-transform shadow-lg"
              >
                <FiLogIn size={20} />
                Login
              </button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm text-base-content/70">
              <p>For authorized personnel only</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Login;
