import React, { useState, useRef, useEffect } from "react";
import bloodlogo from "../assets/logo/blood.svg";
import { Link } from "react-router-dom";
import { FiDroplet, FiHome, FiInfo, FiLogIn, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null); // "register" | "login" | null
  const navRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (menu) => setOpenMenu((prev) => (prev === menu ? null : menu));
  const close = () => setOpenMenu(null);

  return (
    <div ref={navRef}>
      <div className="navbar bg-gradient-to-r from-primary to-secondary shadow-lg sticky top-0 z-50">
        {/* ── Mobile hamburger ── */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white hover:bg-primary-focus"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"
            >
              <li>
                <Link to="/" className="text-base-content hover:text-primary">
                  <FiHome className="inline mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/aboutUs" className="text-base-content hover:text-primary">
                  <FiInfo className="inline mr-2" />
                  About Us
                </Link>
              </li>
              {/* Mobile Register sub-menu */}
              <li>
                <a className="text-base-content hover:text-primary">Register</a>
                <ul className="p-2 bg-base-100">
                  <li>
                    <Link to="/Donor_Register" className="text-base-content hover:text-primary">
                      Donor
                    </Link>
                  </li>
                  
                </ul>
              </li>
              {/* Mobile Login sub-menu */}
              <li>
                <a className="text-base-content hover:text-primary">
                  <FiLogIn className="inline mr-2" /> Login
                </a>
                <ul className="p-2 bg-base-100">
                  <li>
                    <Link to="/donor_login" className="text-base-content hover:text-primary">
                      Donor
                    </Link>
                  </li>
                  <li>
                    <Link to="/find_blood" className="text-base-content hover:text-primary">
                      Patient
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin_login" className="text-base-content hover:text-primary">
                      Admin
                    </Link>
                  </li>
                  <li>
                    <Link to="/hospital_login" className="text-base-content hover:text-primary">
                      Hospital
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/find_blood" className="text-base-content hover:text-primary">
                  <FiDroplet className="inline mr-2" />
                  Find Blood
                </Link>
              </li>
            </ul>
          </div>

          <Link to="/" className="btn btn-ghost hover:bg-primary-focus/20 text-xl">
            <img src={bloodlogo} alt="blood-logo" className="w-10" />
            <span className="text-white font-bold hidden sm:inline">BloodBank</span>
          </Link>
        </div>

        {/* ── Desktop center menu ── */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <Link to="/" className="hover:text-accent">
                <FiHome className="inline mr-1" /> Home
              </Link>
            </li>
            <li>
              <Link to="/aboutUs" className="hover:text-accent">
                <FiInfo className="inline mr-1" /> About Us
              </Link>
            </li>

            {/* Desktop Register dropdown */}
            <li className="relative">
              <button
                onClick={() => toggle("register")}
                className="flex items-center gap-1 hover:text-accent focus:outline-none px-3 py-2 rounded-lg"
              >
                Register
                <FiChevronDown
                  className={`transition-transform duration-200 ${openMenu === "register" ? "rotate-180" : ""}`}
                />
              </button>
              {openMenu === "register" && (
                <ul className="absolute top-full left-0 mt-1 p-2 bg-base-100 rounded-box text-base-content shadow-xl w-40 z-50">
                  <li className="hover:text-primary">
                    <Link to="/Donor_Register" onClick={close}>
                      Donor
                    </Link>
                  </li>
                  
                </ul>
              )}
            </li>

            {/* Desktop Login dropdown */}
            <li className="relative">
              <button
                onClick={() => toggle("login")}
                className="flex items-center gap-1 hover:text-accent focus:outline-none px-3 py-2 rounded-lg"
              >
                <FiLogIn className="inline mr-1" /> Login
                <FiChevronDown
                  className={`transition-transform duration-200 ${openMenu === "login" ? "rotate-180" : ""}`}
                />
              </button>
              {openMenu === "login" && (
                <ul className="absolute top-full left-0 mt-1 p-2 bg-base-100 rounded-box text-base-content shadow-xl w-40 z-50">
                  <li className="hover:text-primary">
                    <Link to="/donor_login" onClick={close}>
                      Donor
                    </Link>
                  </li>
                  <li className="hover:text-primary">
                    <Link to="/find_blood" onClick={close}>
                      Patient
                    </Link>
                  </li>
                  <li className="hover:text-primary">
                    <Link to="/admin_login" onClick={close}>
                      Admin
                    </Link>
                  </li>
                  <li className="hover:text-primary">
                    <Link to="/hospital_login" onClick={close}>
                      Hospital
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/find_blood" className="hover:text-accent">
                <FiDroplet className="inline mr-1" /> Find Blood
              </Link>
            </li>
          </ul>
        </div>

        {/* ── CTA button ── */}
        <div className="navbar-end">
          <Link
            to="/Donor_Register"
            className="btn btn-accent gap-2 hover:scale-105 transition-transform text-accent-content font-bold shadow-lg"
          >
            <FiDroplet size={20} />
            Donate Blood
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
