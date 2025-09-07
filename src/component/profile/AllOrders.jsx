import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserLarge, FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "../../pages/SeeUserData";
import { toast } from "react-toastify";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [optionIndex, setOptionIndex] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/getall-orders`,
          { headers }
        );
        setOrders(response.data.data || []);
      } catch (err) {
        console.error("Error fetching orders", err);
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (e) => {
    setValues({ status: e.target.value });
  };

  const submitChanges = async (i) => {
    const id = orders[i]?._id;
    if (!id) return;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/update-status/${id}`,
        values,
        { headers }
      );
      toast.success(response.data.message || "Status updated!");
      setOptionIndex(-1);

      // update local state instead of refetching all
      setOrders((prev) =>
        prev.map((order, idx) =>
          idx === i ? { ...order, status: values.status } : order
        )
      );
    } catch (err) {
      console.error("Error updating status", err);
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-500">
        <h1 className="text-4xl md:text-5xl font-semibold">No Orders</h1>
        <p className="mt-2">You don’t have any orders yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center flex-wrap">
          <h1 className="text-3xl md:text-5xl text-gray-700 font-bold mb-4">
            All Orders
          </h1>
          <Link
            to="/admin profile/addbooks"
            className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Add Book
          </Link>
        </div>

        {/* Table Header */}
        <div className="hidden md:flex bg-gray-200 p-3 rounded-lg font-semibold text-gray-700">
          <div className="w-[5%]">#</div>
          <div className="w-[25%]">Book</div>
          <div className="w-[30%]">Description</div>
          <div className="w-[10%]">Price</div>
          <div className="w-[20%]">Status</div>
          <div className="w-[10%] text-center">
            <FaUserLarge />
          </div>
        </div>

        {/* Orders */}
        {orders.map((order, i) => (
          <div
            key={order?._id || i}
            className="flex flex-col md:flex-row items-start md:items-center bg-white rounded-lg shadow p-4 my-3 hover:shadow-lg transition"
          >
            <div className="w-full md:w-[5%] font-semibold">{i + 1}</div>

            <div className="w-full md:w-[25%]">
              {order?.book ? (
                <Link
                  to={`/books/${order.book._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {order.book.title}
                </Link>
              ) : (
                <span className="text-red-500">Book Deleted</span>
              )}
            </div>

            <div className="hidden md:block w-[30%] text-gray-600">
              {order?.book?.desc
                ? `${order.book.desc.slice(0, 50)}...`
                : "No description"}
            </div>

            <div className="w-full md:w-[10%] font-semibold text-gray-700">
              {order?.book?.price ?? "N/A"}
            </div>

            <div className="w-full md:w-[20%] mt-2 md:mt-0">
              <button
                onClick={() => setOptionIndex(i)}
                className="text-sm font-medium px-2 py-1 rounded-lg cursor-pointer transition"
              >
                {order.status === "Order placed" && (
                  <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                    {order.status}
                  </span>
                )}
                {order.status === "Canceled" && (
                  <span className="text-red-600 bg-red-100 px-2 py-1 rounded">
                    {order.status}
                  </span>
                )}
                {order.status === "Delivered" && (
                  <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
                    {order.status}
                  </span>
                )}
                {order.status === "Out for delivery" && (
                  <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded">
                    {order.status}
                  </span>
                )}
              </button>

              {optionIndex === i && (
                <div className="flex items-center gap-2 mt-2">
                  <select
                    onChange={handleStatusChange}
                    value={values.status}
                    className="border p-1 rounded"
                  >
                    {["Order placed", "Out for delivery", "Delivered", "Canceled"].map(
                      (status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      )
                    )}
                  </select>
                  <button
                    onClick={() => submitChanges(i)}
                    className="text-green-600 hover:text-pink-600 text-lg"
                  >
                    <FaCheck />
                  </button>
                </div>
              )}
            </div>

            <div className="w-full md:w-[10%] flex justify-end">
              <button
                className="text-xl text-gray-600 hover:text-orange-500"
                onClick={() => {
                  setUserDiv("fixed");
                  setUserDivData(order.user);
                }}
              >
                <IoOpenOutline />
              </button>
            </div>
          </div>
        ))}
      </div>

      {userDivData && (
        <SeeUserData
          UserDivData={userDivData}
          UserDiv={userDiv}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
}

export default AllOrders;
