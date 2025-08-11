import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom';

const CourseCards = ({course}) => {
    //math.floor always choose the left side number of any decimal like 3.9 -> 3
    const {currency,calculateRating}=useContext(AppContext);
  return (
    <Link to={'/course/' + course._id} onClick={(()=>scrollTo(0,0))} className='lg:w-3/13 w-full rounded border border-gray-500/35 shadow-xl overflow-hidden md:w-3/10 h-auto shrink-0  bg-white ' >
     <img src={course.courseThumbnail} alt="" />
     <div className='p-2 overflow-auto '>
        <h3 className='font-semibold text-lg'>{course.courseTitle}</h3>
        <p>{course.educator.name}</p>
        <div className='flex items-center justify-start gap-3 font-semibold  '>
            <p>{calculateRating(course)}</p>
            <div className='flex gap-1'>
                {[...Array(5)].map((_,i)=>(
                    <img key={i} src={i< Math.floor(calculateRating(course)) ? assets.star :assets.star_blank} alt="" />
                ))}
            </div>
            <p className='text-gray-500 font-sans'>{course.courseRatings.length}</p>
        </div>
        <p className='text-2xl  font-sans'>{currency}{(course.coursePrice-course.discount*course.coursePrice/100).toFixed(2)}</p>
     </div>
    </Link>
  )
}

export default CourseCards
