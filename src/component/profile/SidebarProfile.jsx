import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth'



function SidebarProfile({ data }) {
  const role = useSelector((state) => state.auth.role);
  const [activeMenu, setactiveMenu] = useState('/')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className=' bg-gray-600 rounded p-4 gap-16 flex flex-col justify-between items-center  text-white'>
      <div className=' flex flex-col  items-center  text-white'>
        <img className='w-28 rounded-full p-2' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
        <h1 className='text-xl'>{data.username}</h1>
        <p>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-gray-300 hidden lg:block'></div>
      </div>

    {role === "user" && (
        <div className='w-full md:flex hidden flex-col bg-gray-600 rounded text-white px-4 py-1 justify-between items-center mt-4  '>
        <Link to='/profile'
        className={
            activeMenu === "/profile"
              ? "text-white mb-2 text-lg hover:font-semibold transition-all duration-200 underline"
              : "text-white  mb-2 text-lg hover:font-semibold transition-all duration-200 "
          }
            onClick={() => {
              setactiveMenu("/profile");
            }}
            active={activeMenu}
        >Favourites</Link>
        <Link  to='/profile/orderhistory'
        className={
          activeMenu === "/profile/orderhistory"
            ? "text-white mb-2 text-lg hover:font-semibold transition-all duration-200 underline"
            : "text-white  mb-2 text-lg hover:font-semibold transition-all duration-200 "
        }
          onClick={() => {
            setactiveMenu("/profile/orderhistory");
          }}
          active={activeMenu}
        >Order History</Link>
        <Link  to='/profile/settings'
         className={
          activeMenu === "/profile/settings"
            ? "text-white mb-2 text-lg hover:font-semibold transition-all duration-200 underline"
            : "text-white  mb-2 text-lg hover:font-semibold transition-all duration-200 "
        }
          onClick={() => {
            setactiveMenu("/profile/settings");
          }}
          active={activeMenu}
        >Settings</Link>
    </div>
      )}

     {role === "admin" && (
       <div className='w-full lg:flex flex-col text-xl justify-center hidden items-center '>
       <Link to='/admin profile'
         className={
          activeMenu === "/admin profile"
            ? "text-white mb-2 text-lg hover:font-semibold transition-all duration-200 underline"
            : "text-white  mb-2 text-lg hover:font-semibold transition-all duration-200 "
        }
          onClick={() => {
            setactiveMenu("/admin profile");
          }}
       >All Order</Link>
      
     </div>
     )}

      <button
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id")
          localStorage.clear("token")
          localStorage.clear("role")
          navigate('/');
        }}
        className='flex w-full gap-2 justify-center items-center 
      hover:bg-gray-700 cursor-pointer font-medium text-xl border py-2 
       text-center rounded transition-all duration-200'>Log Out <IoIosLogOut /></button>
    </div>
  )
}

export default SidebarProfile
