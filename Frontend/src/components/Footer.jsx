import React from "react";
import logo from "../assets/logo/blood.svg";
import { Link } from "react-router-dom";
import {
  FiDroplet,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

const Footer = () => {
  return (
    <div>
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-secondary to-accent py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-white text-lg font-semibold flex items-center gap-2">
              <FiDroplet size={24} />
              Ready to save lives?
            </p>
          </div>
          <Link
            to="/Donor_Register"
            className="btn btn-primary gap-2 hover:scale-105 transition-transform"
          >
            <FiDroplet size={20} />
            Donate Blood Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-base-900 text-base-content">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="logo" className="w-12" />
                <span className="text-xl font-bold text-primary">
                  BloodBank
                </span>
              </div>
              <p className="text-sm text-base-content/70 mb-4">
                Connecting donors and recipients to save lives, one donation at
                a time.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="btn btn-ghost btn-sm btn-circle text-primary hover:bg-primary/10"
                >
                  <FiFacebook size={20} />
                </a>
                <a
                  href="#"
                  className="btn btn-ghost btn-sm btn-circle text-primary hover:bg-primary/10"
                >
                  <FiTwitter size={20} />
                </a>
                <a
                  href="#"
                  className="btn btn-ghost btn-sm btn-circle text-primary hover:bg-primary/10"
                >
                  <FiInstagram size={20} />
                </a>
                <a
                  href="#"
                  className="btn btn-ghost btn-sm btn-circle text-primary hover:bg-primary/10"
                >
                  <FiLinkedin size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h6 className="font-bold text-lg text-base-content mb-4">
                Quick Links
              </h6>
              <div className="space-y-2">
                <Link
                  to="/"
                  className="link link-hover text-base-content/70 hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  to="/aboutUs"
                  className="link link-hover text-base-content/70 hover:text-primary"
                >
                  About Us
                </Link>
                <Link
                  to="/find_blood"
                  className="link link-hover text-base-content/70 hover:text-primary"
                >
                  Find Blood
                </Link>
                <Link
                  to="/Donor_Register"
                  className="link link-hover text-base-content/70 hover:text-primary"
                >
                  Become a Donor
                </Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h6 className="font-bold text-lg text-base-content mb-4">
                Services
              </h6>
              <div className="space-y-2">
                <a className="link link-hover text-base-content/70 hover:text-primary">
                  Blood Donation
                </a>
                <a className="link link-hover text-base-content/70 hover:text-primary">
                  Request Blood
                </a>
                <a className="link link-hover text-base-content/70 hover:text-primary">
                  Organization
                </a>
                <a className="link link-hover text-base-content/70 hover:text-primary">
                  Testimonials
                </a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h6 className="font-bold text-lg text-base-content mb-4">
                Legal
              </h6>
              <div className="space-y-2">
                <a className="link link-hover text-base-content/70 hover:text-primary">
                  Terms of Use
                </a>
                <a className="link link-hover text-base-content/70 hover:text-primary">
                  Privacy Policy
                </a>
                <a className="link link-hover text-base-content/70 hover:text-primary">
                  Cookie Policy
                </a>
                <a className="link link-hover text-base-content/70 hover:text-primary">
                  Disclaimer
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h6 className="font-bold text-lg text-base-content mb-4">
                Contact
              </h6>
              <div className="space-y-3">
                <a
                  href="mailto:info@bloodbank.com"
                  className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
                >
                  <FiMail size={18} />
                  <span className="text-sm">info@bloodbank.com</span>
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
                >
                  <FiPhone size={18} />
                  <span className="text-sm">+1 (234) 567-890</span>
                </a>
                <div className="flex items-start gap-2 text-base-content/70">
                  <FiMapPin size={18} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    123 Medical Street
                    <br />
                    Health City, HC 12345
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="divider my-4"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-base-content/70">
            <p>
              &copy; 2024 BloodBank. All rights reserved. Built with care for
              life-saving missions.
            </p>
            <p>
              Developed by{" "}
              <span className="text-primary font-semibold">
                Aurpit &amp; Tamanna
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
