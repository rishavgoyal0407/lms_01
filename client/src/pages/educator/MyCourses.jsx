import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading';

const MyCourses = () => {

  const { currency, allCourses } = useContext(AppContext);
  const [courses, setcourses] = useState(null);
  const fetchEducatorCourses = async () => {
    setcourses(allCourses);
  }

  useEffect(() => {
    fetchEducatorCourses();
  }, [allCourses])


  return courses ? (
    <div className='p-4 '>
      <div className='w-full'>
        <h1 className='text-2xl font-semibold p-3'>My Courses</h1>
        <div className='w-[91vw] mt-5 md:w-full mb-7  shrink-0 shadow-xl overflow-auto'>
          <table className='table-auto shrink-0 w-[800px] '>
            <thead >
              <tr>
                <th className='p-2 border border-gray-500/20 shadow-lg '>All Courses</th>
                <th className='p-2 border border-gray-500/20 shadow-lg '>Earnings</th>
                <th className='p-2 border border-gray-500/20 shadow-lg '>Students</th>
                <th className='p-2 border border-gray-500/20 shadow-lg '>Published On</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className='font-medium w-full'>
                  <td className='p-2 border border-gray-500/20 shadow flex items-center  gap-4'>
                    <img className='w-25 object-cover' src={course.courseThumbnail} alt="" />
                    <span className='font-medium '>{course.courseTitle}</span>
                  </td>
                  <td className='border text-gray-700 border-gray-500/20 shadow text-center  p-2 '>
                           {currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount*course.coursePrice/100))}
                  </td>
                  <td className='border text-center border-gray-500/20 shadow  p-2'>
                    {course.enrolledStudents.length}
                  </td>
                  <td className='border text-center  border-gray-500/20 shadow  p-2'>
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default MyCourses
