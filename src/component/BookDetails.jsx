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
import BookCard from "./BookCard";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [similarBooks, setSimilarBooks] = useState([]);
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

    const getHeaders = () => ({
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    });

    const handleEdit = (review) => {
        setEditingReviewId(review._id);
    };

    useEffect(() => {
        let isMounted = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(true);
        setIsFavouriteClicked(false);
        setIsCartClicked(false);

        const token = localStorage.getItem("token");
        const headers = getHeaders();

        const fetchAllData = async () => {
            try {
                const promises = [
                    axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/getbook/${id}`),
                    axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/books/${id}/reviews`),
                    axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/books/similar/${id}`),
                ];

                if (isLoggedIn && token) {
                    promises.push(
                        axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/getfavourite-books`, { headers })
                    );
                    promises.push(
                        axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/getcart-books`, { headers })
                    );
                }

                const results = await Promise.allSettled(promises);

                if (!isMounted) return;

                // Book details
                if (results[0].status === "fulfilled") {
                    setBook(results[0].value.data.book);
                }

                // Reviews
                if (results[1].status === "fulfilled") {
                    setReviews(results[1].value.data || []);
                }

                // Similar books
                if (results[2].status === "fulfilled") {
                    setSimilarBooks(results[2].value.data || []);
                }

                // Favourites
                if (results[3] && results[3].status === "fulfilled") {
                    const favourites = results[3].value.data?.data || [];
                    if (favourites.some((fav) => fav._id === id)) {
                        setIsFavouriteClicked(true);
                    }
                }

                // Cart
                if (results[4] && results[4].status === "fulfilled") {
                    const cartBooks = results[4].value.data?.data || [];
                    if (cartBooks.some((cartBook) => cartBook._id === id)) {
                        setIsCartClicked(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching book details data:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchAllData();

        return () => {
            isMounted = false;
        };
    }, [id, isLoggedIn]);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse">
                <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg">
                    <div className="h-96 bg-gray-200 rounded-lg w-full"></div>
                    <div className="flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-24 bg-gray-200 rounded w-full"></div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
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
                    headers: getHeaders(),
                });
                toast.success("✅ Book deleted successfully!");
                navigate("/books");
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
                setReviews(reviews.filter((r) => r._id !== reviewId));
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
                { headers: getHeaders() }
            );

            if (response.data.message === "Book already In Favourite") {
                toast.info("This book is already in your favourites");
                setIsFavouriteClicked(true);
            } else {
                toast.success("Added to favourites!");
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
                { headers: getHeaders() }
            );

            setIsCartClicked(true);
            if (response.data.message === "Book already in cart") {
                toast.info("This book is already in your Cart");
            } else {
                toast.success("Added to cart!");
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
                            className="w-72 md:w-96 rounded-lg shadow-lg object-cover max-h-[450px]"
                            loading="lazy"
                        />
                    </div>

                    {/* RIGHT - Book Info */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                                {book.title}
                            </h1>
                            <p className="text-lg text-gray-600 mb-2">
                                <strong>Genre:</strong> <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded ml-2">{book.genre}</span>
                            </p>
                            <p className="text-lg text-gray-600 mb-2">
                                <strong>Author:</strong> {book.author}
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
                                    className={`flex items-center gap-2 py-2.5 px-4 rounded-lg w-full justify-center font-medium transition-all ${isCartClicked
                                            ? "bg-yellow-600 text-white"
                                            : "bg-yellow-400 hover:bg-yellow-500 text-black"
                                        }`}
                                >
                                    <FaShoppingCart /> {!isCartClicked ? "Add to Cart" : "Added to Cart"}
                                </button>

                                <button
                                    onClick={handleFavourite}
                                    className={`flex items-center gap-2 py-2.5 px-4 rounded-lg w-full justify-center font-medium transition-all ${isFavouriteClicked
                                            ? "bg-red-500 text-white"
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
                <div className="text-center py-20 bg-white rounded-2xl shadow p-6">
                    <p className="text-xl text-gray-600">Book not found.</p>
                </div>
            )}

            {/* Reviews Section */}
            <div className="mt-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Customer Reviews</h2>

                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="mb-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100"
                        >
                            <p className="text-gray-800 mb-1 font-semibold">
                                {review.user?.username || "Anonymous"}
                            </p>

                            <ReactStars
                                count={5}
                                value={review.rating}
                                size={22}
                                edit={false}
                                activeColor="#fbbf24"
                            />

                            <p className="text-gray-600 mt-2">{review.comment}</p>

                            <div className="flex justify-end gap-3 mt-3">
                                {editingReviewId === review._id ? (
                                    <UpdateReview
                                        reviewId={review._id}
                                        onClose={() => setEditingReviewId(null)}
                                    />
                                ) : (
                                    <>
                                        {review.user?._id === currentUserId && (
                                            <button
                                                onClick={() => handleEdit(review)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded flex items-center gap-1 transition"
                                            >
                                                <FaEdit /> Edit
                                            </button>
                                        )}

                                        {isLoggedIn && role === "admin" && (
                                            <button
                                                onClick={() =>
                                                    handleDeleteReview(review._id, review.bookId)
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded flex items-center gap-1 transition"
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
                    <p className="text-gray-500 bg-white p-4 rounded-xl border border-gray-100">No reviews yet. Be the first to review!</p>
                )}
            </div>

            {/* Add Review Button */}
            {isLoggedIn && (
                <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow transition"
                >
                    {showReviewForm ? "Cancel Review" : "Write a Review"}
                </button>
            )}
            {showReviewForm && (
                <AddReview
                    bookId={id}
                    onReviewAdded={(newReview) => setReviews([newReview, ...reviews])}
                    onClose={() => setShowReviewForm(false)}
                />
            )}

            {/* Similar Books Section */}
            <div className="mt-16 border-t border-gray-200 pt-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                    Similar Books You Might Like 📚
                </h2>
                {similarBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {similarBooks.map((similarBook) => (
                            <BookCard key={similarBook._id} data={similarBook} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 bg-white p-4 rounded-xl border border-gray-100">
                        No similar books found at the moment.
                    </p>
                )}
            </div>
        </div>
    );
};

export default BookDetails;
