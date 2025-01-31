import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';

export default function UpdateReview() {
  const { id } = useParams(); // Get the review ID from the URL
  const [formData, setFormData] = useState({
    reviewerName: '',
    rating: 1,
    comment: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the current review details when the component loads
  const fetchReviewDetails = async () => {
    try {
      const response = await axios.get(`https://bookmate-backend-production-8e5e.up.railway.app/api/reviews/${id}`);
      setFormData({
        reviewerName: response.data.reviewerName,
        rating: response.data.rating,
        comment: response.data.comment,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching review details:', error);
      alert('Failed to load review data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewDetails();
  }, [id]);

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
      await axios.put(`https://bookmate-backend-production-8e5e.up.railway.app/api/reviews/${id}`, formData);
      alert('Review updated successfully!');
      navigate(`/books`); // Navigate back to the book details page
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-200 py-14">
      <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Update Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="reviewerName" className="block text-gray-700">Reviewer:</label>
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
        </form>
      </div>
    </div>
  );
}
