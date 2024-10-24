import React from "react";
import { Link } from "react-router-dom";
import "./PaymentStyles.css";

function SuccessfulPayment() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center animate-fadeIn">
        <div className="icon-container mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-green-500 animate-bounceIn"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold mb-2 text-gray-800">
          Payment Successful!
        </h1>
        <p className="text-lg mb-6 text-gray-600">
          Thank you for your purchase.
        </p>
        <Link
          to="/"
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-lg px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default SuccessfulPayment;
