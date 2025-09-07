import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import AddReview from './AddReview';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import UpdateBook from './UpdateBook';
import UpdateReview from './UpdateReview';




const BookDetails = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavouriteClicked, setIsFavouriteClicked] = useState();
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showEditBook, setShowEditBook] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState(null);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    const navigate = useNavigate()
    // Fetch book details
    const fetchBookDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/getbook/${id}`);
            setBook(response.data.book);
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };

    // Fetch reviews for the book
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/books/${id}/reviews`);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Baerer ${localStorage.getItem("token")}`,
        bookid: id
    }

    useEffect(() => {
        // Fetch both book details and reviews when the component loads
        const fetchData = async () => {
            await fetchBookDetails();
            await fetchReviews();
            setLoading(false);
        };

        fetchData();
    }, [id, fetchReviews]);



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-600">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
            </div>
        );
    }

    const handleDelete = async (reviewId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Review!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {

            try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/api/reviews/${reviewId}`);
                toast.success('🎉 Review deleted successfully!');
                // Optionally refetch reviews after delete
                setReviews(reviews.filter((review) => review._id !== reviewId));
            } catch (error) {
                console.error('Error deleting review:', error);
                toast.error('❌ Failed to delete the review. Please try again.');
            }
        }
    };

    const handleDeleteBook = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this book!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/api/deletebook`, { headers });
                toast.success('Deleted!', 'Book deleted successfully!', 'success');
                navigate('/books');
            } catch (error) {
                console.error('Error deleting book:', error);
                toast.error('Error!', '❌ Failed to delete the book. Please try again.', 'error');
            }
        }
    };



    const handleFavourite = async () => {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/addbook-to-favourite`, {}, {
            headers
        })
        setIsFavouriteClicked(true);

        toast.success(response.data.massage)
    }

    const handleCart = async () => {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/addbook-to-cart`, {}, {
            headers
        })

        toast.success(response.data.massage)
    }



    return (
        <>
            <div className="max-w-2xl mx-auto mt-3 p-4">
                {book ? (
                    <div className=" bg-white p-6 rounded-lg shadow-md">
                        <div className='max-md:flex-col flex gap-5 justify-center items-center bg-gray-200'>
                            <img className='w-52 py-2' src={book.url} alt="" />
                            {isLoggedIn === true && role === "user" && <div className='flex gap-5 mt-5 text-2xl flex-col'>
                                <button
                                    onClick={handleFavourite}
                                    className={`cursor-pointer  ${isFavouriteClicked
                                        ? 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white'
                                        : 'bg-gray-200'
                                        }`}
                                >
                                    <FaRegHeart />
                                </button>

                                <button onClick={handleCart} className='cursor-pointer'><FaShoppingCart /></button>
                            </div>}
                            {isLoggedIn === true && role === "admin" && <div className='flex gap-5 pb-4 text-xl md:flex-col'>
                                {showEditBook && (
                                    <UpdateBook
                                        onClose={() => setShowEditBook(false)}
                                    />
                                )}
                                {!showEditBook && (
                                    <>
                                        <button className='bg-green-500 hover:bg-green-600 text-white flex gap-2 justify-center items-center rounded p-2  max-sm:px-1'
                                            onClick={() => setShowEditBook(!showEditBook)}
                                        >
                                            <FaEdit /> BOOK
                                        </button>

                                        <button
                                            onClick={handleDeleteBook}
                                            className="bg-red-500 text-white p-2 flex justify-center items-center  max-sm:px-1 cursor-pointer rounded hover:bg-red-600"
                                        >
                                            <MdDelete /> BOOK
                                        </button>
                                    </>
                                )}

                            </div>}
                        </div>
                        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
                        <div className='flex gap-10 items-center'>
                            <p className="text-gray-700 mb-2"><strong>Genre:</strong> {book.genre}</p>
                            <p className="text-red-500 mb-2"><strong className='text-gray-700'>Price: </strong> {book.price}</p>
                        </div>
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
                                            {editingReviewId === review._id && (
                                                <UpdateReview reviewId={review._id} onClose={() => setEditingReviewId(null)} />
                                            )}
                                            {editingReviewId !== review._id && (
                                                <>
                                                    <button
                                                        onClick={() => setEditingReviewId(review._id)}
                                                        className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    {isLoggedIn === true && role === "admin" && (
                                                        <button onClick={() => handleDelete(review._id)} className="bg-red-500 cursor-pointer hover:bg-red-600 text-white py-2 px-4 rounded">
                                                            <MdDelete />
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet. Be the first to review this book!</p>
                            )}
                        </div>

                        {isLoggedIn === true && (
                            <button
                                onClick={() => setShowReviewForm(!showReviewForm)}
                                className="w-full mt-2 border-2 bg-blue-500 text-white rounded hover:bg-blue-600 p-2"
                            >
                                {showReviewForm ? "Cancel" : "Add Review"}
                            </button>
                        )}
                        {showReviewForm && (
                            <AddReview
                                bookId={id}
                                onReviewAdded={(newReview) => setReviews([...reviews, newReview])}
                                onClose={() => setShowReviewForm(false)}
                            />
                        )}
                    </div>
                ) : (
                    <p>Book not found.</p>
                )}
            </div>


        </>
    );
};

export default BookDetails;
