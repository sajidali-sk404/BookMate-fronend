import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUserLarge } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from '../../pages/SeeUserData';

function AllOrders() {
    const [AllOrders, setAllOrders] = useState()
    const [Option, setOption] = useState(-1)
    const [Values, setValues] = useState({ status: "" })
    const [UserDiv, setUserDiv] = useState("hidden")
    const [UserDivData, setUserDivData] = useState()
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Baerer ${localStorage.getItem("token")}`,
    }

    useEffect(() => {
        // Fetch both book details and reviews when the component loads
        const fetchData = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/getall-orders`, { headers })
            setAllOrders(response.data.data)
        };

        fetchData();
    }, [AllOrders]);



    const changeHandle = (e) => {
        const { value } = e.target;
        setValues({ status: value })
    }

    const submitChanges = async (i) => {
        const id = AllOrders[i]._id;
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api//update-status/${id}`,Values , {headers})
        alert(response.data.massage)
    }


    AllOrders && AllOrders.slice(AllOrders.length - 1, 1);
    return (
        <>
            {!AllOrders && (<div className='flex justify-center items-center h-screen'>Loading...</div>)}
            {AllOrders && AllOrders.length === 0 && (
                <div className='h-[80vh] p-4'>
                    <div className='h-[100%] flex flex-col justify-center items-center' >
                        <h1 className='text-5xl font-semibold text-gray-500 mb-8'>No Order </h1>
                    </div>
                </div>
            )}

            {AllOrders && Array.isArray(AllOrders) && AllOrders.length > 0 && (
                <div className='h-[100%] p-0 md:p-4 '>
                    <div className='flex justify-between items-center'>
                    <h1 className='text-3xl md:text-5xl text-gray-600 font-semibold mb-8'>All Orders</h1>
                         <Link to='/admin profile/addbooks'
                                 className='mb-2 md:text-2xl md:mr-10 border bg-green-500 text-white px-2 rounded py-1 hover:bg-green-600 transition-all duration-200'
                               >Add Book</Link>
                    </div>
                    <div className='mt-4 w-full rounded bg-gray-400 py-2 px-4 flex gap-2'>
                        <div className='w-[3%]'>
                            <h1 className='text-center'>Sr.</h1>
                        </div>
                        <div className='w-[40%] md:w-[22%]'>
                            <h1 className='md:text-xl font-semibold'>Books</h1>
                        </div>
                        <div className=' w-0 md:w-[45%] hidden md:block'>
                            <h1 className='md:text-xl font-semibold'>Description</h1>
                        </div>
                        <div className='w-[17%] md:w-[9%]'>
                            <h1 className='md:text-xl font-semibold'>Price</h1>
                        </div>
                        <div className='w-[30%] md:w-[16%]'>
                            <h1 className='md:text-xl font-semibold'>Status</h1>
                        </div>
                        <div className='w-[10%] md:w-[5%] hidden md:block'>
                            <h1 className='md:text-xl font-semibold'><FaUserLarge /></h1>
                        </div>
                    </div>
                    {AllOrders && AllOrders?.map((items, i) => (
                        <div className='bg-gray-300 w-full flex  rounded py-2 px-4 gap-2 hover:bg-gray-500 cursor-pointer'>
                            <div className='w-[3%]'>
                                <h1 className='text-center font-semibold'>{i + 1}</h1>
                            </div>
                            <div className='w-[40%] md:w-[22%]'>
                                <Link to={`/books/${items.book._id}`} className='hover:text-blue-600'>{items.book.title}</Link>
                            </div>
                            <div className=' w-0 md:w-[45%] hidden md:block'>
                                <h1 className='md:text-xl font-semibold'>{items.book.desc.slice(0, 50)}...</h1>
                            </div>
                            <div className='w-[17%] md:w-[9%]'>
                                <h1 className='md:text-xl font-semibold'>{items.book.price}</h1>
                            </div>
                            <div className='w-[30%] md:w-[16%]'>
                                <h1 className='md:text-xl font-semibold'>{items.book.price}</h1>
                                <button onClick={() => setOption(i)} className='hover:scale-105 cursor-pointer transition-all duration-300'>
                                    {items.status === "Order placed" ? (
                                        <div className='text-yellow-500'>
                                            {items.status}
                                        </div>) : items.status === "Canceled" ? (
                                            <div className='text-red-500'>
                                                {items.status}
                                            </div>) : (

                                        <div className='text-green-500'>
                                            {items.status}
                                        </div>
                                    )}
                                </button>
                                <div className={`${Option === i ? "flex" : "hidden"} gap-2 mt-4`}>
                                    <select onChange={changeHandle} value={Values.status} name="status" id="" className='bg-gray-300'>{[
                                        "Order placed",
                                        "Out for delivery",
                                        "Delivered",
                                        "Canceled"
                                    ].map((items, i) => (
                                        <option value={items} key={i}>{items}</option>
                                    ))
                                    }</select>
                                    <button onClick={() => { setOption(-1); submitChanges(i); }} className='text-green-500 cursor-pointer hover:text-pink-600'><FaCheck />
                                    </button>
                                </div>
                            </div>
                           <div className='w-[10%] md:w-[5%]'>
                            <button className='text-xl hover:text-orange-500'
                            onClick={() => {setUserDiv("fixed")
                                setUserDivData(items.user)
                            }}
                            ><IoOpenOutline /></button>
                           </div>
                    
                        </div>
                    ))}
                </div>
            )}
            {UserDivData &&(
                <SeeUserData UserDivData={UserDivData} UserDiv={UserDiv} setUserDiv={setUserDiv}/>
            )}
        </>
    )
}

export default AllOrders