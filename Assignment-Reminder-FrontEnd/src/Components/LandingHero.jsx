import { BellRing, Calendar, Cloud } from 'lucide-react'
import React from 'react'

const LandingHero = () => {
  return (
    <div className='h-[86vh] px-35 py-25'>
      
      {/* Hero Section */}
        <div className='flex flex-col gap-5'>
            <div className='flex gap-3'>
               <h1 className='text-8xl font-bold leading-[10vh]'>Never Miss An </h1>
               <h1 className='text-8xl bg-linear-to-r pl-7 from-blue-500 to-[#EC5EFF] opacity-80 bg-clip-text drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] text-transparent font-bold leading-[10vh]'>Assignment </h1>
            </div>
            <h1 className='text-8xl font-bold '>Deadline Again!</h1>
            <p className='text-3xl mt-10'>Stay organized and on top of your academic tasks with our Assignment Reminder app.<br/> Sign up today to start managing your assignments efficiently!</p>
        </div>
        <div className='flex flex-col mt-20 gap-4'>
          <div className='flex justify-start gap-3 items-center'>
            <Calendar className='h-10 w-10'/>
            <h2 className='text-4xl pb-3 mt-5'>Track Your Assignments Effortlessly</h2>
          </div>
          <div className='flex justify-start gap-3 items-center'>
            <Cloud className='h-10 w-10'/>
            <h2 className='text-4xl pb-3 mt-5'>Cloud-based access</h2>
          </div>
          <div className='flex gap-3 justify-start items-center'>
            <BellRing className='h-10 w-10'/>
            <h2 className='text-4xl pb-3 mt-5'>Customizable Notifications and Reminders</h2>
          </div>
        </div>
      </div>
  )
}

export default LandingHero