'use client'; // Ensure this component is a client-side component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Payment = () => {
  const router = useRouter();

  useEffect(() => {
    // Function to handle redirection
    const handlePopState = () => {
      // Redirect to the desired URL
      router.push(process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL || '/');
    };

    // Listen for the popstate event to detect back/forward button navigation
    window.addEventListener('popstate', handlePopState);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  // Debugging: Log to check if component is rendering
  useEffect(() => {
    console.log('Payment component rendered');
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-xl font-bold text-gray-800">
        Your ambulance is arriving shortly at your location.
      </p>
    </div>
  );
};

export default Payment;
