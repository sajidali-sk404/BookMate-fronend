import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHeart, FaHistory, FaCog, FaClipboardList } from "react-icons/fa";

function MobileNav() {
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();

  const linkClasses = (path) =>
    `flex flex-col items-center justify-center flex-1 py-2 transition-all ${
      location.pathname === path
        ? "text-blue-400 font-semibold"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <>
      {role === "user" && (
        <nav className="fixed bottom-0 left-0 w-full md:hidden bg-gray-800 border-t border-gray-700 flex justify-around z-50">
          <Link to="/profile" className={linkClasses("/profile")}>
            <FaHeart size={20} />
            <span className="text-xs">Favourites</span>
          </Link>
          <Link
            to="/profile/orderhistory"
            className={linkClasses("/profile/orderhistory")}
          >
            <FaHistory size={20} />
            <span className="text-xs">Orders</span>
          </Link>
          <Link
            to="/profile/settings"
            className={linkClasses("/profile/settings")}
          >
            <FaCog size={20} />
            <span className="text-xs">Settings</span>
          </Link>
        </nav>
      )}

      {role === "admin" && (
        <nav className="fixed bottom-0 left-0 w-full md:hidden bg-gray-800 border-t border-gray-700 flex justify-around z-50">
          <Link to="/admin profile" className={linkClasses("/admin profile")}>
            <FaClipboardList size={20} />
            <span className="text-xs">All Orders</span>
          </Link>
        </nav>
      )}
    </>
  );
}

export default MobileNav;
