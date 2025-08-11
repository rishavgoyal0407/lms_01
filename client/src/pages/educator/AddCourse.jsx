import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets';
const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const [courseTitle, setcourseTitle] = useState('');
  const [coursePrice, setcoursePrice] = useState(0);
  const [discount, setdiscount] = useState(0);
  const [image, setimage] = useState(null);
  const [chapters, setchapters] = useState([]);
  const [showPopUp, setshowPopUp] = useState(false);
  const [currentChapterId, setcurrentChapterId] = useState(null);

  const [lectureDetails, setlectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  })

const handleChapter=(action,chapterId) => {
  if (action === 'add') {
    const title=prompt('Enter Chapter Name : ');
    if (title) {
      const newChapter={
        chapterId:uniqid(),
        chapterTitle:title,
        chapterContent:[],
        collapsed:false,
        chapterOrder:chapters.length >0 ? chapters.slice(-1)[0].chapterOrder + 1:1 ,

      };
      setchapters([...chapters,newChapter])
    }
  }else if(action==='remove'){
    setchapters(chapters.filter((chapter)=>chapter.chapterId !== chapterId));
  }else if(action === 'toggle'){
   setchapters(
    chapters.map((chapter)=>chapter.chapterId === chapterId ? { ...chapter, collapsed : !chapter.collapsed} : chapter)
   )
  }
}

const handleLecture=(action,chapterId,lectureIndex) => {
  if (action==='add') {
    setcurrentChapterId(chapterId);
    setshowPopUp(true);
  }else if(action === 'remove'){
  setchapters(
    chapters.map((chapter)=>{
    if (chapter.chapterId === chapterId) {
      chapter.chapterContent.splice(lectureIndex,1);
    } 
    return chapter ;
    })
  )
  }
}

const addLecture=() => {
  setchapters(
    chapters.map((chapter)=>{
   if (chapter.chapterId === currentChapterId) {
    const newLecture={
      ...lectureDetails,lectureOrder:chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 :1 ,
      lectureId:uniqid ()
    };

    chapter.chapterContent.push(newLecture);

   }

   return chapter ;


    })
  );

  setshowPopUp(false);
  setlectureDetails({
    lectureTitle:'',
    lectureDuration:'',
    lectureUrl:'',
    isPreviewFree:false
  })
}

const handleSubmit= async (e) => {
  e.preventDefault()
}



  useEffect(() => {

    if (!quillRef.current && editorRef.current) {
      //initiate quill only once
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',

      })
    }

  }, [])

  return (
    <div className='w-full relative h-auto p-4'>
      <form  onSubmit={handleSubmit}>
        <div className='pb-3 pt-3' >
          <p className=' mb-2 font-medium text-lg text-gray-700'>Course Title</p>
          <input className='border border-gray-500/70 rounded outline-0 p-2 w-full' onChange={(e) => setcourseTitle(e.target.value)} value={courseTitle} required type="text" placeholder='Type here' />
        </div>
        <div className='pb-3  pt-3'>
          <p className='text-lg mb-2 font-medium text-gray-700'>Course Description</p>
          <div ref={editorRef}></div>
        </div>
        <div className='flex items-center justify-between gap-12 w-full'>
          <div className='pb-3 pt-3 flex flex-row md:flex-col items-center gap-3'>
            <p className='text-lg  font-medium text-gray-700'>Course Price</p>
            <input className='outline-0 border-gray-500/70 rounded  border w-22 p-1.5' onChange={e => setcoursePrice(e.target.value)} value={coursePrice} required type="number" placeholder='0' />
          </div>

          <div className='pb-3 pt-3 flex items-center gap-2'>
            <p className='text-lg mb-2 font-medium text-gray-700'>Course Thumbnail</p>
            <label htmlFor="thumbnailImage">
              <img className='w-7 cursor-pointer bg-blue-600 p-1' src={assets.file_upload_icon} alt="" />
              <input type="file" id='thumbnailimage' onChange={e => setimage(e.target.files[0])} accept='image/*' hidden />
              <img className='w-20' src={image ? URL.createObjectURL(image) : ''} alt="" />
            </label>
          </div>
        </div>

        <div className='pb-3 pt-3'>
          <p className='text-lg  font-medium text-gray-700'>Discount %</p>
          <input className='outline-0 border-gray-500/70 rounded  border w-22 p-1.5' onChange={e => setdiscount(e.target.value)} value={discount} min={0} max={100} type="number" />
        </div>

        {/* adding chapters and lectures */}

        <div >
          {chapters.map((chapter, chapterIndex) => (
            <div className='border rounded border-gray-500/40 mt-2 mb-2 ' key={chapterIndex}>
              <div className='border-b border-gray-500/40 w-full flex items-center justify-between p-2'>
                <div className='flex items-center'>
                  <img onClick={()=>handleChapter('toggle',chapter.chapterId)} className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-90"}`} src={assets.dropdown_icon} width={14} alt="" />
                  <span>
                    {chapterIndex + 1} {chapter.chapterTitle}
                  </span>
                </div>
                <span className='text-sm font-medium text-gray-700'>{chapter.chapterContent.length} Lectures</span>
                <img onClick={()=>handleChapter('remove',chapter.chapterId)} className='cursor-pointer' src={assets.cross_icon} alt="" />
              </div>
              {!chapter.collapsed && (
                <div className='p-4'>
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div className='flex items-center gap-5 justify-between mb-3' key={lectureIndex}>
                      <span className='text-sm font-semibold' >{lectureIndex +1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a className='text-blue-500 ' href={lecture.lectureUrl} target='_blank' >Link</a>- {lecture.isPreviewFree ? "Free Preview" : "Paid"}</span>
                      <img onClick={()=>handleLecture('remove',chapter.chapterId,lectureIndex)} className='cursor-pointer' src={assets.cross_icon} alt="" />
                    </div>
                  ))}
                  <div onClick={()=>handleLecture('add',chapter.chapterId)} className='border cursor-pointer px-2 border-gray-500/40 text-sm  p-1 rounded bg-gray-100'>
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div onClick={()=>handleChapter('add')} className='w-full bg-blue-100 font-medium rounded-xl text-center p-2 mt-4 mb-4'>
            + Add Chapter
          </div>
          {showPopUp && (
            <div className='h-screen w-full flex items-center justify-center  border fixed inset-0 z-50 bg-gray-500/60  rounded p-3'>
              <div className='rounded w-full md:w-1/4 p-4 bg-white'>
              <div className='flex items-center justify-between gap-5 mb-3 '>
              <h2 className='text-xl font-semibold'>Add Lecture</h2>
                <img className='w-4 cursor-pointer h-4 ' src={assets.cross_icon} onClick={()=>setshowPopUp(false)} alt="" />
              </div>
                
                <div className='mb-3'>
                  <p className='text-sm font-medium mb-1.5'>Lecture Title :</p>
                  <input className='bg-white text-black w-full p-1.5 border-gray-500/40 outline-0 border rounded ' type="text" value={lectureDetails.lectureTitle} onChange={e=>setlectureDetails({
                    ...lectureDetails,lectureTitle:e.target.value
                  })} />
                </div>
                <div className='mb-3'>
                  <p className='text-sm font-medium mb-1.5'>Duration (minutes)</p>
                  <input className='bg-white text-black border-gray-500/40 w-full p-1.5 outline-0 border rounded ' type="number" value={lectureDetails.lectureDuration} onChange={e=>setlectureDetails({
                    ...lectureDetails,lectureDuration :e.target.value
                  })} />
                </div>
                <div className='mb-5'>
                  <p className='text-sm font-medium mb-1.5'>Lecture URL</p>
                  <input className='bg-white border-gray-500/40 text-black w-full p-1.5 outline-0 border rounded '  type="text" value={lectureDetails.lectureUrl} onChange={e=>setlectureDetails({
                    ...lectureDetails,lectureUrl:e.target.value
                  })} />
                </div>

                <div className='flex mb-3  items-center gap-3'>
                  <p className='text-sm font-medium mb-1.5'>Is Preview Free ?</p>
                  <input className='mb-1.5' type="checkbox" checked={lectureDetails.isPreviewFree} onChange={e=>setlectureDetails({
                    ...lectureDetails,isPreviewFree:e.target.checked
                  })} />
                </div>

                <button onClick={addLecture} className='bg-blue-400 mb-1 cursor-pointer  font-medium rounded-full text-white w-full p-2' type='button'>Add</button>
                
              </div>
            </div>
          )}
        </div>
        <button   className='bg-black text-white p-2 cursor-pointer px-6 rounded  mt-4 mb-6 ' type='submit' >ADD</button>
      </form>

    </div>
  )
}

export default AddCourse
