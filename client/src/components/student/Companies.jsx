import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div>
    <p className='text-gray-500 text-xl text-center mb-4'>Trusted by learners from</p>
    <div className='flex flex-wrap items-center p-3 justify-center pb-4 gap-7'>
        <img src={assets.microsoft_logo} className='md:w-25 w-17' alt="microsoft" />
         <img src={assets.accenture_logo} className='md:w-25 w-17' alt="accenture" />
          <img src={assets.adobe_logo} className='md:w-25 w-17' alt="adobe" />
           <img src={assets.walmart_logo} className='md:w-25 w-17' alt="walmart" />
            <img src={assets.paypal_logo} className='md:w-25 w-17' alt="paypal" />
    </div>
    </div>
  )
}

export default Companies
