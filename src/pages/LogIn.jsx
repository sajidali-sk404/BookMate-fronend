import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(""); // <-- success / error message

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setMessage("⚠️ All fields are required");
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/sign-in`,
        formData
      );

      // Store auth details
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      dispatch(authActions.Login());
      dispatch(authActions.changeRole(response.data.role));

      setMessage("✅ Login successful... 🎉");
      setTimeout(() => {
        navigate("/");
      }, 1500); // small delay so user sees the message
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  if(message === "Please verify your email before login."){
    onclick(navigate("/verifyemail"));
  }
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl border border-gray-200">

        {/* ✅ Animated Banner */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`mb-4 p-3 rounded-lg text-center font-medium shadow-md ${
                message.includes("successful")
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : `bg-red-100 text-red-700 border border-red-300`
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 p-3 w-full rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="mt-1 p-3 w-full rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-md"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Signup link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
