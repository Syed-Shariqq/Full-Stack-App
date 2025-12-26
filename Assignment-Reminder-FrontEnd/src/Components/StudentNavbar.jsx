import React, { useContext, useEffect } from 'react'
import {  BellRing, Search } from 'lucide-react';
import {jwtDecode} from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom';
import { AssignmentContext } from '../Context/AssignmentContext';
import { getAllAssignments } from '../api/AssignmentApi';
import api from '../api/axios';
const DashHeroSection = () => {
   
  const navigate = useNavigate();

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
        

  return (
    <div className='min-h-screen flex flex-col gap-10 p-10 w-[85vw]'>

           {/* Hero Section */}
               <div className='flex items-center justify-between'>
                 <div className='flex gap-5 items-center'>
                  <h1 className='text-6xl font-semibold'>Welcome Back ,</h1>
                  <h1 className='text-5xl h-20 pt-5 font-semibold bg-linear-to-r from-blue-700 to-[#EC5EFF] bg-clip-text text-transparent opacity-80'>{user.sub}</h1>
                 </div>
                 
                <div className='flex border-2 border-white/30  rounded-3xl items-center justify-center relative '>
                
                  <input className='px-20 text-2xl border-2 rounded-3xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 focus:border-2 border-white/30 py-5 outline-none' type="text" placeholder='Search...'/>
                  <Search className='hover:text-indigo-400 transition-all duration-300 absolute h-6 w-6 mt-1 left-5 top-5'/>
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
                   {assignments.map((assignments, index) => (
                    <div className='grid grid-cols-7 px-10 py-6 text-2xl border-y-2 border-white/30' key={index}>
                     <span>{assignments?.subject}</span>
                     <span>{assignments?.title}</span>
                     <span>{assignments?.dueDate}</span>
                     <button
                        disabled={assignments?.completed}
                        onClick={() => 
                          getStatus(assignments?.id)
                        }
                        className={`
                          px-4 py-1.5 rounded-full mr-8 font-medium transition
                          ${assignments?.completed
                            ? "bg-green-500/20 text-green-400 cursor-default"
                            : "bg-gray-700 hover:bg-green-500/20 hover:text-green-400"}
                        `}
                      >
                        {assignments?.completed ? "Completed" : "Mark Complete"}
                      </button>
                     <span>Priority</span>
                     <Link to={`/viewassignment/${assignments?.id}`}>
                       <button className='text-2xl border-2 w-[5vw] hover:bg-gray-300 hover:text-black transition-all duration-300 rounded-2xl border-white/30 '>View</button>
                     </Link>
                     <span><BellRing className='hover:text-purple-400 cursor-pointer rounded-full h-8 w-8  transition-all duration-300'/></span>
                    </div>
                    
                   ), console.log(assignments))}
                </div>
               </div>
             </div>
             
  )
}

export default DashHeroSection