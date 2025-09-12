import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateBook = ({onClose}) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    author: '',
    price: '',
    genre: '',
    desc: '',
    category: 'fiction',
  });
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id
  }
  // Fetch the current book details when the component loads
  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/getbook/${id}`);
      setFormData({
        url: response.data.book.url,
        title: response.data.book.title,
        author: response.data.book.author,
        price: response.data.book.price,
        genre: response.data.book.genre,
        desc: response.data.book.desc,
        category: response.data.book.category,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching book details:', message.error);
      toast.error('Failed to load book data.');
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/updatebook`, formData, { headers });
      toast.success('Book updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update book. Please try again.');
    }
  };

   if (loading) {
    return (
      <div className="flex justify-center items-center h-5 text-gray-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className=' absolute top-20 right-80'>
      <div className="min-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
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
            <label htmlFor="price" className="block text-gray-700">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
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
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-400 text-white py-2 mt-2 px-4 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
