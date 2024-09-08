"use client";

import React, { useState } from 'react';

const PhonePopup = ({ onSubmit }) => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default country code

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(`${countryCode} ${phone}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Enter Your Phone Number</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex items-center mb-4 w-full">
            {/* Country code dropdown */}
            <select
              value={countryCode}
              onChange={handleCountryCodeChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-24" // Reduced size
            >
              <option value="+91">+91 </option>
              <option value="+1">+1 </option>
              <option value="+44">+44 </option>
              <option value="+81">+81 </option>
              <option value="+61">+61 </option>
              <option value="+49">+49 </option>
              <option value="+33">+33 </option>
              <option value="+55">+55 </option>
              <option value="+86">+86 </option>
              {/* Add more country codes as needed */}
            </select>
            {/* Phone input */}
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full ml-2"
              placeholder="Phone number"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full mt-4 hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhonePopup;
