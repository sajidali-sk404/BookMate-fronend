import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import DeleteBook from './DeleteBook';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const BookDetails = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch book details
    const fetchBookDetails = async () => {
        try {
            const response = await axios.get(`https://bookmate-backend-production-8e5e.up.railway.app/api/getbook/${id}`);
            setBook(response.data.book);
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };

    // Fetch reviews for the book
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`https://bookmate-backend-production-8e5e.up.railway.app/api/books/${id}/reviews`);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        // Fetch both book details and reviews when the component loads
        const fetchData = async () => {
            await fetchBookDetails();
            await fetchReviews();
            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleDelete = async (reviewId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this review?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://bookmate-backend-production-8e5e.up.railway.app/api/reviews/${reviewId}`);
            alert('Review deleted successfully!');
            // Optionally refetch reviews after delete
            setReviews(reviews.filter((review) => review._id !== reviewId));
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Failed to delete the review. Please try again.');
        }
    };


    return (
        <>
            <div className="max-w-2xl mx-auto mt-3 p-4">
                {book ? (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <img className='w-52 py-2' src={book.url} alt="" />
                        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
                        <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author}</p>
                        <p className="text-gray-700 mb-2"><strong>Genre:</strong> {book.genre}</p>
                        <p className="text-gray-700 mb-4"><strong>Description:</strong> {book.desc}</p>
                        <a href={`https://www.amazon.com/s?k=book+prime+deals&adgrpid=167679127418&hvadid=711546562470&hvdev=c&hvlocphy=9198978&hvnetw=g&hvqmt=b&hvrand=3593060656639287526&hvtargid=kwd-979505776500&hydadcr=21183_13332213&tag=hydglogoo-20&ref=pd_sl_7ii60hkmn6_b`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            Read more about this book
                        </a>

                        {/* Display Reviews */}
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review._id} className="mb-4 p-4 border rounded-lg">
                                        <p className="text-gray-700 mb-2"><strong>Reviewer: </strong> {review.reviewerName}</p>
                                        <ReactStars
                                            count={5}
                                            value={review.rating}
                                            size={24}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className="text-gray-700 mb-2"><strong>Comment:</strong> {review.comment}</p>
                                        <div className='flex justify-end gap-5'>
                                            <Link to={`/reviews/${review._id}/edit`} className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white">
                                                <FaEdit />
                                            </Link>
                                            <button onClick={() => handleDelete(review._id)} className="bg-red-500 cursor-pointer hover:bg-red-600 text-white py-2 px-4 rounded">
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet. Be the first to review this book!</p>
                            )}
                        </div>
                        <div className='mx-auto mt-2 border-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                            <Link className='flex justify-center items-center p-2' to={`/books/${id}/reviews`}>Add Review</Link>
                        </div>
                        <div className='flex justify-between px-1 mt-2 '>
                            <Link to={`/books/updatebook/${id}`} className='bg-green-500 hover:bg-green-600 text-white rounded pt-2 px-16 max-sm:px-1'>UPDATE BOOK</Link>
                            <DeleteBook />
                        </div>
                    </div>
                ) : (
                    <p>Book not found.</p>
                )}
            </div>


        </>
    );
};

export default BookDetails;
