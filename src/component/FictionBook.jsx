import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const FictionBooks = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("Fiction"); // ✅ Default to Fiction
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/books/category/${category}`
        );
        setBooks(response.data || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="py-6">
      {/* Category Selector */}
      <div className="flex justify-end items-center px-10 mb-6">
        <label
          htmlFor="category"
          className="mr-3 text-lg font-semibold text-gray-700"
        >
          Choose Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
        </select>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          No books found in <span className="font-semibold">{category}</span>.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
          {books.map((book) => (
            <BookCard key={book._id} data={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FictionBooks;
