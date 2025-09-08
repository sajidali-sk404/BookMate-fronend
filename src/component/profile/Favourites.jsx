import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard";

function Favourites() {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, // fixed typo
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/getfavourite-books`,
          { headers }
        );
        setFavouriteBooks(response.data.data || []);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []); // ✅ run only once

  return (
    <div className="m-5">
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
        </div>
      )}

      {/* No favourites */}
      {!loading && favouriteBooks.length === 0 && (
        <div className="flex flex-col items-center justify-center text-gray-600 gap-4 h-64">
          <p className="text-lg md:text-2xl font-semibold">
            No Favourite Books Yet
          </p>
          <img
            className="w-12 md:w-20 opacity-70"
            src="https://cdn-icons-png.flaticon.com/512/3126/3126608.png"
            alt="No favourites"
          />
        </div>
      )}

      {/* Favourite books grid */}
      {!loading && favouriteBooks.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favouriteBooks.map((book) => (
            <BookCard key={book._id} data={book} favourite={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
