import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Settings() {
  const [Value, setValue] = useState({ address: '' })
  const [ProfileData, setProfileData] = useState()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Baerer ${localStorage.getItem("token")}`
  }

  const ChangeHanle = (e) => {
    const {name ,value} = e.target;
    setValue({...Value ,[name]:value })
  }

  const SubmitHandle = async () => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/update-address`,Value, {headers});
    alert(response.data.massage)
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/get-user-information`, { headers });
        setProfileData(response.data)
        setValue({ address: response.data.address }); // Ensure 'data' exists before setting state
      } catch (error) {
        console.log(error)
      }
    }
    fetch();
  }, [])

  
  return (
    <div>
      {!ProfileData && (
        <div className='flex justify-center items-center h-screen'>Loading...</div>
      )}

      {ProfileData && (
        <div className='h-[100%] p-0 md:p-4'>
          <h1 className='text-3xl md:text-5xl mt-5 text-gray-700 font-semibold mb-8'>Settings</h1>

          <div className='flex max-sm:flex-col max-sm:gap-2 gap-12 '>
            <div>
              <label htmlFor="">Username</label>
              <p className='p-2 px-5 text-white rounded bg-gray-600 mt-2 font-semibold'>{ProfileData.username}</p>
            </div>
          <div>
            <label htmlFor="">Email</label>
            <p className='p-2 px-5 text-white rounded mt-2 bg-gray-600  font-semibold'>{ProfileData.email}</p>
          </div>
          <div>
            <label htmlFor="">Address</label>
            <p className='p-2 px-5 text-white rounded mt-2 bg-gray-600  font-semibold'>{ProfileData.address}</p>
          </div>
          </div>

          <div className='mt-4 flex flex-col'>
            <label htmlFor="">Address</label>
            <textarea
            className='p-2 bg-gray-300 border rounded mt-2 font-semibold'
            rows="5"
            placeholder='Address'
             name="address" 
             value={Value.address}
             onChange={ChangeHanle}
             />
          </div>
          <div className='mt-4 flex justify-end'>
            <button onClick={SubmitHandle} className='bg-yellow-500 font-semibold cursor-pointer px-3 py-2 rounded hover:bg-yellow-400'>Update</button>
          </div>

        </div>
      )}
    </div>
  )
}

export default Settings