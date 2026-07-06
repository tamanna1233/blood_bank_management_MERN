import React from "react";
import bloodlogo from "../assets/logo/blood.svg";
import { Link } from "react-router-dom";
import { FiDroplet, FiHome, FiInfo, FiLogIn } from "react-icons/fi";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-gradient-to-r from-primary to-secondary shadow-lg sticky top-0 z-50">
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
                <Link
                  to="/aboutUs"
                  className="text-base-content hover:text-primary"
                >
                  <FiInfo className="inline mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <a className="text-base-content hover:text-primary">Register</a>
                <ul className="p-2 bg-base-100">
                  <li>
                    <Link
                      to="/Donor_Register"
                      className="text-base-content hover:text-primary"
                    >
                      Donor
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/find_blood"
                      className="text-base-content hover:text-primary"
                    >
                      Patient
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Organization_register"
                      className="text-base-content hover:text-primary"
                    >
                      Organization
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  to="/find_blood"
                  className="text-base-content hover:text-primary"
                >
                  <FiDroplet className="inline mr-2" />
                  Find Blood
                </Link>
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost hover:bg-primary-focus/20 text-xl"
          >
            <img src={bloodlogo} alt="blood-logo" className="w-10" />
            <span className="text-white font-bold hidden sm:inline">
              BloodBank
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <Link to="/" className="hover:text-accent">
                <FiHome className="inline mr-1" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/aboutUs" className="hover:text-accent">
                <FiInfo className="inline mr-1" />
                About Us
              </Link>
            </li>
            <li>
              <details className="hover:text-accent">
                <summary>Register</summary>
                <ul className="p-2 bg-base-100 rounded-t-none text-base-content shadow-xl">
                  <li className="hover:text-primary">
                    <Link to="/Donor_Register">Donor</Link>
                  </li>
                  <li className="hover:text-primary">
                    <Link to="/find_blood">Patient</Link>
                  </li>
                  <li className="hover:text-primary">
                    <Link to="/Organization_register">Organization</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to="/find_blood" className="hover:text-accent">
                <FiDroplet className="inline mr-1" />
                Find Blood
              </Link>
            </li>
          </ul>
        </div>

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
