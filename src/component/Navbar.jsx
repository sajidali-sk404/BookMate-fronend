import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setactiveMenu] = useState('/')


  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  return (
    <nav className="bg-gray-600 p-4">

      <div className="container mx-auto md:px-6 flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          BookMate
        </Link>

        {/* Hamburger Menu (shown on small screens) */}
        <button
          className="text-white block sm:hidden focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Navbar Links (shown on larger screens) */}
        <div className="hidden sm:flex space-x-6 items-center">
          <Link to="/" className={
            activeMenu === "/"
              ? "text-gray-400 underline"
              : "text-white hover:text-gray-400"
          }
            onClick={() => {
              setactiveMenu("/");
            }}
            active={activeMenu}
          >
            Home
          </Link>

          <Link to="/books" className={
            activeMenu === "/books"
              ? "text-gray-400 underline"
              : "text-white hover:text-gray-400"
          }
            onClick={() => {
              setactiveMenu("/books");
            }}
            active={activeMenu}
          >
            Books
          </Link>

          
          {/* Conditionally render Cart, About, and Profile based on login status */}
          {isLoggedIn && (
            <>
              <Link
                to="/cart"
                className={
                  activeMenu === '/cart'
                    ? 'text-gray-400 underline'
                    : 'text-white hover:text-gray-400'
                }
                onClick={() => {
                  setactiveMenu('/cart');
                }}
                active={activeMenu}
              >
                Cart
              </Link>

              <Link
                to="/about"
                className={
                  activeMenu === '/about'
                    ? 'text-gray-400 underline'
                    : 'text-white hover:text-gray-400'
                }
                onClick={() => {
                  setactiveMenu('/about');
                }}
                active={activeMenu}
              >
                About
              </Link>
              {isLoggedIn === true && role === "user" && (
                <Link
                  to="/profile"
                  className={
                    activeMenu === '/profile'
                      ? 'text-gray-400 underline block'
                      : 'text-white hover:text-gray-400 block'
                  }
                  onClick={() => {
                    setactiveMenu('/profile');
                  }}
                  active={activeMenu}
                >
                  Profile
                </Link>
              )}
              {isLoggedIn === true && role === "admin" && (
                <Link
                  to="/admin profile"
                  className={
                    activeMenu === '/profile'
                      ? 'text-gray-400 underline'
                      : 'text-white hover:text-gray-400'
                  }
                  onClick={() => {
                    setactiveMenu('/profile');
                  }}
                  active={activeMenu}
                >
                  Admin Profile
                </Link>
              )}
            </>
          )}

          {isLoggedIn === false &&
            <div className='flex gap-4 text-white'>
              <Link to='/login' className={
                activeMenu === "/login"
                  ? "cursor-pointer transition-all duration-300 text-gray-400 bg-gray-700 rounded border px-4 py-2"
                  : "cursor-pointer transition-all duration-300 text-white rounded hover:bg-gray-800 border px-4 py-2"
              }
                onClick={() => {
                  setactiveMenu("/login");
                }}
                active={activeMenu}
              >Log In</Link>
              <Link to='/signup' className={
                activeMenu === "/signup"
                  ? "cursor-pointer transition-all duration-300 text-gray-400 bg-gray-700 rounded border px-4 py-2"
                  : "cursor-pointer transition-all duration-300 text-white rounded hover:bg-gray-800 border px-4 py-2"
              }
                onClick={() => {
                  setactiveMenu("/signup");
                }}
                active={activeMenu}
              >Sign Up</Link>
            </div>
          }
        </div>

        {/* Sidebar (shown on small screens) */}
        <div
          className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out bg-gray-600 w-64 p-6 sm:hidden`}
        >
          <button
            className="text-white block focus:outline-none mb-6"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <nav className="space-y-4">
            <Link to="/" className={
              activeMenu === "/"
                ? "text-gray-400 underline block"
                : "text-white hover:text-gray-400 block"
            }
              onClick={() => {
                setactiveMenu("/");
              }}
              active={activeMenu}
            >
              Home
            </Link>
            <Link to="/books" className={
              activeMenu === "/books"
                ? "text-gray-400 underline block"
                : "text-white hover:text-gray-400 block"
            }
              onClick={() => {
                setactiveMenu("/books");
              }}
              active={activeMenu}
            >
              Books
            </Link>
            

            {/* Conditionally render Cart, About, and Profile in sidebar */}
            {isLoggedIn && (
              <>
                <Link
                  to="/cart"
                  className={
                    activeMenu === '/cart'
                      ? 'text-gray-400 underline block'
                      : 'text-white hover:text-gray-400 block'
                  }
                  onClick={() => {
                    setactiveMenu('/cart');
                  }}
                  active={activeMenu}
                >
                  Cart
                </Link>
                <Link
                  to="/about"
                  className={
                    activeMenu === '/about'
                      ? 'text-gray-400 underline block'
                      : 'text-white hover:text-gray-400 block'
                  }
                  onClick={() => {
                    setactiveMenu('/about');
                  }}
                  active={activeMenu}
                >
                  About
                </Link>
                {isLoggedIn === true && role === "user" && (
                  <Link
                    to="/profile"
                    className={
                      activeMenu === '/profile'
                        ? 'text-gray-400 underline block'
                        : 'text-white hover:text-gray-400 block'
                    }
                    onClick={() => {
                      setactiveMenu('/profile');
                    }}
                    active={activeMenu}
                  >
                    Profile
                  </Link>
                )}

                {isLoggedIn === true && role === "admin" && (
                  <Link
                    to="/admin profile"
                    className={
                      activeMenu === '/profile'
                        ? 'text-gray-400 underline'
                        : 'text-white hover:text-gray-400'
                    }
                    onClick={() => {
                      setactiveMenu('/profile');
                    }}
                    active={activeMenu}
                  >
                    Admin Profile
                  </Link>
                )}
              </>
            )}


            {isLoggedIn === false &&
              <div className='flex items-start gap-4
            flex-col text-white'>
                <Link to='/login' className={
                  activeMenu === "/login"
                    ? "cursor-pointer transition-all duration-300  text-gray-400 underline block"
                    : "cursor-pointer transition-all duration-300 text-white hover:text-gray-400 block"
                }
                  onClick={() => {
                    setactiveMenu("/login");
                  }}
                  active={activeMenu}
                >Log In</Link>
                <Link to='/signup' className={
                  activeMenu === "/signup"
                    ? "cursor-pointer transition-all duration-300  text-gray-400 underline block"
                    : "cursor-pointer transition-all duration-300 text-white hover:text-gray-400 block"
                }
                  onClick={() => {
                    setactiveMenu("/signup");
                  }}
                  active={activeMenu}
                >Sign Up</Link>
              </div>
            }
          </nav>
        </div >
      </div >
    </nav >
  );
};

export default Navbar;