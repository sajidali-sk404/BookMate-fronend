import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserOrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/getorder-history`,
          { headers }
        );
        if (response.data?.data) {
          setOrderHistory(response.data.data);
        } else {
          console.warn("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // 🛠 Helper: status badge
    const getStatusBadge = (status) => {
    const colors = {
      "Order placed": "bg-yellow-100 text-yellow-700",
      Canceled: "bg-red-100 text-red-700",
      Delivered: "bg-green-100 text-green-700",
      "Out for delivery" : "text-orange-600 bg-orange-100"
    };

    return (
      <span
        className={`px-2 py-1 rounded text-sm font-medium ${colors[status] || "bg-gray-100 text-gray-700"
          }`}
      >
        {status}
      </span>
    );
  };

  // 🛠 Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  // 🛠 Empty state
  if (!orderHistory.length) {
    return (
      <div className="h-[80vh] flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-500 mb-4">
          No Order History
        </h1>
        <p className="text-gray-400">Your past orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-6">
      <h1 className="text-2xl md:text-4xl text-gray-700 font-bold mb-6">
        Your Order History
      </h1>

      <div className="hidden md:flex bg-gray-100 p-3 rounded font-semibold text-gray-700">
        <div className="w-[5%] text-center">#</div>
        <div className="w-[25%]">Book</div>
        <div className="w-[40%]">Description</div>
        <div className="w-[10%]">Price</div>
        <div className="w-[15%]">Status</div>
        <div className="w-[5%]">Mode</div>
      </div>

      <div className="space-y-3 mt-4">
        {orderHistory.map((item, i) => (
          <div
            key={item._id || i}
            className="flex flex-col bg-white shadow-sm rounded-lg p-3 md:p-4 hover:shadow-md transition space-y-4"
          >
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              {/* Order number + status */}
              <div className="font-medium text-gray-600">Order #{i + 1}</div>
              <div>{getStatusBadge(item.status)}</div>
            </div>

            {/* Books in this order */}
            {item.books?.length ? (
              item.books.map((book, idx) => (
                <div
                  key={book._id || idx}
                  className="flex flex-col md:flex-row items-start md:items-center border-b last:border-0 py-2"
                >
                  {/* Book Title */}
                  <div className="md:w-[25%] font-semibold text-blue-600">
                    <Link to={`/books/${book._id}`} className="hover:underline">
                      {book.title}
                    </Link>
                  </div>

                  {/* Description */}
                  <div className="md:w-[45%] text-sm text-gray-600">
                    {book.desc ? `${book.desc.slice(0, 60)}...` : "N/A"}
                  </div>

                  {/* Price */}
                  <div className="md:w-[15%] font-semibold text-gray-800">
                    {book.price ? `$${book.price}` : "-"}
                  </div>

                  {/* Mode */}
                  <div className="md:w-[15%] text-sm text-gray-500">COD</div>
                </div>
              ))
            ) : (
              <span className="text-red-500 italic">No books in this order</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserOrderHistory;
