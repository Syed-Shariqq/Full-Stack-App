import React from 'react'
import { Notebook } from 'lucide-react'

const Heading = () => {
  return (
  <>
    {/* Heading with icon */}
    <div className='text-white text-6xl flex gap-3 items-center justify-center mb-20'>
        Assignment Reminder
        <Notebook className='h-15 w-20'/>
    </div>
  </>
  )
}

export default Heading