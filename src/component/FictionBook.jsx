import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

const FictionBooks = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState(''); // Default to Fiction
 

  // Fetch books by category whenever the category changes
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/books/category/${category}`);
        setBooks(response.data);
       
      } catch (error) {
        console.error('Error fetching books:', error);
       
      }
    };

    fetchBooks();
  }, [category]);

  // Handle category change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };



  return (
    <>
      <div className="pb-2 pr-8 place-self-end font-medium ">
        <label className='font-bold' htmlFor="category">Choose : </label>
        <select className='p-2' id="category" value={category} onChange={handleCategoryChange}>
          <option>Select One</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
        </select>  
      </div>

      <div className='grid grid-cols-1 mb-5 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10 bg-gray-200'>
      {Array.isArray(books) &&books.map((book) => (

          <BookCard key={book._id} data={book} /> 
        ))}
    </div>
    </>
  );
};

export default FictionBooks;
