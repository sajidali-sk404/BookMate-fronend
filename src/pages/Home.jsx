import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

import BookCard from '../component/BookCard';
import SearchBooks from '../component/SearchBooks';


export default function Home() {
  const [randomBooks, setRandomBooks] = useState([]);
  const [loading, setLoading] = useState(true);
 


  // Fetch random books when the component mounts
  const fetchRandomBooks = async () => {
    try {
      console.log(import.meta.env.BACKEND_URI)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/random-books`);
      setRandomBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching random books:', error);
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
      <div>
       
        
        <div className='flex flex-col justify-between mt-1 px-40 py-24 max-sm:pt-10   max-sm:px-6 bg-gray-400 gap-4'>
        <div>
          <SearchBooks />
        </div>
          <h1 className='text-2xl font-bold max-sm:mt-10 text-blue-800'>Find the Story That Speaks to You</h1>
          <p className='text-blue-900'>Explore books that connect with your heart and mind, one page at a time.</p>
          
        </div>
      </div>

      <div className='bg-gray-200 pt-10 px-5 pb-5  max-sm:px-2'>
        
        <h1 className="text-3xl max-sm:text-xl max-sm:mb-10  font-bold mb-10 text-center ">Recommended Books</h1>
          
        <div className='grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4  gap-8 px-10 bg-gray-200'>

      {Array.isArray(randomBooks) && randomBooks?.map((book) => (
          <BookCard key={`${book._id}`} data={book} /> 
        ))}

        </div>

       
         </div>

         <div className='text-center mb-10'>
            <Link className='  text-xl text-blue-800 hover:text-blue-600 hover:underline' to="/books">View All Books </Link>
          </div>
      </>
      )
}
