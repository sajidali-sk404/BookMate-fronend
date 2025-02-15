import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

import SidebarProfile from '../component/profile/SidebarProfile';
import MobileNav from '../component/profile/MobileNav';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.token);
  const headers ={
    id:localStorage.getItem("id"),
    authorization: `Baerer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
   const fetch = async () => {
    const response = await axios.get(`https://bookmate-backend-production-8e5e.up.railway.app/api/get-user-information`,{headers});
   setUserData(response.data)
   };
   fetch();
  }, []);

 

  return (
    <div className="flex flex-col md:flex-row py-8 md:px-12 px-2 ">
    {!userData && (<div className='flex justify-center items-center h-screen'>Loading...</div>)}

    {userData && (
      <>
    <div className="w-full md:w-1/6 h-screen  lg:h-screen rounded-lg  ">
      <SidebarProfile data={userData} />
      <MobileNav />
    </div>
  
    
    <div className="w-full md:w-5/6">
      <Outlet />
    </div>
    </>
    )}
  </div>
  );
};

export default UserProfile;
