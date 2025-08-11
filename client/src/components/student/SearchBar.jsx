import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {
    const navigate=useNavigate();
    const [input, setinput] = useState(data ? data :'');
    const onSearchHandler=(e) => {
      e.preventDefault();
      navigate('/course-list/' + input )
    }
    
  return (
    <div className=' w-full flex items-center justify-center mx-auto'>
      <form onSubmit={onSearchHandler} className='border md:w-4/7   border-gray-400/60 overflow-hidden flex justify-center bg-white rounded' action="">
        <img className='px-2' src={assets.search_icon} alt="search" />
        <input onChange={(e)=>setinput(e.target.value)} value={input} type="text" placeholder='Search for courses' className='outline-0 md:w-3/4 px-2 text-gray-600 py-2.5 ' />
        <button className='bg-blue-600 md:w-1/4 text-white px-4'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
