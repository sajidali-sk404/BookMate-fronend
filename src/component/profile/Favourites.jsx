import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard'


function Favourites() {
  const [favouriteBooks, setfavouriteBooks] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Baerer ${localStorage.getItem("token")}`,
    
}
  useEffect(  ()  => {
   const fecth = async () => {
    const response = await axios.get(`https://book-mate-backend.vercel.app/api/getfavourite-books`,{headers});
    setfavouriteBooks(response.data.data)
   }
   fecth();
  }, [favouriteBooks])
  

  return (
    <div className='m-5'>
    {favouriteBooks && favouriteBooks.length === 0 && (
      <div className='flex flex-col text-sm md:text-3xl gap-5 text-gray-600 items-center h-full justify-center'>
        No Favourites Book 
        <img className='w-8 md:w-16' src="https://cdn-icons-png.flaticon.com/512/3126/3126608.png" alt="" />
      </div>
    )}

    <div className='grid grid-cols-1  gap-5 md:grid-cols-2 lg:grid-cols-3'>
      {favouriteBooks && favouriteBooks.map((book, i) =>(
    <div key={i}>
    <BookCard data={book} favourite={true}/>
    </div>
    ))}
    </div>
    </div>
  )
}

export default Favourites