import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUserLarge } from "react-icons/fa6";

function AllOrders() {
    const [AllOrders, setAllOrders] = useState()
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Baerer ${localStorage.getItem("token")}`,
    }

    useEffect(() => {
        // Fetch both book details and reviews when the component loads
        const fetchData = async () => {
            const response = await axios.get(`https://bookmate-backend-production-8e5e.up.railway.app/api/getall-orders`, { headers })
            setAllOrders(response.data.data)
        };

        fetchData();
    }, []);

    return (
        <>
            {!AllOrders && (<div className='flex justify-center items-center h-screen'>Loading...</div>)}
            {AllOrders && AllOrders.length === 0 && (
                <div className='h-[80vh] p-4'>
                    <div className='h-[100%] flex flex-col justify-center items-center' >
                        <h1 className='text-5xl font-semibold text-gray-500 mb-8'>No Order History</h1>
                    </div>
                </div>
            )}

            {AllOrders.length > 0 && (
                <div className='h-[100%] p-0 md:p-4 '>
                    <h1 className='text-3xl md:text-5xl text-gray-600 font-semibold mb-8'>All Orders</h1>
                    <div className='mt-4 w-full rounded bg-gray-300 py-2 px-4 flex gap-2'>
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
                    {AllOrders.map((items, i) => (
                        <div className='bg-gray-700 w-full rounded py-2 px-4 gap-2 hover:bg-gray-800 cursor-pointer'>
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
                                    <button className='hover:scale-105 transition-all duration-300'>
                                        {items.status === "Order placed" ? (
                                            <div className='text-yellow-500'>
                                                {items.status}
                                            </div>) : items.status === "Canceled" ? (
                                                <div className='text-red-500'>
                                                    {items.status}
                                                </div>) : (

                                            <div className='text-green-500'>
                                                items.status
                                            </div>
                                        )}
                                    </button>
                                    <div>
                                        <select name="status" id="" className='bg-gray-800'>{[
                                            "Order placed",
                                            "Out for delivery",
                                            "Delivered"
                                        ]}</select>
                                    </div>
                            </div>
                        </div>
                    ))}
                </div>

            )}
        </>
    )
}

export default AllOrders