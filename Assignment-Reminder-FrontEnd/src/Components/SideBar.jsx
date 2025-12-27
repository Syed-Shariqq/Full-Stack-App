import React from 'react'
import {Calendar, CalendarCheck2, File, LayoutDashboard, LogOut, Settings, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
const SideBar = () => {

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    }

    const role = localStorage.getItem("role");
  return (
          <>
          {/* Sidebar */}
            <div className="min-h-screen bg-[#1F1F27] backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.2)] w-1/6 border-r-2 border-white/40 ">
               <div className="flex items-center font-semibold text-white text-3xl py-10 px-2 justify-center gap-3 ">
                <h1>Assignment Reminder</h1>
                <Calendar />
               </div>
               <div className='items-start h-[85vh] justify-between flex flex-col gap-5 '>
                 <div className='flex my-10 h-full flex-col gap-10'>
                   <div className="group flex cursor-pointer px-5 mx-5 h-14 gap-4 items-center justify-start rounded-xl transition-all duration-300 hover:bg-white/5 ">
                      <LayoutDashboard className=" h-10 w-10 text-white transition-all duration-300 group-hover:text-[#EC5EFF]
                                                  group-hover:drop-shadow-[0_0_14px_rgba(168,85,247,0.6)]"/>
                      <h1 className=" text-2xl font-normal text-white transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-blue-500 group-hover:to-[#EC5EFF]
                                     group-hover:bg-clip-text group-hover:text-transparent group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] ">
                        Dashboard
                      </h1>
                  </div>
                   <div 
                   onClick={() => {
                    role === "ADMIN" ? navigate("/teacherassignments") : navigate("/assignments")
                   }}
                   className="group flex cursor-pointer px-5 mx-5 h-14 gap-4 items-center justify-start rounded-xl transition-all duration-300 hover:bg-white/5 ">
                      <File className=" h-10 w-10 text-white transition-all duration-300 group-hover:text-[#EC5EFF]
                                                  group-hover:drop-shadow-[0_0_14px_rgba(168,85,247,0.6)]"/>
                      <h1 className=" text-2xl font-normal text-white transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-blue-500 group-hover:to-[#EC5EFF]
                                     group-hover:bg-clip-text group-hover:text-transparent group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] ">
                        Assignments
                      </h1>
                  </div>
                   <div 
                   onClick={() => {
                    navigate("/calendar")
                   }}
                   className="group flex cursor-pointer px-5 mx-5 h-14 gap-4 items-center justify-start rounded-xl transition-all duration-300 hover:bg-white/5 ">
                      
                      <CalendarCheck2 className=" h-10 w-10 text-white transition-all duration-300 group-hover:text-[#EC5EFF]
                                                  group-hover:drop-shadow-[0_0_14px_rgba(168,85,247,0.6)]"/>
                      <h1 className=" text-2xl font-normal text-white transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-blue-500 group-hover:to-[#EC5EFF]
                                     group-hover:bg-clip-text group-hover:text-transparent group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] ">
                        Calendar
                      </h1>
                      
                  </div>
                   <div className="group flex cursor-pointer px-5 mx-5 h-14 gap-4 items-center justify-start rounded-xl transition-all duration-300 hover:bg-white/5 ">
                      <User className=" h-10 w-10 text-white transition-all duration-300 group-hover:text-[#EC5EFF]
                                                  group-hover:drop-shadow-[0_0_14px_rgba(168,85,247,0.6)]"/>
                      <h1 className=" text-2xl font-normal text-white transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-blue-500 group-hover:to-[#EC5EFF]
                                     group-hover:bg-clip-text group-hover:text-transparent group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] ">
                        Profile
                      </h1>
                  </div>
                   <div className="group flex cursor-pointer px-5 mx-5 h-14 gap-4 items-center justify-start rounded-xl transition-all duration-300 hover:bg-white/5 ">
                      <Settings className=" h-10 w-10 text-white transition-all duration-300 group-hover:text-[#EC5EFF]
                                                  group-hover:drop-shadow-[0_0_14px_rgba(168,85,247,0.6)]"/>
                      <h1 className=" text-2xl font-normal text-white transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-blue-500 group-hover:to-[#EC5EFF]
                                     group-hover:bg-clip-text group-hover:text-transparent group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] ">
                        Settings
                      </h1>
                  </div>
                 </div>
                 <div onClick={logout} className='flex cursor-pointer border-2 border-white/40 py-4 pl-7 pr-40 ml-4 gap-3 justify- rounded-2xl items-center'>
                  <LogOut className='text-red-400 h-10 w-10'/>
                   <button className='text-white flex gap-4 items-center justify-start'>
                     <h1 className='text-2xl font-normal cursor-pointer'>Logout</h1>
                   </button>
                 </div>
               </div>
            </div>
        </>
  )
}

export default SideBar