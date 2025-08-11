import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCards from './CourseCards'

const CourseSection = () => {
    const { allCourses } = useContext(AppContext)
    return (
        <div className='flex flex-col mx-auto p-3 gap-8 pb-8 '>
            <h2 className='text-center text-xl font-semibold '>Learn from the best</h2>
            <p className='text-center md:px-45  text-gray-500'>Discover our top-rated courses across various categories.From coding and design to business and wellness, our courses are crafted to deliver results.</p>
            <div className='flex items-center md:px-8 px-2.5 justify-center flex-wrap gap-7 '>
                {allCourses.slice(0,4).map((course,index)=><CourseCards key={index} course={course}/>)}
            </div>

            <div className='text-center'> <Link to={'/course-list'} className='text-gray-700 text-center border  border-gray-500/30 rounded px-8 py-1.5' onClick={() => scrollTo(0, 0)}>Show all courses</Link></div>
        </div>
    )
}

export default CourseSection
