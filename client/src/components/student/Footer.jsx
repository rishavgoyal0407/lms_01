import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <footer className='w-full md:p-8 bg-gray-900 p-3 text-left mt-8'>
            <div className='flex items-start gap-8'>
                <div className='w-full'>
                    <img className='pb-5' src={assets.logo_dark} alt='logo' />
                    <p className='text-sm text-gray-300 font-sans'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat vero ut provident minus a quos eveniet deleniti expedita temporibus cupiditate ad, placeat porro nulla illum, quod voluptate officiis quae commodi?</p>
                </div>
                <div className='flex flex-col text-gray-400 items-cener md:items-start w-full' >
                    <h2 className='text-white pb-2'>Company</h2>
                    <ul className='text-sm'>
                        <li ><a href="">Home</a></li>
                        <li><a href="">About us</a></li>
                        <li><a href="">Contact us</a></li>
                        <li><a href="">Privacy policy</a></li>
                       
                    </ul>
                </div>
                <div className='md:flex hidden  w-full flex-col gap-5 items-start'>
                <h2 className='text-gray-300 font-semibold'>Subscribe to our newsletter</h2>
                <p className='text-sm text-gray-400 font-sans'>The latest news, articles and resources sent your email</p>
                <div className='flex gap-3'>
                    <input className='border text-gray-300 outline-0 py-1 px-3 rounded  border-gray-500/70' type="email" placeholder='Enter your email' />
                <button className='bg-blue-600  px-2 rounded cursor-pointer text-gray-200'>Subscribe</button>
                </div>
                 </div>

            </div>
            <div className='bg-gray-500 h-0.25 mt-7 mb-2'></div>
            <p className='text-gray-200/60  text-center text-sm'>copyright 2025 @itsMe . All Rights Reserved</p>
        </footer>
    )
}

export default Footer
