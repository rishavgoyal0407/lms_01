import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const Dashboard = () => {
  const [dashboardData, setdashboardData] = useState(null)
  const { currency } = useContext(AppContext);
  const fetchDashboardData = async () => {
    setdashboardData(dummyDashboardData)
  }

  useEffect(() => {
    fetchDashboardData()

  }, [dummyDashboardData])


  return dashboardData ? (
    <div className='h-auto w-full mx-auto p-3 md:p-5'>
      <div className='flex flex-wrap justify-center  md:justify-start items-center gap-6 '>
        <div className='p-3 w-60  scrollbar border rounded border-gray-500/70 overflow-auto shadow-sm flex gap-3'>
          <img src={assets.patients_icon} alt="" />
          <div>
            <p className='text-2xl'>{dashboardData.enrolledStudentsData.length}</p>
            <p className='text-sm text-gray-500'>Total Enrollments</p>
          </div>

        </div>
        <div className='w-65 overflow-auto border  scrollbar rounded border-gray-500/70 shadow-sm  flex gap-3 p-3'>
          <img src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-2xl'>{dashboardData.totalCourses}</p>
            <p className='text-sm text-gray-500'>Total Courses</p>
          </div>

        </div>
        <div className='w-65 border rounded  scrollbar overflow-auto border-gray-500/70 shadow-sm  flex gap-3 p-3'>
          <img src={assets.earning_icon} alt="" />
          <div >
            <p className='text-2xl'>{currency}{dashboardData.totalEarnings}</p>
            <p className='text-sm text-gray-500'>Total Earnings</p>
          </div>

        </div>
      </div>
      <div>
        <h2 className='p-3 mt-5 mb-5 text-2xl font-semibold'>Latest Enrollments</h2>
     <div className="w-[92vw] md:w-full px-1 overflow-x-auto mt-5 mb-8 ">
  <table className="table-auto min-w-[800px]  rounded overflow-hidden">
    <thead >
      <tr>
        <th className="border border-gray-500/30 shadow-lg px-4 py-2">#</th>
        <th className="border border-gray-500/30 shadow-lg px-4 py-2">Student Name</th>
        <th className="border border-gray-500/30 shadow-lg px-4 py-2">Course Title</th>
      </tr>
    </thead>
    <tbody>
      {dashboardData.enrolledStudentsData.map((item, index) => (
        <tr key={index}>
          <td className="border border-gray-500/30 shadow-sm px-4 py-2 text-center font-medium">{index + 1}</td>
          <td className="border border-gray-500/30 shadow-sm  py-2 pl-2 pr-3 flex-wrap flex items-center gap-4">
            <img className="w-10 h-10 object-cover" src={item.student.imageUrl} alt="" />
            <span className="text-gray-900 font-medium ">{item.student.name}</span>
          </td>
          <td className="border border-gray-500/30   shadow-sm px-4 py-2 font-medium">{item.courseTitle}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      </div>

    </div>
  ) : <Loading />
}

export default Dashboard
