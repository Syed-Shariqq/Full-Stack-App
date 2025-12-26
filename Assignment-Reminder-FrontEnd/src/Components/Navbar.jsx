import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-[14vh] flex items-center justify-between px-20 w-full'>
      {/* Navbar section */}
        <div className='flex items-center gap-3 justify-center'> 
          <h1 className='text-5xl font-semibold'>Assignment Reminder </h1>
          <Notebook className='w-10 h-10'/>
        </div>
        <div className='flex gap-10 text-xl font-semibold items-center justify-center'>

          {/*Signup button */}
         <Link to="/signup">
          <button className='hover:scale-105 active:scale-95  hover:from-blue-500 hover:to-[#EC5EFF] transition-all duration-300 px-10 py-5 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.45)] bg-linear-300 from-blue-500 to-blue-300 opacity-80 rounded-4xl '>Sign Up</button>
         </Link>

         {/* Login button */}
         <Link to="/login">
          <button className='hover:scale-105 active:scale-95 hover:from-blue-500 hover:to-[#EC5EFF] transition-all duration-300 px-10 py-5 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.45)] bg-linear-150 from-blue-500 to-blue-300 opacity-80 rounded-4xl'>Log In</button>
        </Link>
        </div>
    </div>
  )
}

export default Navbar