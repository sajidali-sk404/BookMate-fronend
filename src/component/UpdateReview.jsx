import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import { toast } from 'react-toastify';

export default function UpdateReview({ reviewId ,onClose }) {
  const [formData, setFormData] = useState({
    rating: 1,
    comment: '',
  });
  const [loading, setLoading] = useState(true);
  

  // Fetch the current review details when the component loads
  const fetchReviewDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/reviews/${reviewId}`);
      setFormData({
        rating: response.data.rating,
        comment: response.data.comment,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching review details:', error);
      toast.error('Failed to load review data.');
      setLoading(false);
    }
  };
  
useEffect(() => {
    if (reviewId) fetchReviewDetails();
  }, [reviewId]);


  // Handle form input changes
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
      await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/reviews/${reviewId}`, formData);
      toast.success('Review updated successfully!');
      onClose();

    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review. Please try again.');
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
    <div className="">
      <div className="max-w-1xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Update Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700">Rating:</label>
            <ReactStars
              count={5}
              onChange={handleRatingChange}
              size={30}
              activeColor="#ffd700"
              value={formData.rating} // Set current rating value
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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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
}
