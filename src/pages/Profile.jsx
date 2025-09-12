import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

import SidebarProfile from '../component/profile/SidebarProfile';
import MobileNav from '../component/profile/MobileNav';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.token);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!headers.id || !headers.authorization || headers.authorization === "Bearer null") {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/get-user-information`,
          { headers }
        );
        // since backend returns { user: {...} }
        setUserData(response.data);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        if (err.response?.status === 403) {
          navigate("/login"); // token invalid/expired
        }
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);





  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row py-8 md:px-12 px-2 ">
      <div className="hidden md:block md:w-1/4 lg:w-1/5 h-full sticky top-8">
        <SidebarProfile data={userData} />
      </div>

      {/* Sidebar (mobile overlay) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex">
          <div className="w-3/4 bg-gray-700 h-full p-4 text-white z-50">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-right w-full mb-4 text-xl font-bold hover:text-red-400"
            >
              ✕
            </button>
            <SidebarProfile data={userData} />
          </div>
          {/* Click outside closes sidebar */}
          <div
            className="flex-1"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Main content */}
      <div className="w-full md:w-4/5 lg:w-4/5 md:pl-8 pb-20 md:pb-0">
        <Outlet />
      </div>

      {/* Mobile bottom nav (with menu button) */}
      <MobileNav onOpenSidebar={() => setIsSidebarOpen(true)} />
    </div>
  );
};

export default UserProfile;
