import React from 'react'
import { Link } from 'react-router-dom'

function BookCard({ data }) {
  return (
        <div  className="bg-white p-6 rounded-lg shadow-md">
          <img className='w-52' src={data.url} alt="book img" />
          <h2 className="text-2xl font-semibold mt-1 mb-4">{data.title}</h2>
          <p className="text-gray-700 mb-2"><strong>Author:</strong> {data.author}</p>
          <p className="text-gray-700 mb-4"><strong>Genre:</strong> {data.genre}</p>
          <div className='flex text-center '>
            <Link to={`/books/${data._id}`} className=" bg-blue-500 w-full text-white p-2  rounded hover:bg-blue-600">
              View Details
            </Link>
          </div>
        </div>
  )
}

export default BookCard;
