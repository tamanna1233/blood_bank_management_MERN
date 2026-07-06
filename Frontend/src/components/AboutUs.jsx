import React from "react";
import logo from "../assets/logo/blood.svg";
import { FiUsers, FiMapPin, FiHeart, FiLifeBuoy } from "react-icons/fi";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              About BloodBank
            </h1>
            <p className="text-lg text-base-content/75 mb-4">
              Welcome to{" "}
              <span className="text-primary font-semibold">BloodBank</span> — a
              trusted platform connecting generous donors with patients in
              urgent need. We make donating and finding blood fast, secure, and
              reliable.
            </p>

            <div className="space-y-4">
              <p className="text-base-content/70">
                Our mission is simple: ensure that no life is lost due to blood
                shortages. We empower donors, patients, and organizations with
                the tools to connect quickly during critical moments.
              </p>
              <a href="/Donor_Register" className="btn btn-primary mt-4">
                Become a Donor
              </a>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="card glass-effect p-8 shadow-xl border border-base-200 w-full">
              <img src={logo} alt="logo" className="w-40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-center">
                Saving Lives Together
              </h3>
              <p className="text-center text-base-content/70 mt-2">
                Join thousands of donors and organizations working together to
                keep the blood supply available.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 shadow-lg border border-base-200 text-center">
            <div className="text-4xl text-primary mx-auto mb-3">
              <FiUsers />
            </div>
            <h4 className="font-semibold mb-2">Who We Are</h4>
            <p className="text-sm text-base-content/70">
              A community-driven platform connecting donors, patients, and
              hospitals to ensure timely blood access.
            </p>
          </div>

          <div className="card p-6 shadow-lg border border-base-200 text-center">
            <div className="text-4xl text-secondary mx-auto mb-3">
              <FiMapPin />
            </div>
            <h4 className="font-semibold mb-2">How It Works</h4>
            <p className="text-sm text-base-content/70">
              Search by blood type and location, verify via OTP, and connect
              directly with available donors nearby.
            </p>
          </div>

          <div className="card p-6 shadow-lg border border-base-200 text-center">
            <div className="text-4xl text-accent mx-auto mb-3">
              <FiHeart />
            </div>
            <h4 className="font-semibold mb-2">Why Choose Us</h4>
            <p className="text-sm text-base-content/70">
              Verified users, quick matching, and easy coordination for safe and
              reliable blood donations.
            </p>
          </div>
        </div>

        <div className="bg-base-200 p-8 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold">Our Mission</h3>
            <p className="text-base-content/70">
              We strive to make blood available to everyone who needs it —
              quickly and safely.
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/find_blood" className="btn btn-ghost btn-lg">
              Find Blood
            </a>
            <a href="/Donor_Register" className="btn btn-primary btn-lg">
              Donate Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
