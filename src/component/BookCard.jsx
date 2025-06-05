import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'

function BookCard({ data, favourite }) {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Baerer ${localStorage.getItem("token")}`,
    bookid: data._id,
    
}

  const handleRemoveBookFromFavourites = async () => {
    const response = await axios.put(`https://book-mate-backend.vercel.app/api/removebook-from-favourite`,{},{headers})
    alert(response.data.massage)
  }

  return (
    <div className="bg-white p-2  rounded-lg ">
      <div className="bg-gray-50 flex justify-center items-center rounded-lg">
        <img className="h-[52vh] rounded-lg p-1" src={data.url} alt={`Cover of ${data.title}`} />
      </div>
      <div className="">
        <h2 className="text-2xl font-semibold mt-1 mb-4">{truncateText(data.title, 15)}</h2>
        <p className="text-gray-700 mb-2"><strong>Author:</strong> {truncateText(data.author, 15)}</p>
        <p className="text-gray-700 mb-4"><strong>Price:</strong> {data.price}pkr</p>
        <div className='flex text-center '>
          <Link to={`/books/${data._id}`} className=" bg-blue-500 w-full text-white p-2  rounded hover:bg-blue-600">
            View Details
          </Link>
        </div>
        {favourite && (        <div className='flex mt-2 text-center '>
          <button onClick={handleRemoveBookFromFavourites} className=" cursor-pointer bg-gray-400 w-full text-white p-2  rounded hover:bg-gray-500">
            Remove from favourite
          </button>
        </div>
        )}
      </div>
    </div>
  )
}

export default BookCard;
