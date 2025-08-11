import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
    const {isEducator}=useContext(AppContext)
    const menuItems=[
        {name:'Dashboard' ,path :'/educator/educator' ,icon: assets.home_icon},
         {name:'Add Course' ,path :'/educator/add-course' ,icon: assets.add_icon},
          {name:'My Courses' ,path :'/educator/my-courses' ,icon: assets.my_course_icon},
           {name:'Student Enrolled' ,path :'/educator/students-enrolled' ,icon: assets.person_tick_icon},
    ]
  return isEducator && (
    <div className='border-r w-55  hidden md:block border-gray-500/70  h-auto'>
      {menuItems.map((item)=>(
        <NavLink className={({isActive})=> `flex items-center p-3 pl-5 gap-3 ${isActive ? 'bg-indigo-50 border-r-[6px] border-indigo-500/70' : 'hover:bg-gray-100/90'}`}  to={item.path} key={item.name} end={item.path==='/educator'} >
        <img src={item.icon} alt="" />
        <p>{item.name}</p>
      </NavLink>
      ))}
    </div>
  )
}

export default SideBar
