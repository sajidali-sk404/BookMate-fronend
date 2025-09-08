import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddBook() {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Baerer ${localStorage.getItem("token")}`,
        role: "admin"
    }
    const [formData, setFormData] = useState({
        url: '',
        title: '',
        author: '',
        genre: '',
        price: '',
        desc: '',
        category: 'Fiction',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/addbook`, formData, { headers });
            console.log(response);
            toast.success('Book added successfully!' || response.data.message);
            // navigate(`/books`);
            setFormData({ url: '', title: '', author: '', price: '', genre: '', desc: '' }); // Reset form
        } catch (error) {
            console.error('Error adding book:', error.message);
            toast.error('Failed to add book. Please try again.');
        }
    };


    return (
        <div className='bg-gray-200 py-14'>
            <div className="max-w-2xl mx-auto   bg-gray-100 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Add a New Book</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="url" className="block text-gray-700">Book URL: <span className='font-extralight'>(Optional)</span> </label>
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
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Add Book
                    </button>  
                </form>
            </div>
        </div>
    );
};



export default AddBook
