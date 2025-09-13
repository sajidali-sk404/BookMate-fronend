import React, { useState } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import { toast } from 'react-toastify';

const AddReview = ({ bookId, onReviewAdded, onClose }) => {
  const [formData, setFormData] = useState({
    rating: 1,
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      rating: newRating,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        id: localStorage.getItem("userId"),   // ✅ user id from storage
        Authorization: `Bearer ${localStorage.getItem("token")}`, // if you use JWT
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/books/${bookId}/reviews`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );


      onReviewAdded(response.data.review);
      console.log(response);
      console.log(response.data);
      toast.success('🎉 Review added successfully!');
      setFormData({ rating: 1, comment: '' });
      onClose();
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('❌ Failed to add review. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 my-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Rating:</label>
          <ReactStars
            count={5}
            onChange={handleRatingChange}
            size={30}
            activeColor="#ffd700"
            value={formData.rating}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit Review
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
