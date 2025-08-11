import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer';
import YouTube from 'react-youtube';
const CourseDetails = () => {
    const { id } = useParams();
    const [courseData, setcourseData] = useState(null);
    const { allCourses, calculateRating, currency, calculateNoOfLectures, calculateCourseDuration, calculateChapterTime } = useContext(AppContext);
    const [openSections, setopenSections] = useState({});
    const [isAlreadyEnrolled, setisAlreadyEnrolled] = useState(false);
    const [playerData, setplayerData] = useState(null)

    const fetchCourseData = async () => {
        const findCourse = allCourses.find((course) => course._id === id);
        setcourseData(findCourse)
    }


    useEffect(() => {
        fetchCourseData();
    }, [allCourses])

    const toggleSection = (index) => { // toggle function ###
        setopenSections((prev) => ({
            ...prev, [index]: !prev[index]
        }))
    }


    return courseData ? (
        <>
        <div className='w-full md:p-12  flex flex-col md:flex-row h-auto bg-gradient-to-b from-cyan-100/70 '>

            {/* left column */}
            <div className='md:w-3/5 w-full   py-7 px-5'>
                <h1 className='text-4xl font-sans font-semibold pb-4'>{courseData.courseTitle}</h1>
                <p className='text-gray-600' dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>

                {/* review and rating */}

                <div className='flex items-center pt-2 pb-4 justify-start gap-3 font-semibold  '>
                    <p>{calculateRating(courseData)}</p>
                    <div className='flex gap-1'>
                        {[...Array(5)].map((_, i) => (
                            <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt="" />
                        ))}
                    </div>
                    <p className='text-blue-500 '>{courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'}</p>
                    <p className='text-gray-500 '>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
                </div>
                <p>Course by <span className='text-blue-500 font-medium underline text-sm'>CodeWithBro</span></p>

                <div>
                    <h1 className='mt-5 mb-5 text-xl font-semibold'>Course Structure</h1>
                    <div className='flex flex-col gap-4 w-full  '>
                        {courseData.courseContent.map((chapter, index) => (
                            <div className='bg-white border   p-2 rounded border-gray-500/30 shadow-lg ' key={index}>
                                <div onClick={() => toggleSection(index)} className='flex items-center gap-4 justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <img className={`cursor-pointer transform transition-transform ${openSections[index] ? 'rotate-180' : ''}`} src={assets.down_arrow_icon} alt="arrowicon" />
                                        <p className='font-semibold'>{chapter.chapterTitle}</p>
                                    </div>
                                    <p className='text-center text-gray-700 font-medium'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                                </div>
                                <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                                    <ul className='p-3' >
                                        {chapter.chapterContent.map((lecture, i) => (
                                            <li key={i} className='flex border-b pb-2 border-gray-500/30 justify-between mt-2 mb-2 gap-6  items-center'>
                                                <div className='flex items-center gap-2 justify-center'>
                                                    <img src={assets.play_icon} alt="playIcon" />
                                                    <p>{lecture.lectureTitle}</p>
                                                </div>

                                                <div >

                                                    <div className='flex text-center text-sm font-medium  items-center gap-2'>{lecture.isPreviewFree && <p onClick={()=>setplayerData({
                                                        videoId:lecture.lectureUrl.split('/').pop()
                                                    })} className='text-blue-600 cursor-pointer text-sm'>Preview</p>}
                                                        <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-11'>
                    <p className='text-gray-800 font-semibold text-xl'>Course Description</p>

                    {/* tailwind typograpy */}

                    <p className='text-gray-600 pt-5' dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}></p>


                </div>
            </div>
            {/* right column */}
            <div className='md:w-1/2 w-full flex p-4 items-start justify-center '>
                <div className='flex w-full md:w-35/40 border overflow-hidden rounded  border-gray-500/30 shadow-xl flex-col h-auto items-start  bg-white'>
                   {playerData ? <YouTube className='w-full object-cover' videoId={playerData.videoId} opts={{playerVars:{autoplay:1}}} iframeClassName='w-full aspect-ratio' /> :  <img src={courseData.courseThumbnail} alt="thumbnail" /> }
                   
                    <div className='p-3 w-full pb-5 flex flex-col gap-3'>
                        <div className='flex gap-2 text-red-600 font-medium items-center'>
                            <img src={assets.time_left_clock_icon} alt="time_clock_icon" />
                            <p><span >5 days</span> left at this price</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='font-medium text-2xl'>{currency} {(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
                            <p className='text-sm text-gray-600 font-medium line-through'>{currency} {courseData.coursePrice}</p>
                            <p className='font-medium text-gray-800 '>{courseData.discount} % off</p>
                        </div>
                        <div className='flex gap-2 text-sm font-medium text-gray-700 items-center'>
                            <img src={assets.star} alt="" />
                            <p>{calculateRating(courseData)}</p>
                            <div className='h-4 ml-2 mr-2 w-px bg-gray-700/40'></div>
                            <div className='flex gap-2'>
                                <img src={assets.time_clock_icon} alt="star" />
                                <p>{calculateCourseDuration(courseData)}</p>


                            </div>
                            <div className='h-4 ml-2 mr-2 w-px bg-gray-700/40'></div>
                            <div className='flex gap-2'>
                                <img src={assets.lesson_icon} alt="star" />
                                <p>{calculateNoOfLectures(courseData)} lectures</p>


                            </div>
                        </div>
                        <button className='w-full mt-3 text-center rounded cursor-pointer p-2 bg-blue-600 text-white font-medium'>{isAlreadyEnrolled ? "Already Enrolled" : "Enroll now"}</button>
                        <div className='pb-5 pt-1'>
                            <p className='text-2xl text-gray-900 font-semibold mt-3 mb-3'>What 's in the Course ?</p>
                            <ul className='text-gray-600 text-sm list-disc pl-6 font-medium '> 
                                <li>Lifetime access with free updates.</li>
                                <li>Step-by-Step , hands-on project guidance.</li>
                                <li>Downloadable resources and source code.</li>
                                <li>Quizzes to test your knowledge.</li>
                                <li>Certificate of completion</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    ) : <Loading />
}

export default CourseDetails
