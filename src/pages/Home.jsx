import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import BookCard from "../component/BookCard";
import SearchBooks from "../component/SearchBooks";

export default function Home() {
  const [randomBooks, setRandomBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRandomBooks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/random-books`
      );
      setRandomBooks(response.data);
    } catch (error) {
      console.error("Error fetching random books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomBooks();
  }, []);

  return (
    <>
      {/* Hero Section - Always visible instantly */}
      <section className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white py-20 px-6 sm:px-16 text-center shadow-inner">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
          Discover Your Next Favorite Book 📚
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-gray-300">
          Explore books that inspire, motivate, and transport you into new worlds.
        </p>
        <div className="max-w-xl mx-auto">
          <SearchBooks />
        </div>
      </section>

      {/* Recommended Books */}
      <section className="bg-gray-100 py-12 px-5 sm:px-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-gray-800">
          Recommended Books
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-4 shadow-md animate-pulse">
                <div className="bg-gray-200 h-[280px] rounded-xl mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.isArray(randomBooks) &&
              randomBooks.map((book) => <BookCard key={book._id} data={book} />)}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/books"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg hover:bg-blue-700 transition-all font-medium"
          >
            View All Books
          </Link>
        </div>
      </section>
    </>
  );
}
