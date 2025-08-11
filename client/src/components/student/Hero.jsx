import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
    return (
        <div className='bg-gradient-to-b   md:p-15 lg:py-22  lg:px-40 flex gap-3 py-8  items-center h-auto justify-center flex-col from-cyan-100/70 w-full'>
            <h1 className='text-3xl md:text-5xl space-y- font-bold text-center p- ' >Empower your future with the courses designed to <span className='text-blue-600 md:text-5xl text-3xl py-4 font-bold '>fit your choice.</span><div className='flex mt-2 justify-center pl-10 w-full  '><img className='text-center' src={assets.sketch} alt="" /></div></h1>
            <p className=' text-gray-500 p-3 md:block hidden md:px-20 font-semibold  lg:px-40  text-center text-sm'>we bring together world-class instructors , interactive content , and a supportive community to help you achieve your personal and professional goals</p>
            <p className=' text-gray-500 p-3 md:hidden md:px-20 font-semibold  lg:px-40  text-center text-sm'>we bring together world-class instructors to help you achieve your  goals</p>
            <SearchBar />
            
        </div>
    )
}

export default Hero