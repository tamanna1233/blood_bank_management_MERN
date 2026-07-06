import React from "react";
import img2 from "../assets/logo/pngwing 1.svg";
import {
  FiCheckCircle,
  FiClipboard,
  FiLock,
  FiArrowRight,
} from "react-icons/fi";
const GetBlood = () => {
  const steps = [
    {
      number: 1,
      title: "Register Your Details",
      description: "Fill in your information and blood type requirement",
      icon: FiClipboard,
      gradient: "from-primary to-primary/60",
    },
    {
      number: 2,
      title: "Verify Your Details",
      description: "Confirm your information through OTP verification",
      icon: FiCheckCircle,
      gradient: "from-success to-success/60",
    },
    {
      number: 3,
      title: "Login to Platform",
      description: "Access our secure platform to find donors",
      icon: FiLock,
      gradient: "from-secondary to-secondary/60",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-secondary/5 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            How to Get Blood
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Follow our simple 3-step process to find and connect with blood
            donors in your area
          </p>
        </div>

        {/* Steps Section */}
        <div className="relative">
          {/* Desktop View - Horizontal Flow */}
          <div className="hidden lg:flex justify-between items-start gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex-1 relative">
                  {/* Step Card */}
                  <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all border-2 border-base-300 hover:border-secondary h-full">
                    <div className="card-body items-center text-center space-y-4">
                      {/* Number Badge */}
                      <div
                        className={`badge badge-lg gap-2 bg-gradient-to-r ${step.gradient} text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center`}
                      >
                        {step.number}
                      </div>

                      {/* Icon */}
                      <div className="text-5xl text-secondary">
                        <Icon size={48} />
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="card-title text-xl">{step.title}</h3>
                        <p className="text-base-content/70 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Between Steps */}
                  {index < steps.length - 1 && (
                    <div className="absolute -right-6 top-24 hidden lg:flex items-center justify-center">
                      <div className="bg-gradient-to-r from-secondary to-accent p-2 rounded-full text-white">
                        <FiArrowRight size={24} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile View - Vertical Stack */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-6">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    {/* Circle Badge */}
                    <div
                      className={`badge badge-lg gap-2 bg-gradient-to-r ${step.gradient} text-white text-lg font-bold w-14 h-14 rounded-full flex items-center justify-center shrink-0`}
                    >
                      {step.number}
                    </div>
                    {/* Line */}
                    {index < steps.length - 1 && (
                      <div className="w-1 h-24 bg-gradient-to-b from-secondary to-accent/30 mt-2"></div>
                    )}
                  </div>

                  {/* Card */}
                  <div className="flex-1 card bg-base-100 shadow-lg border-2 border-base-300">
                    <div className="card-body">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-secondary">
                          <Icon size={28} />
                        </div>
                        <h3 className="card-title text-lg">{step.title}</h3>
                      </div>
                      <p className="text-base-content/70 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Section with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold text-base-content">
                Start Your Journey Today
              </h2>
              <p className="text-lg text-base-content/70">
                Our secure platform connects patients in urgent need with
                willing blood donors. We handle all the details to make the
                process safe and convenient.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                {
                  title: "Secure Registration",
                  desc: "Your data is encrypted and protected",
                },
                {
                  title: "Fast Verification",
                  desc: "Quick OTP-based verification process",
                },
                {
                  title: "Find Nearby Donors",
                  desc: "Connect with donors in your location",
                },
                {
                  title: "Save Lives",
                  desc: "Every connection can save a life",
                },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="badge badge-secondary badge-lg gap-2 shrink-0">
                    <FiCheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base-content">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-base-content/70">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="card bg-gradient-to-br from-secondary/20 to-accent/20 border-2 border-secondary/30 p-8">
              <img
                src={img2}
                alt="blood-donation-illustration"
                className="w-full max-w-sm"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-secondary to-accent rounded-2xl p-8 md:p-12 text-center text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Find a Donor?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join thousands of patients who have successfully connected with
            blood donors through our platform.
          </p>
          <a
            href="/register"
            className="btn btn-primary gap-2 inline-flex h-12"
          >
            Start Registration
            <FiArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetBlood;
