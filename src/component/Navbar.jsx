import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("/");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const navLinkClasses = (path) =>
    activeMenu === path
      ? "text-blue-400 font-semibold border-b-2 border-blue-400 transition"
      : "text-white hover:text-blue-300 transition";

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-2xl font-bold tracking-wide hover:text-blue-300 transition"
        >
          BookMate
        </Link>

        {/* Hamburger Button */}
        <button
          className="text-white block md:hidden focus:outline-none"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Navbar Links (Desktop) */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className={navLinkClasses("/")}
            onClick={() => setActiveMenu("/")}
          >
            Home
          </Link>

          <Link
            to="/books"
            className={navLinkClasses("/books")}
            onClick={() => setActiveMenu("/books")}
          >
            Books
          </Link>

          <Link
            to="/about"
            className={navLinkClasses("/about")}
            onClick={() => setActiveMenu("/about")}
          >
            About
          </Link>
          {isLoggedIn && (
            <>
              {role === "user" && (
                <Link
                  to="/cart"
                  className={navLinkClasses("/cart")}
                  onClick={() => setActiveMenu("/cart")}
                >
                  Cart
                </Link>
              )}

              {role === "user" && (
                <Link
                  to="/profile"
                  className={`${activeMenu === "/profile"
                      ? "bg-green-600"
                      : "bg-green-500 hover:bg-green-600"
                    } text-white px-4 py-2 rounded-md font-medium transition`}
                  onClick={() => setActiveMenu("/profile")}
                >
                  Profile
                </Link>
              )}


              {role === "admin" && (
                <Link
                  to="/admin profile"
                  className={`${activeMenu === "/profile"
                      ? "bg-green-600"
                      : "bg-green-500 hover:bg-green-600"
                    } text-white px-4 py-2 rounded-md font-medium transition`}
                  onClick={() => setActiveMenu("/profile")}
                >
                  Admin Profile
                </Link>
              )}
            </>
          )}

          {!isLoggedIn && (
            <div className="flex gap-4">
              <Link
                to="/login"
                className={`${activeMenu === "/login"
                    ? "bg-blue-600 text-white"
                    : "text-white border border-blue-500 hover:bg-blue-600 hover:text-white"
                  } px-4 py-2 rounded-md font-medium transition`}
                onClick={() => setActiveMenu("/login")}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className={`${activeMenu === "/signup"
                    ? "bg-blue-600 text-white"
                    : "text-white border border-blue-500 hover:bg-blue-600 hover:text-white"
                  } px-4 py-2 rounded-md font-medium transition`}
                onClick={() => setActiveMenu("/signup")}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden shadow-lg`}
      >
        <div className="p-6 flex flex-col space-y-6">
          <Link
            to="/"
            className={navLinkClasses("/")}
            onClick={() => {
              setActiveMenu("/");
              toggleSidebar();
            }}
          >
            Home
          </Link>
          <Link
            to="/books"
            className={navLinkClasses("/books")}
            onClick={() => {
              setActiveMenu("/books");
              toggleSidebar();
            }}
          >
            Books
          </Link>

          {isLoggedIn && (
            <>
              {role === "user" && (
                <Link
                  to="/cart"
                  className={navLinkClasses("/cart")}
                  onClick={() => {
                    setActiveMenu("/cart");
                    toggleSidebar();
                  }}
                >
                  Cart
                </Link>
              )}
              <Link
                to="/about"
                className={navLinkClasses("/about")}
                onClick={() => {
                  setActiveMenu("/about");
                  toggleSidebar();
                }}
              >
                About
              </Link>
              {role === "user" && (
                <Link
                  to="/profile"
                  className="bg-green-500 px-4 py-2 rounded-md block text-center font-medium hover:bg-green-600 transition"
                  onClick={() => {
                    setActiveMenu("/profile");
                    toggleSidebar();
                  }}
                >
                  Profile
                </Link>
              )}
              {role === "admin" && (
                <Link
                  to="/admin profile"
                  className="bg-green-500 px-4 py-2 rounded-md block text-center font-medium hover:bg-green-600 transition"
                  onClick={() => {
                    setActiveMenu("/profile");
                    toggleSidebar();
                  }}
                >
                  Admin Profile
                </Link>
              )}
            </>
          )}

          {!isLoggedIn && (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="bg-blue-500 px-4 py-2 rounded-md text-center font-medium hover:bg-blue-600 transition"
                onClick={() => {
                  setActiveMenu("/login");
                  toggleSidebar();
                }}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 px-4 py-2 rounded-md text-center font-medium hover:bg-blue-600 transition"
                onClick={() => {
                  setActiveMenu("/signup");
                  toggleSidebar();
                }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
