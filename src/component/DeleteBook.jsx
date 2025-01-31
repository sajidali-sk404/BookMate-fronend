import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const { id } = useParams(); 
 
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://bookmate-backend-production-8e5e.up.railway.app/api/deletebook/${id}`);
      alert('Book deleted successfully!');
      navigate('/'); 
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete the book. Please try again.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white py-2 px-16 max-sm:px-1 cursor-pointer rounded hover:bg-red-600"
    >
      DELETE BOOK
    </button>
  );
};

export default DeleteBook;
