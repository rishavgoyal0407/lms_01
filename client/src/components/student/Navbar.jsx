import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext'

const Navbar = () => {
    const isCourseListPage = location.pathname.includes('/course-list');
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const {navigate,isEducator}=useContext(AppContext)

    

    return (
        <div className={`border-b border-gray-500 gap-3 md:p-4 md:px-15 flex justify-between w-full p-3  ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
            <img onClick={(()=>navigate('/'))} src={assets.logo} className='cursor-pointer' alt="logo" />
            <div className='hidden md:flex   items-center gap-4 '>
                {user && <><div className=' md:flex items-center gap-2 text-sm text-gray-700'>
                    <button className='cursor-pointer' onClick={()=>navigate('/educator')} >{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button> |
                    <Link to='/my-enrollments'>My Enrollments</Link>
                </div></>}
                {user ? <UserButton /> : <button onClick={() => openSignIn()} className='bg-blue-600 cursor-pointer  px-5 py-2 rounded-full text-white'>Create Account</button>}
            </div>
            {/* for phone screen  */}
            <div className='md:hidden  flex gap-2 items-center'>
                <div className='flex gap-2 items-center'>

                    {user && <> <button className='cursor-pointer' onClick={()=>navigate('/educator')} >{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button> | 
                        <Link to='/my-enrollments'>My Enrollments</Link></>}</div>
                   {user ? <UserButton /> :<button onClick={() => openSignIn()}  ><img  className='w-8 h-8' src={assets.user_icon} alt="userIcon" /></button>}
            </div>
        </div>
    )
}

export default Navbar
