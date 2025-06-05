import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function UserOderHistory() {
  const [OrderHistory, setOrderHistory] = useState([])

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Baerer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://book-mate-backend.vercel.app/api/getorder-history`, { headers });
        console.log(response)
        if (response.data && response.data.data) {
          setOrderHistory(response.data.data); // Ensure 'data' exists before setting state
        } else {
          console.log("Unexpected response structure:", response);
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetch();
  }, [])

  console.log("Order History State:", OrderHistory);

  return (
    <>
      {!OrderHistory && <div className='flex justify-center items-center h-screen'>Loading...</div>}{" "}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className='h-[80vh] p-4'>
          <div className='h-[100%] flex flex-col justify-center items-center' >
            <h1 className='text-5xl font-semibold text-gray-500 mb-8'>No Order History</h1>
          </div>
        </div>
      )}

      {OrderHistory.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 '>
          <h1 className='text-3xl md:text-5xl text-gray-600 font-semibold mb-8'>Your Order History</h1>
          <div className='mt-4 w-full rounded bg-gray-300 py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1 className='md:text-xl font-semibold'>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className='md:text-xl font-semibold'>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className='md:text-xl font-semibold'>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className='md:text-xl font-semibold'>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className='md:text-xl font-semibold'>Mode</h1>
            </div>
          </div>

          {OrderHistory.map((items, i) => {
            return (
              <div key={i} className='w-full rounded py-2 bg-gray-300 px-4 flex gap-4 hover:cursor-pointer'>
                <div className='w-[3%]'>
                  <h1 className='text-center'>{i + 1}</h1>
                </div>

                <div className='w-[22%]'>
                  <Link className='hover:text-blue-700' to={`/books/${items.book._id}`}>{items.book.title}</Link>
                </div>

                <div className='w-[45%]'>
                  <h1>{items.book.desc.slice(0, 50)}...</h1>
                </div>

                <div className='w-[9%]'>
                  <h1>{items.book.price}</h1>
                </div>

                <div className='w-[16%]'>
                  <h1 className='font-semibold'>
                    {items.status === "Order Placed" ? (
                      <div className='text-yellow-500'>{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className='text-red-500'>{items.status}</div>
                    ) : (
                      <div className='text-green-500'>{items.status}</div>
                    )}
                  </h1>
                </div>

                <div className='w-none md:[5%] hidden md:block'>
                  <h1 className='text-sm'>COD</h1>
                </div>
              </div>
            )
          })}

        </div>
      )}
    </>
  )
}

export default UserOderHistory;
