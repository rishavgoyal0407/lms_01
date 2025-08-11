import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCards from '../../components/student/CourseCards'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'

const CoursesList = () => {
    const { navigate, allCourses } = useContext(AppContext)
    const { input } = useParams();
    const [filteredCourse, setfilteredCourse] = useState([])

    useEffect(() => {
     if (allCourses && allCourses.length>0) {
        const tempCourses=allCourses.slice()

        input ? setfilteredCourse(tempCourses.filter(item=>item.courseTitle.toLowerCase().includes(input.toLowerCase())))   : setfilteredCourse(tempCourses)
     }

    }, [allCourses,input])
    
    return (
         <>
      <div className="p-3 mb-13 w-full">
        <div className="mb-13">
          <div className="flex items-center gap-1 pb-4 p-3 flex-col">
            <h1 className="text-black font-semibold text-2xl">Course List</h1>
            <p className="flex flex-col">
              <span
                onClick={() => navigate('/')}
                className="text-blue-500 cursor-pointer"
              >
                Home
              </span>
              <span className="text-gray-500">/Course list</span>
            </p>
          </div>

          <SearchBar data={input} />
        </div>

        {input && (
          <div className="flex items-center px-30   gap-2 pb-5">
            <p className="text-gray-700">{input}</p>
            <img
              className="cursor-pointer  w-4 h-4"
              onClick={() => navigate('/course-list')}
              src={assets.cross_icon}
              alt="crossIcon"
            />
          </div>
        )}

        <div className="flex items-center md:px-8 px-2.5 justify-center flex-wrap gap-7">
          {filteredCourse.map((course, index) => (
            <CourseCards key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CoursesList;