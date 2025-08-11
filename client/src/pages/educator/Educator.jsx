import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import SideBar from '../../components/educator/SideBar'

const Educator = () => {
    return (
        <div>
            <Navbar />
            <div className='flex'>
                <SideBar />
                <div >{<Outlet />}</div>
            </div>
        </div>
    )
}

export default Educator
