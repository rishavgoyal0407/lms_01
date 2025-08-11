import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='w-full text-center p-3'>
      <h2 className='p-2 text-xl font-semibold'>Learn anything , anytime , anywhere</h2>
      <p className='md:px-30 p-3 text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa neque eaque error nemo beatae, pariatur, aliquid amet laboriosam tempora fugiat minima voluptate similique, incidunt iusto?</p>
    <div className='flex justify-center items-center p-3 gap-3'> 
        <button className='p-2 px-3 font-semibold rounded bg-blue-600 text-white'>Get started</button>
        <button className='flex items-center font-semibold gap-2 p-2 rounded bg-gray-200 '>Learn more <img src={assets.arrow_icon} alt="arrowIcon" /></button>
    </div>
    </div>
  )
}

export default CallToAction
