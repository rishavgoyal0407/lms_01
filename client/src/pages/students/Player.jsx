import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';
const Player = () => {
    const [openSections, setopenSections] = useState({});
    const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
    const { courseId } = useParams();
    const [courseData, setcourseData] = useState(null);
    const [playerData, setplayerData] = useState(null)
    const getCourseData = () => {
        enrolledCourses.map((course) => {
            if (course._id == courseId) {
                setcourseData(course)
            }
        })
    }

    const toggleSection = (index) => { // toggle function ###
        setopenSections((prev) => ({
            ...prev, [index]: !prev[index]
        }))
    }
    useEffect(() => {

        getCourseData()
    }, [enrolledCourses])



    return (
        <>
        <div className='w-full bg-gradient-to-b mb-13 from-cyan-100/70 p-3 flex items-center  flex-col lg:flex-row'>
            {/* left column */}
            <div className='w-full mb-10  md:p-9 '>
                <h2 className='text-xl md:text-2xl pb-5 font-semibold'>Course Structure</h2>
                <div className='flex flex-col gap-4 w-full  '>
                    {courseData && courseData.courseContent.map((chapter, index) => (
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
                                                <img src={false ? assets.blue_tick_icon : assets.play_icon} alt="playIcon" />
                                                <p>{lecture.lectureTitle}</p>
                                            </div>

                                            <div >

                                                <div className='flex text-center text-sm font-medium  items-center gap-2'>{lecture.lectureUrl && <p onClick={() => setplayerData(
                                                    { ...lecture, chapter: index + 1, lecture: i + 1 }
                                                )} className='text-blue-600 cursor-pointer text-sm'>Watch</p>}
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
                <div className='flex items-center gap-2 md:pt-17 p-1.5 pt-12 pb-5'>
                    <h1 className='text-xl font-medium'>Rate this Course :</h1>
                    <Rating initialRating={0} />
                </div>
            </div>
            {/* right column */}
            <div className='w-full font-medium text-sm p-1 md:px-5   '>
                {playerData ? (<><YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-ratio' />
                <div className='mt-3 flex items-center gap-4 justify-between'>
                    <p>{playerData.chapter}.{playerData.lecture}.{playerData.lectureTitle}</p>
                    <button className='text-blue-600 cursor-pointer'>Mark As Complete</button>
                </div>
                </>) :  <img src={courseData ? courseData.courseThumbnail : ''} alt="" />}

                </div>
        </div>
        <Footer/>
        </>
            )
}

            export default Player
