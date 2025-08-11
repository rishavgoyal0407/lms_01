import React, { useEffect, useState } from 'react'

const Rating = ({initialRating,onRate}) => {
    const [rating, setrating] = useState(initialRating || 0);
    const handleRating=(value) => {
      setrating(value);
      if (onRate) {
        onRate(value);
      }
    }

    useEffect(() => {
      if (initialRating) {
        setrating(initialRating)
      }
    
    }, [initialRating])
    
    
  return (
    <div>
      {Array.from({length:5},(_,index)=>{
         const startValue=index+1;
         return (
            <span onClick={()=>handleRating(startValue)} key={index} className={`cursor-pointer transition-colors text-xl ${startValue <= rating ? 'text-yellow-500' : 'text-gray-500'}`}>&#9733;</span>
         )
      })}
    </div>
  )
}

export default Rating
