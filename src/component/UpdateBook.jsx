import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,  useNavigate } from 'react-router-dom';

const UpdateBook = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    author: '',
    genre: '',
    desc: '',
    category:'fiction',
  });
  const [loading, setLoading] = useState(true);

  // Fetch the current book details when the component loads
  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`https://bookmate-backend-production-8e5e.up.railway.app/api/getbook/${id}`);
      setFormData({
        url: response.data.book.url,
        title: response.data.book.title,
        author: response.data.book.author,
        genre: response.data.book.genre,
        desc: response.data.book.desc,
        category:response.data.book.category,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching book details:', massage.error);
      alert('Failed to load book data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://bookmate-backend-production-8e5e.up.railway.app/api/updatebook/${id}`, formData);
      alert('Book updated successfully!');
      navigate(`/books/${id}`); // Navigate to the book details page after successful update
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-gray-200 py-14'>
    <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Update Book Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="url" className="block text-gray-700">Book URL: <span className='font-extralight'>(Optional)</span></label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-700">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="desc" className="block text-gray-700">Description:</label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className='mb-4'>
        <label>Category: 
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
        </select>
      </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 cursor-pointer text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
    </div>
  );
};

export default UpdateBook;
