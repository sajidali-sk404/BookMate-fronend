import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBooks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Fetch matching books as the user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim() === '') {
        setSuggestions([]); // Clear suggestions when input is empty
        return;
      }

      try {
        const response = await axios.get(`https://book-mate-backend.vercel.app/api/searchBooks`, {
          params: { query: searchQuery }
        });
        setSuggestions(response.data); // Set the suggestions in the state
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    };

    // Add a debounce effect (only fetch after the user stops typing for 300ms)
    const debounceTimeout = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimeout); // Cleanup timeout on each render
  }, [searchQuery]);

  // Handle input change
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setIsTyping(true);
  };

  const navigate = useNavigate();

  // Handle selecting a suggestion (e.g., navigate to book details page)
  const handleSuggestionClick = (bookId) => {
    // Navigate to the selected book's 
    navigate(`/books/${bookId}`);
    setSearchQuery(''); 
    setSuggestions([]); 
  };

  return (
    <div className="max-md:w-80 max-sm:w-60 w-xl">
    
      <input
        type="text"
        placeholder="Search for books by title, author, or genre"
        value={searchQuery}
        onChange={handleChange}
        className="p-2 border-2 border-gray-900 bg-gray-300 rounded  w-full"
      />

    
      {isTyping && suggestions.length > 0 && (
        <ul className="suggestions-list bg-gray-300 border border-gray-300 rounded mt-2 w-full">
          {suggestions.map((book) => (
            <li
              key={book._id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(book._id)} // Handle suggestion click
            >
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBooks;
