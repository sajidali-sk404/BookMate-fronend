import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function BookCard({ data, favourite , onRemoved}) {
  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };


  const handleRemoveBookFromFavourites = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/removebook-from-favourite`,
        {},
        { headers }
      );
      toast.info(response.data.message || "Removed from favourites!");
       if (onRemoved) onRemoved(data._id); // 👈 remove from UI immediately
    } catch (error) {
      toast.error("Failed to remove from favourites");
    }
  };
 

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Book Image */}
      <div className="bg-gray-100 flex justify-center items-center h-[280px] md:h-[320px] overflow-hidden">
        <img
          className="h-full object-contain p-3"
          src={data.url}
          alt={`Cover of ${data.title}`}
          loading="lazy"
        />
      </div>

      {/* Book Info */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          {truncateText(data.title, 20)}
        </h2>
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-medium">Author:</span>{" "}
          {truncateText(data.author, 18)}
        </p>
        <p className="text-gray-600 text-sm mb-4">
          <span className="font-medium">Price:</span> {data.price} PKR
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Link
            to={`/books/${data._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg font-medium transition-colors"
          >
            View Details
          </Link>

          {favourite && (
            <button
              onClick={handleRemoveBookFromFavourites}
              className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors"
            >
              Remove from Favourites
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(BookCard);
