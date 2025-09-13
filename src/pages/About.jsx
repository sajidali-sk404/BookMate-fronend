import { useSelector } from "react-redux";
import { FaBookReader, FaUsers, FaStar, FaRocket } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="my-16 mx-6 md:mx-20 lg:mx-40">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">About <span className="text-blue-600">BookMate</span></h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Welcome to <strong>BookMate</strong> – your ultimate companion in the world of books!  
          We believe reading transforms lives, sparks imagination, and builds communities.  
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-12 bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaRocket className="text-blue-600" /> Our Mission
        </h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          At BookMate, our mission is simple: to make discovering, exploring, and enjoying books easier and more enjoyable than ever.  
          We connect readers with their next great read through <span className="font-semibold text-blue-600">personalized recommendations, insightful reviews,</span> and a user-friendly experience for all literary tastes.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose BookMate?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border rounded-xl shadow hover:shadow-md transition">
            <h3 className="flex items-center gap-2 font-semibold text-lg text-gray-800">
              <FaStar className="text-yellow-500" /> Personalized Recommendations
            </h3>
            <p className="mt-2 text-gray-600">
              With BookMate's smart recommendation engine, you’ll discover books tailored to your preferences and reading history.
            </p>
          </div>
          <div className="p-6 bg-white border rounded-xl shadow hover:shadow-md transition">
            <h3 className="flex items-center gap-2 font-semibold text-lg text-gray-800">
              <FaBookReader className="text-blue-500" /> Curated Collections
            </h3>
            <p className="mt-2 text-gray-600">
              Explore curated book lists across genres like fiction, non-fiction, mystery, fantasy, and more.
            </p>
          </div>
          <div className="p-6 bg-white border rounded-xl shadow hover:shadow-md transition">
            <h3 className="flex items-center gap-2 font-semibold text-lg text-gray-800">
              <FaUsers className="text-green-500" /> Community Reviews
            </h3>
            <p className="mt-2 text-gray-600">
              Join a vibrant community of readers. Share your reviews and connect with book lovers worldwide.
            </p>
          </div>
          <div className="p-6 bg-white border rounded-xl shadow hover:shadow-md transition">
            <h3 className="flex items-center gap-2 font-semibold text-lg text-gray-800">
              📚 Unlimited Exploration
            </h3>
            <p className="mt-2 text-gray-600">
              From trending titles to hidden gems, BookMate helps you uncover books that match your unique taste.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Start Your Reading Adventure 🚀</h1>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Whether you're seeking motivation, relaxation, or an escape into new worlds, BookMate is here to guide your journey.  
          Dive into your next great read today!
        </p>
        {!isLoggedIn && (
        <button
         onClick={() => navigate("/signup")}
         className="bg-white text-blue-600 cursor-pointer font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
          Join BookMate Now
        </button>
        )}
      </div>
    </div>
  );
}

export default About;
