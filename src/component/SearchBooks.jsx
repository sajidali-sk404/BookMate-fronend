import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react"; // modern icon

const SearchBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // Fetch matching books as the user types (with debounce)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/searchBooks`,
          {
            params: { query: searchQuery },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setIsTyping(true);
  };

  const handleSuggestionClick = (bookId) => {
    navigate(`/books/${bookId}`);
    setSearchQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative max-w-xl w-full" ref={wrapperRef}>
      {/* Input Field */}
      <div className="flex items-center bg-white rounded-lg shadow-md border border-gray-300 px-3">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search by title, author, or genre..."
          value={searchQuery}
          onChange={handleChange}
          className="p-2 w-full bg-transparent focus:outline-none"
        />
      </div>

      {/* Suggestions Dropdown */}
      {isTyping && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fadeIn">
          {suggestions.length > 0 ? (
            suggestions.map((book) => (
              <li
                key={book._id}
                className="p-3 hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(book._id)}
              >
                <span className="font-semibold">{book.title}</span>{" "}
                <span className="text-gray-600 text-sm">by {book.author}</span>
              </li>
            ))
          ) : (
            searchQuery.trim() !== "" && (
              <li className="p-3 text-gray-500">No results found</li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBooks;
