import React from 'react'
import bloodlogo from "../assets/logo/blood.svg"
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-transparent z-40">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-transparent rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/aboutUs">About Us</Link></li>
        <li>
          <a>Register</a>
          <ul className="p-2">
          <li> <Link to="/Donor_Register">Donor</Link></li>
            <li><a>Patient</a></li>
            <li><a href="">Organization</a></li>
            <li><Link to="/Organization_register">Organization </Link></li>
          </ul>
        </li>
        <li><a>Find Blood</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl text-white"><img src={bloodlogo} alt="" className='hidden sm:flex w-12'/></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/aboutUs">About Us</Link></li>

      <li>
        <details>
          <summary>Register</summary>
          <ul className="p-2">
          <li> <Link to="/Donor_Register">Donor</Link></li>
            <li><Link to="/find_blood">Patient</Link></li>
            <li><Link to="/Organization_register">Organization </Link></li>
          </ul>
        </details>
      </li>
      <li><Link to='/find_blood'>Find Blood</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <Link to="/Donor_Register" className="btn bg-[#991747] text-white">Donate Blood</Link>
  </div>
</div>
    </div>
  )
}

export default Navbar
