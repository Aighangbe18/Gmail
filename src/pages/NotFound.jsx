import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-xl font-semibold mb-2">Page Not Found</p>
        <p className="text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
