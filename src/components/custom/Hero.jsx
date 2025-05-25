import React from 'react'
import { Link } from 'react-router-dom'


const Hero = () => {
  return (
    <div className='min-h-screem w-full  bg-yellow-100'>
    <div className='items-center mx-30 gap-7 flex flex-col '>
        <h1 className='font-extrabold text-[59px] text-center mt-16 '>
              <span className='text-red-500'> Discover your next Adventure with AI: </span>
        Personalised Itineraies at your fingertips  </h1>
    
        <p className='text-xl font-bold text-gray-700'>Your personal trip planner and travel curator,creating customer</p>

     <Link to={'/create-trip'}>
            <button className='bg-emerald-200 text-xl p-3 m-4 text-black-800 rounded-xl font-medium'>
              Get Started, It's free
            </button>
        </Link>
    </div>
    </div>
  )
}

export default Hero
