import React from 'react'
import { assets, dummyEducatorData } from '../../assets/assets'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom';
const Navbar = () => {
    const educatorData = dummyEducatorData;
    const { user } = useUser();
    return (
        <div className='flex items-center p-5 gap-6 border-b px-3 border-gray-500/70 md:px-6  w-full justify-between'>
            <Link to='/'>
                <img src={assets.logo} alt="logo" />
            </Link>
            <div className='flex items-center gap-3'>
                <p>Hi! {user ? user.fullName : "Developers"}</p>
                {user ? <UserButton /> : <img className='max-w-8' src={assets.profile_img_1} alt="" />}

            </div>

        </div>
    )
}

export default Navbar
