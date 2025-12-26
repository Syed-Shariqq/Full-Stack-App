import React, { useContext, useEffect, useState } from 'react'
import { PlusCircle, Search } from 'lucide-react';
import {jwtDecode} from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom';
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
              
            } catch (err) {
              console.error(err);
            }
          };

          fetchAssignments();
        }, [setAssignments]);

        const [stats, setStats] = useState({
            totalAssignments: 0,
            myAssignments: 0,
            pendingSubmissions: 0,
            fullyCompletedAssignments: 0
          });

         useEffect(() => {
          const fetchStats = async () => {
            try {
              const response = await api.get('/assignments/stats');
              setStats(response.data);
              console.log(response.data);
            } catch (err) {
              console.error(err);
            }
          };
          fetchStats();
         },[])

         const [recentAssignments, setRecentAssignments] = useState([]);

        useEffect(() => {
          const fetchRecentAssignments = async () => {
             try {
              const response = await api.get('/assignments/recent');
              setRecentAssignments(response.data);
            } catch (err) {
              console.error(err);
            }
          };

          fetchRecentAssignments();
        },[])

        const averageCompletionRate = (() => {
              if (recentAssignments.length === 0) return 0;

              let totalPercentage = 0;
              let count = 0;

              recentAssignments.forEach(a => {
                const total = a.completedStudents + a.pendingStudents;
                if (total > 0) {
                  totalPercentage += (a.completedStudents / total) * 100;
                  count++;
                }
              });

              return count === 0 ? 0 : (totalPercentage / count).toFixed(2);
            })();

            const progressColor =
                  averageCompletionRate < 40
                    ? "from-red-500 to-red-400"
                    : averageCompletionRate < 70
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
                 <div 
                 onClick={() => {
                  navigate("/addassignment")
                 }}
                 className="text-white border-2 border-white/30 rounded-3xl p-5 cursor-pointer shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:text-purple-500 transition-all duration-300 flex items-center justify-center gap-3">
                  <PlusCircle className='h-10 w-10'/>
                  <h1 className='text-2xl font-semibold'>Add Assignment</h1>
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
                  <h1 className='text-2xl'>Average Completion Rate %</h1>
                  <div className='border-2 relative border-white/30 rounded-full w-[20vw] mx-5 h-6'>
                   <div className={`absolute rounded-full left-0 right-0 h-full bg-linear-to-r from-blue-700 to-[#EC5EFF]`}
                     style={{ width: `${Number(averageCompletionRate)}%` }}> 
                   </div>
                  </div>
                  <p className={`text-2xl bg-linear-to-r ${progressColor} bg-clip-text text-transparent transition-all duration-500`}>{averageCompletionRate}%</p>
                </div>
                <div className='w-[15vw] flex flex-col gap-10 text-4xl font-semibold items-center justify-center bg-[#1F1F27] shadow-[0_0_40px_rgba(99,102,241,0.2)]  h-[20vh] rounded-2xl border-2 border-white/30'>
                  <h1>Total Assignments</h1>
                  <h1 className='text-purple-600 text-5xl'>{stats.totalAssignments}</h1>
                </div>
                <div className='w-[15vw] bg-[#1F1F27] flex flex-col text-4xl font-semibold items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.2)] h-[20vh] rounded-2xl border-2 border-white/30'>
                  <h1>My Assignments</h1>
                  <p className='text-sm text-center mb-5 mt-3 text-gray-200'>(Only assignments created by you can be edited)</p>
                  <h1 className='text-blue-500 text-5xl'>{stats.myAssignments}</h1>
                </div>
                <div className='w-[15vw] bg-[#1F1F27] flex flex-col gap-6 text-4xl font-semibold items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.2)] h-[20vh] rounded-2xl border-2 border-white/30'>
                  <h1 className='text-center leading-12'>Assignments Fully Completed</h1>
                  <h1 className='text-red-400 text-5xl'>{stats.fullyCompletedAssignments}</h1>
                </div>
                
              </div>

              {/* Recent Assignments */}
              <div className='w-[78vw] scrollbar h-[53vh] overflow-y-auto  border-2 border-white/30 rounded-2xl bg-[#1F1F27] shadow-[0_0_40px_rgba(99,102,241,0.2)]'>
                   <h1 className='text-3xl font-semibold py-8 px-5'>Recent Assignments</h1>
                   <div className='grid grid-cols-6 px-20 py-6 text-2xl font-bold border-y-2 border-white/30'>
                    <span>Subject</span>
                    <span>Assignment Name</span>
                    <span>Due Date</span>
                    <span>Completed Students</span>
                    <span>Pending Students</span> 
                    <span> View </span>           
                   </div>
                   {recentAssignments.map((a) => (
                    <div
                      key={a.id}
                      className='grid grid-cols-6 px-20 py-6 text-2xl border-y-2 border-white/30'
                    >
                      <span>{a.subject}</span>
                      <span>{a.title}</span>
                      <span>{a.dueDate}</span>

                      {/* Completed Students (%) */}
                      <span>
                        {a.completedStudents + a.pendingStudents === 0
                          ? "N/A"
                          : `${
                              ((a.completedStudents /
                                (a.completedStudents + a.pendingStudents)) * 100).toFixed(2)
                            }%`}
                      </span>

                      {/* Pending Students (%) */}
                      <span>
                        {a.completedStudents + a.pendingStudents === 0
                          ? "N/A"
                          : `${
                              ((a.pendingStudents /
                                (a.completedStudents + a.pendingStudents)) * 100).toFixed(2)
                            }%`}
                      </span>

                      <Link to={`/viewassignment/${a.id}`}>
                        <button className='text-2xl border-2 w-[5vw] hover:bg-gray-300 hover:text-black transition-all duration-300 rounded-2xl border-white/30'>
                          View
                        </button>
                      </Link>
                    </div>
                  ))}

                </div>
               </div>
             </div>
             
  )
}

export default DashHeroSection