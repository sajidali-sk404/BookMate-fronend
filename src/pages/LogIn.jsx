import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux'


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.email === "" || formData.password === "") {
        alert("All Field required")
      } else {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/sign-in`, formData)

        dispatch(authActions.Login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("role", response.data.role)

        navigate("/")
      }
    } catch (error) {
      alert(error.response.data.massage)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-xl w-full p-6 bg-white rounded-2xl shadow-lg ">
        <div>
          <h2 className="text-2xl font-semibold text-center mb-4">Log In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-md cursor-pointer">Log In</button>
            <div className='text-center text-gray-500 p-1'>Already have an acount?  <Link to='/signup' className='text-blue-600 hover:text-blue-800'>Sign up</Link></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
