import axios from 'axios'
import { useState, useEffect } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Cart() {
  const [Cart, setCart] = useState()
  const [Total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/getcart-books`, { headers });
      setCart(res.data.data);
      setLoading(false);
    }
    fetch();
  }, [Cart])

  const deleteHandle = async (bookid) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/removebook-from-cart/${bookid}`, {}, { headers });
      toast.success(response.data.message);
      

    } catch (error) {
      toast.error("Error removing book:", error.response ? error.response.data : error.message);
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
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/place-order`, { order: Cart }, { headers });
      toast.success(response.data.message)
      console.log(response.data )
      navigate('/profile/orderhistory')
    } catch (error) {
      console.log(error)
    }
  }

    if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
      </div>
    );
  }

 return (
  <>
    <div className="m-4 px-4 md:px-12 py-8">
      {/* Empty Cart */}
      {Cart && Cart.length === 0 && (
        <div className="h-[70vh] flex flex-col justify-center items-center text-gray-500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
            alt="Empty Cart"
            className="h-36 mb-4 opacity-70 animate-pulse"
          />
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="text-gray-400 mt-2">Add some books to see them here 📚</p>
        </div>
      )}

      {/* Cart with Items */}
      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10">Your Shopping Cart</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              {Cart.map((items, i) => (
                <div
                  key={i}
                  className="w-full border bg-white shadow-lg rounded-xl mb-6 p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl hover:scale-[1.01] transition"
                >
                  {/* Book Image */}
                  <img
                    src={items.url}
                    alt={items.title}
                    className="h-[22vh] md:h-[18vh] w-auto rounded-lg object-cover mx-auto md:mx-0"
                  />

                  {/* Book Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-900">{items.title}</h1>
                    <p className="mt-2 text-gray-600 hidden lg:block">{items.desc.slice(0, 100)}...</p>
                    <p className="mt-2 text-gray-600 hidden md:block lg:hidden">{items.desc.slice(0, 65)}...</p>
                    <p className="mt-2 text-gray-600 block md:hidden">{items.desc.slice(0, 100)}...</p>
                  </div>

                  {/* Price & Delete */}
                  <div className="flex flex-col items-center justify-between">
                    <h2 className="text-2xl font-bold text-green-600">PKR {items.price}</h2>
                    <button
                      onClick={() => deleteHandle(items._id)}
                      className="mt-4 flex items-center gap-2 bg-red-100 text-red-700 border border-red-700 rounded-lg px-4 py-2 hover:bg-red-200 transition"
                    >
                      <AiFillDelete size={20} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-[30%] w-full">
              <div className="sticky top-20 p-6 border bg-gradient-to-br from-gray-50 to-gray-200 shadow-xl rounded-xl">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Order Summary</h1>
                <div className="mt-4 flex items-center justify-between text-lg text-gray-700">
                  <span>{Cart.length} Books</span>
                  <span className="font-semibold text-green-600">PKR {Total}</span>
                </div>
                <button
                  onClick={placeOder}
                  className="mt-6 w-full rounded-lg py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold shadow-lg transition transform hover:scale-[1.02]"
                >
                  Place Your Order
                </button>
                <p className="mt-3 text-sm text-gray-500 text-center">Secure checkout • 100% safe</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  </>
);
}

export default Cart
