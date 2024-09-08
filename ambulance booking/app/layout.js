"use client"; // Add this to make it a client component

import './globals.css';
import Header from '@/components/Header';
import PhonePopup from '@/components/PhonePopup';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);

  // Handle what happens after phone number is submitted
  const handlePhoneSubmit = (phoneNumber) => {
    console.log("Phone number submitted:", phoneNumber);
    setIsPhoneSubmitted(true); // Update state to allow app access
  };

  return (
    <html lang="en">
      <body className='bg-gray-100'>
        {!isPhoneSubmitted && (
          <PhonePopup onSubmit={handlePhoneSubmit} /> // Pass the onSubmit function
        )}
        {isPhoneSubmitted && (
          <>
            <Header />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
