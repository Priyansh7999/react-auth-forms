import React from 'react'

export default function HomePage() {
  return (
     <div className='flex justify-center items-center h-screen gap-4'>
      <button className="font-sans bg-black hover:bg-gray-800 text-white py-2 px-4 rounded">
        Sign In
      </button>
      <button className="font-sans bg-black hover:bg-gray-800 text-white py-2 px-4 rounded">
        Sign Up
      </button>
    </div>
  )
}
