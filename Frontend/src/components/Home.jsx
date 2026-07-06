import React from "react";
import bgimg from "../assets/Background image/Ellipse 8.svg";
import { Link } from "react-router-dom";
import { FiArrowRight, FiDroplet, FiHeart, FiUsers } from "react-icons/fi";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-between py-20 px-6 bg-gradient-to-br from-base-100 via-primary/5 to-secondary/5 overflow-hidden">
        <div className="flex items-center w-full max-w-7xl mx-auto gap-12">
          <div className="relative w-full lg:w-1/2 z-10">
            <img
              src={bgimg}
              alt="background-decoration"
              className="w-full object-cover opacity-30 absolute -top-40 -right-40 lg:relative lg:opacity-100 lg:top-0 lg:right-0"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-accent font-semibold text-lg flex items-center gap-2">
                  <FiDroplet className="text-2xl" />
                  Life Saving Mission
                </p>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                  Save Lives, Donate Blood
                </h1>
              </div>

              <p className="text-lg text-base-content/80 leading-relaxed max-w-lg">
                Donating blood is a simple yet powerful way to save lives. Each
                donation can help multiple patients in need, from accident
                victims to those battling chronic illnesses. Your willingness to
                give blood not only contributes to vital medical supplies but
                also fosters a sense of community and compassion.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/find_blood"
                  className="btn btn-lg btn-primary gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <FiArrowRight size={20} />
                  Get Blood Now
                </Link>
                <Link
                  to="/Donor_Register"
                  className="btn btn-lg btn-outline btn-secondary gap-2 hover:scale-105 transition-all"
                >
                  <FiHeart size={20} />
                  Become a Donor
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-base-content/70">Active Donors</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">100+</p>
                  <p className="text-sm text-base-content/70">Organizations</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent">1000+</p>
                  <p className="text-sm text-base-content/70">Lives Saved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-base-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
              Why Donate Blood?
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Your donation makes a real difference in saving lives and helping
              those in medical need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="text-4xl text-primary mb-4">
                  <FiDroplet />
                </div>
                <h3 className="card-title text-primary">Save Lives</h3>
                <p className="text-base-content/80">
                  One blood donation can potentially save up to three lives.
                  Your contribution directly impacts those in critical need.
                </p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20 hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="text-4xl text-secondary mb-4">
                  <FiHeart />
                </div>
                <h3 className="card-title text-secondary">Help Community</h3>
                <p className="text-base-content/80">
                  Be part of a compassionate community dedicated to making a
                  difference and supporting those who need us.
                </p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="text-4xl text-accent mb-4">
                  <FiUsers />
                </div>
                <h3 className="card-title text-accent">Health Benefits</h3>
                <p className="text-base-content/80">
                  Regular blood donors report improved health. Donating helps
                  regulate iron levels and stimulates blood production.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-20 px-6">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join thousands of donors who have already saved lives. Register
            today and become part of our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/find_blood"
              className="btn btn-lg btn-ghost text-white hover:bg-white/20 gap-2"
            >
              Find Blood
            </Link>
            <Link
              to="/Donor_Register"
              className="btn btn-lg btn-accent gap-2 shadow-lg"
            >
              <FiDroplet />
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
