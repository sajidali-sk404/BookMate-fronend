import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

function SidebarProfile({ data }) {
  const role = useSelector((state) => state.auth.role);
  const [activeMenu, setActiveMenu] = useState("/");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear();
    navigate("/");
  };

  const menuItemClasses = (path) =>
    `block px-4 py-2 rounded-lg transition-all duration-200 ${
      activeMenu === path
        ? "bg-blue-600 text-white font-semibold shadow"
        : "text-gray-200 hover:bg-gray-500 hover:text-white"
    }`;
    
  return (
    <aside className="bg-gray-800 text-white w-full md:w-50 max-md:w-64 min-h-screen flex flex-col justify-between p-6 sticky top-20 li">
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <img
          className="w-28 h-28 rounded-full ring-4 ring-white object-cover"
          src={
            data?.avatar ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="Profile"
        />
        <h1 className="mt-3 text-xl font-bold">{data?.username}</h1>
        <p className="text-gray-400 text-sm">{data?.email}</p>
        <div className="w-full mt-4 h-[1px] bg-gray-600"></div>
      </div>

      {/* Menu Section */}
      <nav className="flex flex-col gap-2 mt-6">
        {role === "user" && (
          <>
            <Link
              to="/profile"
              className={menuItemClasses("/profile")}
              onClick={() => setActiveMenu("/profile")}
            >
              Favourites
            </Link>
            <Link
              to="/profile/orderhistory"
              className={menuItemClasses("/profile/orderhistory")}
              onClick={() => setActiveMenu("/profile/orderhistory")}
            >
              Order History
            </Link>
            <Link
              to="/profile/settings"
              className={menuItemClasses("/profile/settings")}
              onClick={() => setActiveMenu("/profile/settings")}
            >
              Settings
            </Link>
          </>
        )}

        {role === "admin" && (
          <Link
            to="/admin profile"
            className={menuItemClasses("/admin profile")}
            onClick={() => setActiveMenu("/admin profile")}
          >
            All Orders
          </Link>
        )}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-8 flex items-center cursor-pointer justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-semibold transition-all duration-200 shadow"
      >
        <IoIosLogOut size={20} /> Log Out
      </button>
    </aside>
  );
}

export default SidebarProfile;
