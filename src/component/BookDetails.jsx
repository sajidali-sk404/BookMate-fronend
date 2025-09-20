import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaEdit, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import AddReview from "./AddReview";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateBook from "./UpdateBook";
import UpdateReview from "./UpdateReview";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavouriteClicked, setIsFavouriteClicked] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showEditBook, setShowEditBook] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [isCartClicked, setIsCartClicked] = useState(false);


    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem("id");

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const handleEdit = (review) => {
        setEditingReviewId(review._id);
    };

    const fetchBookDetails = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URI}/api/getbook/${id}`
            );
            setBook(response.data.book);
        } catch (error) {
            console.error("Error fetching book details:", error);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URI}/api/books/${id}/reviews`
            );
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    // ✅ Fetch user favourites on mount to check if this book is already favourited
    const fetchFavourites = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URI}/api/getfavourite-books`,
                { headers }
            );
            const favourites = res.data.data || [];
            if (favourites.some((fav) => fav._id === id)) {
                setIsFavouriteClicked(true);
            }
        } catch (error) {
            console.error("Error fetching favourites:", error);
        }
    };

    // ✅ Fetch user Cart on mount to check if this book is already Cart
    const checkCartStatus = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URI}/api/getcart-books`,
                { headers }
            );

            if (response.data?.data?.some((cartBook) => cartBook._id === id)) {
                setIsCartClicked(true);
            }
        } catch (error) {
            console.error("Error checking cart status:", error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            await fetchBookDetails();
            await fetchReviews();
            await fetchFavourites();
            await checkCartStatus();
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

    const handleDeleteBook = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this book!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/api/deletebook`, {
                    headers,
                });
            } catch (error) {
                toast.error("❌ Failed to delete the book. Please try again.");
            }
        }
    };

    const handleDeleteReview = async (reviewId, bookId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this review!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(
                    `${import.meta.env.VITE_BACKEND_URI}/api/reviews/${reviewId}`
                );
                toast.info("✅ Review deleted successfully!");
                navigate(`/books/${bookId}`);
            } catch (error) {
                toast.error("❌ Failed to delete the review. Please try again.");
            }
        }
    };

    // ✅ Handle adding book to favourites
    const handleFavourite = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URI}/api/addbook-to-favourite`,
                {},
                { headers }
            );

            if (response.data.message === "Book already In Favourite") {
                toast.info("This book is already in your favourites");
                setIsFavouriteClicked(true);
            } else {
                setIsFavouriteClicked(true);
            }
        } catch (error) {
            console.error("add-to-favourite error:", error);
            toast.error("Failed to add book to favourites");
        }
    };

    const handleCart = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URI}/api/addbook-to-cart`,
                {},
                { headers }
            );

            setIsCartClicked(true); // ✅ persist button state
            if (response.data.message === "Book already in cart") {
                toast.info("This book is already in your Cart");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add book to cart"
            );
            console.error("add-to-cart error:", error);
        }
    };


    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {book ? (
                <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg">
                    {/* LEFT - Book Image */}
                    <div className="flex justify-center items-start">
                        <img
                            src={book.url}
                            alt={book.title}
                            className="w-72 md:w-96 rounded-lg shadow-lg"
                        />
                    </div>

                    {/* RIGHT - Book Info */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                                {book.title}
                            </h1>
                            <p className="text-lg text-gray-600 mb-2">
                                <strong>Genre:</strong> {book.genre}
                            </p>
                            <p className="text-xl font-semibold text-red-500 mb-4">
                                Price: {book.price} PKR
                            </p>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                <strong>Description:</strong> {book.desc}
                            </p>
                        </div>

                        {/* Buttons */}
                        {isLoggedIn && role === "user" && (
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handleCart}
                                    className={`flex items-center gap-2 py-2 px-4 rounded-lg w-full justify-center ${isCartClicked
                                            ? "bg-yellow-600 text-white transition-all delay-100 "
                                            : "bg-yellow-300 hover:bg-yellow-400 text-black"
                                        }`}
                                >
                                    <FaShoppingCart /> {!isCartClicked ? "Add to Cart" : "Added to Cart"}
                                </button>

                                <button
                                    onClick={handleFavourite}
                                    className={`flex items-center gap-2 py-2 px-4 rounded-lg w-full justify-center ${isFavouriteClicked
                                            ? "bg-red-500 transition-all delay-100 text-white"
                                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                        }`}
                                >
                                    <FaRegHeart /> {!isFavouriteClicked ? "Add to Favourite" : "Added to Favourite"}
                                </button>
                            </div>
                        )}

                        {isLoggedIn && role === "admin" && (
                            <div className="flex gap-4 mt-6">
                                {showEditBook ? (
                                    <UpdateBook onClose={() => setShowEditBook(false)} />
                                ) : (
                                    <>
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white flex gap-2 items-center rounded-lg py-2 px-4"
                                            onClick={() => setShowEditBook(true)}
                                        >
                                            <FaEdit /> Edit Book
                                        </button>
                                        <button
                                            onClick={handleDeleteBook}
                                            className="bg-red-500 hover:bg-red-600 text-white flex gap-2 items-center rounded-lg py-2 px-4"
                                        >
                                            <MdDelete /> Delete Book
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p>Book not found.</p>
            )}

            {/* Reviews Section */}
            <div className="mt-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Customer Reviews</h2>

                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="mb-6 p-5 bg-gray-50 rounded-lg shadow-sm border"
                        >
                            {/* Reviewer name */}
                            <p className="text-gray-800 mb-2 font-semibold">
                                {review.user?.username || "Anonymous"}
                            </p>

                            {/* Stars */}
                            <ReactStars
                                count={5}
                                value={review.rating}
                                size={24}
                                edit={false}
                                activeColor="#fbbf24"
                            />

                            {/* Comment */}
                            <p className="text-gray-600 mt-2">{review.comment}</p>

                            {/* Action Buttons (Edit/Delete) */}
                            <div className="flex justify-end gap-3 mt-3">
                                {editingReviewId === review._id ? (
                                    <UpdateReview
                                        reviewId={review._id}
                                        onClose={() => setEditingReviewId(null)}
                                    />
                                ) : (
                                    <>
                                        {/* Show Edit only if review belongs to current logged in user */}
                                        {review.user?._id === currentUserId && (
                                            <button
                                                onClick={() => handleEdit(review)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded flex items-center gap-1"
                                            >
                                                <FaEdit /> Edit
                                            </button>
                                        )}

                                        {/* Show Delete only if user is admin */}
                                        {isLoggedIn && role === "admin" && (
                                            <button
                                                onClick={() =>
                                                    handleDeleteReview(review._id, review.bookId)
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded flex items-center gap-1"
                                            >
                                                <MdDelete /> Delete
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                )}
            </div>

            {/* Add Review */}
            {isLoggedIn && (
                <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
                >
                    {showReviewForm ? "Cancel Review" : "Write a Review"}
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
    );
};

export default BookDetails;
