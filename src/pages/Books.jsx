import React, { useEffect, useState } from 'react'
import axios from 'axios'

import BookCard from '../component/BookCard';
import FictionBook from '../component/FictionBook';



export default function Books() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);


  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://book-mate-backend.vercel.app/api/books`, {
        params: { limit: 8, page }

      });
      const newBooks = response.data.books || [];

      // Add the new books to the existing list of books
      setBooks((prevBooks) => {
        const uniqueBooks = new Set([...prevBooks, ...newBooks]); // Ensure uniqueness
        return Array.from(uniqueBooks); // Convert Set back to array
      });
      // Check if there are more books to load
      setHasMore(response.data.currentPage < response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBooks();
  }, [page]);


  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1); // Load the next page
  };


  return (
    <>

      <FictionBook />
      <h1 className=' flex justify-center text-2xl   p-5 font-bold bg-gray-200 '>All Books</h1>

      <div className='grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10 bg-gray-200'>
        { books.map((book, index) => (
          <BookCard key={`${book._id}-${index}`} data={book} />
        ))}
      </div>

      <div className='text-center mb-4'>
        {hasMore && !loading && (
          <button
            onClick={handleSeeMore}
            className="text-blue-800 cursor-pointer   rounded hover:text-blue-600 hover:underline mt-4"
          >
            See More
          </button>
        )}
        {loading && <p>Loading more books...</p>}
        {!hasMore && !loading && <p>No more books to load.</p>}
      </div>

    </>
  )
}
