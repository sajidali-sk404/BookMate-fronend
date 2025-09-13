import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()} BookMate. All rights reserved.
        </p>
        <p className="mt-2 sm:mt-0 text-sm sm:text-base">
          Developed by <span className="font-semibold">Sajid Ali</span>
        </p>
      </div>
    </footer>
  );
}
