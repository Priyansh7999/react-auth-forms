import React from 'react'

export default function Button({title, onClick}) {
  return (
      <button 
        className="font-sans bg-black hover:bg-gray-800 text-white py-2 px-4 rounded" 
        onClick={onClick}
        >
            {title}
        </button>
  )
}
