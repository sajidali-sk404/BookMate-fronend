import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


function Cart() {
  const [Cart, setCart] = useState()
  const [Total, setTotal] = useState(0)

  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Baerer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`https://bookmate-backend-production-8e5e.up.railway.app/api/getcart-books`, { headers });
      setCart(res.data.data);


    }
    fetch();
  }, [Cart])

  const deleteHandle = async (bookid) => {
    try {
      const response = await axios.put(`https://bookmate-backend-production-8e5e.up.railway.app/api/removebook-from-cart/${bookid}`, {}, { headers });

      alert(response.data.massage);

    } catch (error) {
      console.log("Error removing book:", error.response ? error.response.data : error.message);
    }

  }

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((item) => {
        total += item.price;
      })
      setTotal(total);
      total = 0
    }
  }, [Cart])

  const placeOder = async () => {
    try {
      const response = await axios.post(`https://bookmate-backend-production-8e5e.up.railway.app/api/place-order`, { order: Cart }, { headers });
      console.log(response)
      alert(response.data.massage)
      navigate('/profile/orderhistory')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className='m-4 px-12 py-8'>
        {!Cart && <div className='flex justify-center items-center h-screen'>Loading...</div>}
        {Cart && Cart.length === 0 && (
          <div className='h-full flex justify-center items-center' >
            Empty Cart
          </div>
        )}

        {Cart && Cart.length > 0 && (
          <>
            <h1 className='text-5xl font-semibold text-gray-500 mb-8'>Your Cart</h1>
            {Cart.map((items, i) => (
              <div key={i} className='w-full border bg-gray-300  my-4 rounded flex flex-col md:flex-row p-4 justify-between items-center'>
                <img src={items.url} alt="" className='h-[20vh] md:h-[10] rounded object-cover' />

                <div className='w-full md:w-auto'>
                  <h1 className='text-2xl text-start mt-2 md:mt-0'>{items.title}</h1>
                  <p className='mt-2 hidden lg:block'>{items.desc.slice(0, 100)}...</p>
                  <p className='mt-2 hidden md:block lg:hidden'>{items.desc.slice(0, 65)}...</p>
                  <p className='mt-2 block md:hidden'>{items.desc.slice(0, 100)}...</p>
                </div>
                <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                  <h2 className='flex text-3xl font-semibold'>pkr{items.price}</h2>
                  <button onClick={() => deleteHandle(items._id)} className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'><AiFillDelete /></button>
                </div>
              </div>
            ))}
          </>
        )}


        {Cart && Cart.length > 0 && (
          <div className='flex justify-end items-center '>
            <div className='mt-4  p-4 w-[20vw] border bg-gray-300'>
              <div className='px-4  rounded'>
                <h1 className='text-3xl font-semibold'>Total Amount</h1>
                <div className='mt-3 flex items-center justify-between text-xl'><h2>{Cart.length} Books </h2> <h2>pkr{Total}</h2></div>
              </div>
              <div className='w-[100%] mt-3'>
                <button onClick={placeOder} className='rounded border py-2 bg-green-600 hover:bg-green-800 text-white cursor-pointer px-4py-2 flex justify-center w-full font-semibold'>Place Your Order</button>
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  )
}

export default Cart
