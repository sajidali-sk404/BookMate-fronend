import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const AddReview = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    reviewerName: '',
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

  // Update rating when stars are clicked
  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      rating: newRating,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://book-mate-backend.vercel.app/api/books/${id}/reviews`, formData);
      console.log(response.data);
      alert('Review added successfully!');
      navigate(`/books/${id}`)
      setFormData({ reviewerName: '', rating: 1, comment: '' }); 
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 my-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="reviewerName" className="block text-gray-700">Reviewer Name:</label>
          <input
            type="text"
            id="reviewerName"
            name="reviewerName"
            value={formData.reviewerName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rating:</label>
          <ReactStars
          formData={formData}
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
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
