import React from 'react'
import { Link } from 'react-router-dom'

function BookCard({ data }) {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  return (
    <div className="bg-white p-4  rounded-lg ">
      <div className="w-52 mx-auto h-auto aspect-[3/4]">
        <img className="w-full h-full object-cover rounded-lg" src={data.url} alt={`Cover of ${data.title}`} />
      </div>
      <div className="">
        <h2 className="text-2xl font-semibold mt-1 mb-4">{truncateText(data.title, 15)}</h2>
        <p className="text-gray-700 mb-2"><strong>Author:</strong> {truncateText(data.author, 15)}</p>
        <p className="text-gray-700 mb-4"><strong>Genre:</strong> {truncateText(data.title, 15)}</p>
        <div className='flex text-center '>
          <Link to={`/books/${data._id}`} className=" bg-blue-500 w-full text-white p-2  rounded hover:bg-blue-600">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BookCard;
