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
function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/"  element={<Home />} />
          <Route  path="/books"  element={<Books />} />
          <Route  path="/addbooks"  element={<AddBook />} />
          <Route  path="/about"  element={<About />} />
          <Route  path="/books/:id"  element={<BookDetails />} />
          <Route  path="/books/:id/reviews"  element={<AddReview />} />
          <Route  path="/books/updatebook/:id"  element={<UpdateBook />} />
          <Route  path="/reviews/:id/edit"  element={<UpdateReview />} />       
        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App
