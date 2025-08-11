import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';

const MyEnrollments = () => {
    const { enrolledCourses,calculateCourseDuration,navigate } = useContext(AppContext);
    const [progressArray, setprogressArray] = useState([{lectureCompleted:2,totalLectures:4},
        {lectureCompleted:2,totalLectures:4},
        {lectureCompleted:3,totalLectures:4},
        {lectureCompleted:0,totalLectures:4},
        {lectureCompleted:1,totalLectures:4},
        {lectureCompleted:1.5,totalLectures:4},
        {lectureCompleted:4,totalLectures:4},
        {lectureCompleted:4,totalLectures:4},
        {lectureCompleted:2,totalLectures:4},
        {lectureCompleted:2,totalLectures:4},
        {lectureCompleted:2,totalLectures:4},
    ]);


    return (
        <>
        <div className='lg:py-10 lg:px-20 p-4 py-6'>
            <h1 className='md:mb-8 md:text-3xl text-xl font-semibold mb-4'>My Enrollments</h1>
            <div className='w-full  rounded shadow-2xl shrink-0 overflow-x-auto'>
                <table className='w-full table-auto  shrink-0  '>
                    <thead className='shadow-lg  w-full text-center '>
                        <tr >
                            <th className='border-2 px-30 border-gray-500/10  p-3'>Course</th>
                            <th className='border-2 px-10  border-gray-500/10 p-3'>Duration</th>
                            <th className='border-2 px-8 border-gray-500/10 p-3'>Completed</th>
                            <th className='border-2 px-10 border-gray-500/10 p-3'>Status</th>
                        </tr>
                    </thead>
                    <tbody className='w-full '>
                        {enrolledCourses.map((course, index) => (
                            <tr key={index} className='text-center font-medium  w-full '>
                                <td className='border shadow-lg   border-gray-500/10 py-3 px-5 flex-col md:flex-row  flex items-center gap-3    '>
                                    <img src={course.courseThumbnail} className='object-cover w-40' alt="" />
                                    <div className='w-full' >
                                        <p className='text-lg font-semibold py-2'>{course.courseTitle}</p>
                                        <Line strokeWidth={1.5} percent={progressArray[index] ? (progressArray[index].lectureCompleted*100)/progressArray[index].totalLectures : 0}  className='bg-gray-300 rounded-2xl'/>
                                    </div>
                                </td>
                                <td className='border  shadow-lg  text-gray-700 border-gray-500/10 px-3 p-2 '>
                                    {calculateCourseDuration(course)}
                                </td>
                                <td className='border shadow-lg text-gray-700   border-gray-500/10 px-3 p-2 '>
                                    {progressArray[index] && `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`}<span className='text-gray-500 text-sm '> | Lectures</span>
                                </td>
                                <td className='border shadow-lg  border-gray-500/20 px-3 p-2'>
                                    <button onClick={()=>navigate('/player/' + course._id)} className={` text-white cursor-pointer py-2 px-4 rounded-full ${progressArray[index].lectureCompleted/progressArray[index].totalLectures ===1 ? 'bg-green-600' : 'bg-blue-600'}`}>
                                     {progressArray[index].lectureCompleted/progressArray[index].totalLectures ===1 ? 'Completed' : 'Ongoing'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default MyEnrollments
