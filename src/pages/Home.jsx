import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import BookCard from "../component/BookCard";
import SearchBooks from "../component/SearchBooks";

export default function Home() {
  const [randomBooks, setRandomBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch random books when the component mounts
  const fetchRandomBooks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/random-books`
      );
      setRandomBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching random books:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-500 to-gary-600 text-black py-20 px-6 sm:px-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Discover Your Next Favorite Book 📚
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.isArray(randomBooks) &&
            randomBooks.map((book) => <BookCard key={book._id} data={book} />)}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/books"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg hover:bg-blue-700 transition-all"
          >
            View All Books
          </Link>
        </div>
      </section>
    </>
  );
}
