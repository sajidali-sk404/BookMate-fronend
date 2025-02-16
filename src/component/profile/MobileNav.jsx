import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';


function MobileNav() {
    const role = useSelector((state) => state.auth.role);
  return (
    <>
  {role === "user" && (
    <div className='w-full flex md:hidden  bg-gray-600 rounded text-white px-4 py-1 justify-between items-center mt-4  '>
    <Link to='/profile'
    className='mb-2 text-lg hover:font-semibold transition-all duration-200'
    >Favourites</Link>
    <Link className='mb-2 text-lg hover:font-semibold transition-all duration-200' to='/profile/orderhistory'>Order History</Link>
    <Link className='mb-2 text-lg hover:font-semibold transition-all duration-200' to='/profile/settings'>Settings</Link>
</div>
  )}
  {role === "admin" && (
    <div className='w-full flex md:hidden  bg-gray-600 rounded text-white px-4 py-1 justify-between items-center mt-4  '>
    <Link to='/admin profile'
    className='mb-2 text-lg hover:font-semibold transition-all duration-200'
    >All Orders</Link>
    
</div>
  )}
  </>
  )}

export default MobileNav