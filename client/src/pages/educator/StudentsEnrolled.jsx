import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/student/Loading'
const StudentsEnrolled = () => {

  const [enrolledStudents, setenrolledStudents] = useState(null)
  const fetchEnrolledStudents=async () => {
    setenrolledStudents(dummyStudentEnrolled);
  }

  useEffect(() => {
    fetchEnrolledStudents();
  
    
  }, [dummyStudentEnrolled])
  
  
  return enrolledStudents ? (
    <div className='w-full p-4 h-auto'>
     <div className='w-[91vw] md:w-full overflow-auto'>
      <table className='table-auto text-gray-800  text-center min-w-[800px] '>
        <thead>
       
          <tr>
            <th className='border border-gray-500/20 shadow-sm p-2'>#</th>
            <th className='border border-gray-500/20 shadow-sm p-2'>Student Name</th>
            <th className='border border-gray-500/20 shadow-sm p-2'>Course Title</th>
            <th className='border border-gray-500/20 shadow-sm p-2' >Date</th>
          </tr>
        </thead>
        <tbody>
          {enrolledStudents.map((item,index)=>(
            <tr key={index}> 
              <td  className='border border-gray-500/20 shadow-sm p-1'>
                {index+1}
              </td>
              <td className='flex items-center font-medium border border-gray-500/20 shadow-sm p-1 gap-3'>
                <img className='w-8 object-cover' src={item.student.imageUrl} alt="image" />
                <span>{item.student.name}</span>
              </td>
              <td className='border border-gray-500/20 text-sm font-semibold shadow-sm p-1'>
                {item.courseTitle}
              </td>
              <td className='border border-gray-500/20 shadow-sm p-1 text-sm font-semibold'>
                {new Date(item.purchaseDate).toLocaleDateString( )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
    </div>
  ) : <Loading/>
}

export default StudentsEnrolled
