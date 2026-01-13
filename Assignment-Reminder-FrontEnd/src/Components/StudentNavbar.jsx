import React, { useContext, useEffect, useState } from 'react'
import {  BellRing, Search, X } from 'lucide-react';
import {jwtDecode} from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom';
import { AssignmentContext } from '../Context/AssignmentContext';
import { getAllAssignments } from '../api/AssignmentApi';
import api from '../api/axios';
const DashHeroSection = () => {
   
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

        const {
        addAssignment,
        assignments,
        setAssignments
        } = useContext(AssignmentContext);

      useEffect(() => {
        const fetchAssignments = async () => {
          try {
            const response = await getAllAssignments();
            setAssignments(response.data);
            console.log(response.data);
          } catch (err) {
            console.error(err);
          }
        };

        fetchAssignments();
      }, [setAssignments]);

             const getStatus = async (id) => {
                try {
                  await api.post(`/assignments/${id}/status`);
                  setAssignments(prev =>
                    prev.map(a =>
                      a.id === id
                        ? { ...a, completed: true }
                        : a
                    )
                  );
                } catch (err) {
                  console.log(err);
                }
              };

              // ===== ASSIGNMENT COUNTS (per student) =====
              const totalAssignments = assignments.length;

              const completedAssignments = assignments.filter(
                a => a.completed === true
              ).length;

              const pendingAssignments = totalAssignments - completedAssignments;

   
              const completionRate =
                  totalAssignments === 0 ? 0 : (completedAssignments / totalAssignments) * 100;

                  const progressColor =
                  completionRate < 40
                    ? "from-red-500 to-red-400"
                    : completionRate < 70
                    ? "from-yellow-500 to-orange-400"
                    : "from-green-500 to-emerald-400";
        
              // ===== NOTIFICATIONS - Assignments due within 24 hours =====
              const getDueWithin24Hours = () => {
                const now = new Date();
                return assignments.filter(assignment => {
                  if (!assignment.dueDate || assignment.completed) return false;
                  
                  const dueDate = new Date(assignment.dueDate);
                  const timeDiff = dueDate - now;
                  const hoursRemaining = timeDiff / (1000 * 60 * 60);
                  
                  return hoursRemaining > 0 && hoursRemaining <= 24;
                }).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
              };

              const dueSoon = getDueWithin24Hours();
              const hasNotifications = dueSoon.length > 0;
        

  return (
    <div className='min-h-screen flex flex-col gap-10 p-10 w-[85vw]'>

           {/* Hero Section */}
               <div className='flex items-center justify-between'>
                 <div className='flex gap-5 items-center'>
                  <h1 className='text-6xl font-semibold'>Welcome Back ,</h1>
                  <h1 className='text-5xl h-20 pt-5 font-semibold bg-linear-to-r from-blue-700 to-[#EC5EFF] bg-clip-text text-transparent opacity-80'>{user.sub}</h1>
                 </div>
                 
                <div className='flex gap-5 items-center'>
                  <div className='flex border-2 border-white/30  rounded-3xl items-center justify-center relative '>
                  
                    <input className='px-20 text-2xl border-2 rounded-3xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 focus:border-2 border-white/30 py-5 outline-none' type="text" placeholder='Search...'/>
                    <Search className='hover:text-indigo-400 transition-all duration-300 absolute h-6 w-6 mt-1 left-5 top-5'/>
                  </div>

                  {/* Notification Bell */}
                  <div className='relative'>
                    <button 
                      onClick={() => setShowNotifications(!showNotifications)}
                      className='relative p-3 rounded-full hover:bg-white/10 transition-all duration-300'
                    >
                      <BellRing className={`h-8 w-8 transition-all duration-300 ${hasNotifications ? 'text-red-500 animate-pulse' : 'hover:text-purple-400'}`}/>
                      {hasNotifications && (
                        <span className='absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold'>
                          {dueSoon.length}
                        </span>
                      )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                      <div className='absolute right-0 mt-3 w-[400px] bg-[#1F1F27] border-2 border-white/30 rounded-2xl shadow-[0_0_40px_rgba(99,102,241,0.3)] z-50'>
                        <div className='flex items-center justify-between p-5 border-b-2 border-white/30'>
                          <h2 className='text-2xl font-bold'>Due Soon</h2>
                          <button 
                            onClick={() => setShowNotifications(false)}
                            className='hover:bg-white/10 p-1 rounded transition-all duration-300'
                          >
                            <X className='h-6 w-6'/>
                          </button>
                        </div>
                        
                        {dueSoon.length > 0 ? (
                          <div className='max-h-[500px] overflow-y-auto'>
                            {dueSoon.map((assignment, index) => {
                              const now = new Date();
                              const dueDate = new Date(assignment.dueDate);
                              const timeDiff = dueDate - now;
                              const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));
                              const minutesRemaining = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

                              return (
                                <div key={index} className='p-5 border-b-2 border-white/20 hover:bg-white/5 transition-all duration-300'>
                                  <div className='flex justify-between items-start gap-3'>
                                    <div className='flex-1'>
                                      <h3 className='text-lg font-semibold text-white'>{assignment.title}</h3>
                                      <p className='text-sm text-gray-400 mt-1'>{assignment.subject}</p>
                                      <p className='text-sm text-gray-300 mt-2'>Due: {assignment.dueDate}</p>
                                      <div className='mt-2 inline-block px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold'>
                                        {hoursRemaining}h {minutesRemaining}m remaining
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className='p-5 text-center text-gray-400'>
                            <p className='text-lg'>No assignments due within 24 hours</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
               </div>

               {/*Tracking Section*/}
               <div className='flex flex-col items-center pt-8 min-h-[81vh] justify-start gap-15'>
                <div className='flex items-center gap-15 justify-start'>
                <div className='w-[25vw] bg-[#1F1F27] shadow-[0_0_40px_rgba(99,102,241,0.2)] flex flex-col gap-5 font-semibold items-center justify-center rounded-2xl border-2 border-white/30 h-[20vh]'>
                  <h1 className='text-2xl'>Completed Assignments Rate %</h1>
                  <div className='border-2 relative border-white/30 rounded-full w-[20vw] mx-5 h-6'>
                   <div className={`absolute rounded-full left-0 right-0 h-full bg-linear-to-r from-blue-700 to-[#EC5EFF]`}
                     style={{ width: `${Number(completionRate)}%` }}></div>
                  </div>
                  <p className={`text-2xl bg-linear-to-r ${progressColor} bg-clip-text text-transparent transition-all duration-500`}>{Number(completionRate).toFixed(2)}</p>
                </div>
                <div className='w-[15vw] flex flex-col gap-10 text-4xl font-semibold items-center justify-center bg-[#1F1F27] shadow-[0_0_40px_rgba(99,102,241,0.2)]  h-[20vh] rounded-2xl border-2 border-white/30'>
                  <h1>Total Assignments</h1>
                  <h1 className='text-purple-600 text-5xl'>{totalAssignments}</h1>
                </div>
                <div className='w-[15vw] bg-[#1F1F27] flex flex-col gap-10 text-4xl font-semibold items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.2)] h-[20vh] rounded-2xl border-2 border-white/30'>
                  <h1>Completed</h1>
                  <h1 className='text-blue-500 text-5xl'>{completedAssignments}</h1>
                </div>
                <div className='w-[15vw] bg-[#1F1F27] flex flex-col gap-10 text-4xl font-semibold items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.2)] h-[20vh] rounded-2xl border-2 border-white/30'>
                  <h1>Pending</h1>
                  <h1 className='text-red-400 text-5xl'>{pendingAssignments}</h1>
                </div>
              </div>

              {/* Recent Assignments */}
              <div className='w-[78vw] scrollbar h-[53vh] overflow-y-auto  border-2 border-white/30 rounded-2xl bg-[#1F1F27] shadow-[0_0_40px_rgba(99,102,241,0.2)]'>
                   <h1 className='text-3xl font-semibold py-8 px-5'>Recent Assignments</h1>
                   <div className='grid grid-cols-7 px-10 py-6 text-2xl font-bold border-y-2 border-white/30'>
                    <span>Subject</span>
                    <span>Assignment Name</span>
                    <span>Due Date</span>
                    <span>Status</span>
                    <span>Priority</span>
                   </div>
                   {assignments.map((assignment, index) => {
                      const isExpired = new Date(assignment?.dueDate) < new Date();
                      const isCompleted = assignment?.completed;

                      return (
                        <div
                          key={index}
                          className="grid grid-cols-7 px-10 py-6 text-2xl border-y-2 border-white/30"
                        >
                          <span>{assignment?.subject}</span>
                          <span>{assignment?.title}</span>
                          <span>{assignment?.dueDate}</span>

                          <button
                            disabled={isCompleted || isExpired}
                            onClick={() => getStatus(assignment?.id)}
                            className={`
                              px-4 py-1.5 rounded-full mr-8 font-medium transition
                              ${
                                isCompleted
                                  ? "bg-green-500/20 text-green-400 cursor-pointer"
                                  : isExpired
                                  ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                                  : "bg-gray-700 hover:bg-green-500/20 cursor-pointer hover:text-green-400"
                              }
                            `}
                          >
                            {
                              isCompleted
                                ? "Completed"
                                : isExpired
                                ? "Expired"
                                : "Mark Complete"
                            }
                          </button>

                          <span>Priority</span>

                          <Link to={`/viewassignment/${assignment?.id}`}>
                            <button className="text-2xl cursor-pointer border-2 w-[5vw] hover:bg-gray-300 hover:text-black transition-all duration-300 rounded-2xl border-white/30">
                              View
                            </button>
                          </Link>

                          <span>
                            <BellRing className="hover:text-purple-400 cursor-pointer rounded-full h-8 w-8 transition-all duration-300" />
                          </span>
                        </div>
                      );
                    })}

                </div>
               </div>
             </div>
             
  )
}

export default DashHeroSection