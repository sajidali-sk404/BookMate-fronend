import Books from './pages/Books';
import Home from './pages/Home'
import {
  BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './component/Navbar'
import Footer from './component/Footer.jsx'
import AddBook from './pages/AddBook';
import BookDetails from './component/BookDetails.jsx';
import AddReview from './component/AddReview.jsx';
import UpdateBook from './component/UpdateBook.jsx'
import UpdateReview from './component/UpdateReview.jsx';
import About from './pages/About.jsx';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Profile from './pages/Profile.jsx';
import Cart from './pages/Cart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store/auth.js';
import Favourites from './component/profile/Favourites.jsx';
import UserOderHistory from './component/profile/UserOderHistory.jsx';
import Settings from './component/profile/Settings.jsx';
import AllOrders from './component/profile/AllOrders.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyEmailPage from './component/VerifyEmailPage.jsx';


function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if(
      localStorage.getItem("id") &&
       localStorage.getItem("token") &&
        localStorage.getItem("role") 
    ) {
      dispatch(authActions.Login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[])

  return (
    <>
      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick 
        pauseOnHover 
        draggable 
        theme="colored" 
      />
        <Navbar />
        <Routes>
          <Route exact path="/"  element={<Home />} />
          <Route  path="/books"  element={<Books />} />
          <Route  path="/about"  element={<About />} />
          <Route  path="/books/:id"  element={<BookDetails />} />
          <Route  path="/books/:id/reviews"  element={<AddReview />} />
          <Route  path="/books/updatebook/:id"  element={<UpdateBook />} />
          <Route  path="/reviews/:id/edit"  element={<UpdateReview />} />       
          <Route  path="/login"  element={<LogIn />} />       
          <Route  path="/signup"  element={<SignUp />} />       
          <Route  path="/verifyemail"  element={<VerifyEmailPage />} />       
          <Route  path="/admin profile"  element={<Profile />} >
          <Route index element={<AllOrders />} />
          <Route  path="/admin profile/addbooks"  element={<AddBook />} />
          </Route>
          <Route  path="/profile"  element={<Profile />} >
            <Route index element={<Favourites />} />
            <Route path='/profile/orderhistory' element={<UserOderHistory />} />
            <Route path='/profile/settings' element={<Settings />} />
          </Route>       
          <Route  path="/cart"  element={<Cart />} />       
        </Routes>
        <Footer />


    </>
  )
}

export default App
