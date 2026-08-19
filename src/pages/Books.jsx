import { useEffect, useState } from "react";
import axios from "axios";

import BookCard from "../component/BookCard";
import FictionBook from "../component/FictionBook";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/books`,
        {
          params: { limit: 8, page },
        }
      );

      const newBooks = response.data.books || [];

      setBooks((prevBooks) => {
        const uniqueMap = new Map();
        [...prevBooks, ...newBooks].forEach((book) =>
          uniqueMap.set(book._id, book)
        );
        return Array.from(uniqueMap.values());
      });

      setHasMore(response.data.currentPage < response.data.totalPages);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const handleSeeMore = () => {
    if (!loading) setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <FictionBook />

      <h1 className="flex justify-center text-3xl font-bold py-6 bg-gray-100 text-gray-700 tracking-wide">
        All Books
      </h1>

      {initialLoading ? (
        <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10 bg-gray-100">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-white rounded-2xl p-4 shadow-md animate-pulse">
              <div className="bg-gray-200 h-[280px] rounded-xl mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="flex justify-center items-center py-20 text-gray-500 text-lg">
          No books available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10 bg-gray-100">
          {books.map((book) => (
            <BookCard key={book._id} data={book} />
          ))}
        </div>
      )}

      <div className="text-center mb-10">
        {hasMore && !initialLoading && (
          <button
            onClick={handleSeeMore}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "See More"
            )}
          </button>
        )}
      </div>
    </>
  );
}
