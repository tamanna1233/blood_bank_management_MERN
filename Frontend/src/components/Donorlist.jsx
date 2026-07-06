import React from "react";
import { FiPhone, FiMail, FiMapPin, FiUser, FiSearch } from "react-icons/fi";

function DonorList({ donor, close }) {
  if (!donor || !donor.data || !Array.isArray(donor.data.donors)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/5 to-base-100 flex items-center justify-center px-4">
        <div className="card bg-base-100 shadow-2xl border border-base-300 max-w-md w-full">
          <div className="card-body items-center text-center space-y-6">
            <div className="text-6xl">😔</div>
            <h2 className="text-2xl font-bold text-base-content">
              No Donors Found
            </h2>
            <p className="text-base-content/70">
              Unfortunately, no donors matching your blood type and location
              were found. Please try different search criteria.
            </p>
            <button
              onClick={close}
              className="btn btn-secondary gap-2 w-full hover:scale-105 transition-transform"
            >
              <FiSearch size={20} />
              Search Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 to-base-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-2">
            Available Donors
          </h1>
          <p className="text-base-content/70">
            Found {donor.data.donors.length} donor
            {donor.data.donors.length !== 1 ? "s" : ""} matching your criteria
          </p>
        </div>

        {/* Donor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {donor.data.donors.length > 0 ? (
            donor.data.donors.map((donorItem, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all border border-base-300 hover:border-secondary"
              >
                <div className="card-body space-y-4">
                  {/* Donor Name */}
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder bg-gradient-to-br from-secondary to-accent text-white">
                      <div className="w-12 rounded-full flex items-center justify-center">
                        <FiUser size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="card-title text-lg">{donorItem.name}</h3>
                    </div>
                  </div>

                  <div className="divider my-0"></div>

                  {/* Donor Details */}
                  <div className="space-y-3 text-sm">
                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <FiMail
                        size={18}
                        className="text-secondary mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <p className="text-base-content/70 text-xs">Email</p>
                        <p className="text-base-content font-medium break-all">
                          {donorItem.email}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3">
                      <FiPhone
                        size={18}
                        className="text-secondary mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <p className="text-base-content/70 text-xs">Phone</p>
                        <p className="text-base-content font-medium">
                          {donorItem.phone}
                        </p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <FiMapPin
                        size={18}
                        className="text-secondary mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <p className="text-base-content/70 text-xs">Address</p>
                        <p className="text-base-content font-medium">
                          {donorItem.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <div className="card-actions pt-4">
                    <button className="btn btn-secondary btn-sm w-full">
                      Contact Donor
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-base-content/70 text-lg">
                No donors available
              </p>
            </div>
          )}
        </div>

        {/* Footer Button */}
        <div className="flex justify-center">
          <button
            onClick={close}
            className="btn btn-outline btn-secondary gap-2 hover:scale-105 transition-transform"
          >
            <FiSearch size={20} />
            Search Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonorList;
