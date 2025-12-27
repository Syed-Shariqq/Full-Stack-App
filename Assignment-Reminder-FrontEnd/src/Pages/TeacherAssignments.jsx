import React, { useContext, useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom';
import { AssignmentContext } from '../Context/AssignmentContext';
import { getAllAssignments } from '../api/AssignmentApi';
import api from '../api/axios';

const TeacherAssignments = () => {

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

  return (
              <div className='w-[78vw] scrollbar min-h-[90vh] my-10 overflow-y-auto  border-2 border-white/30 rounded-2xl bg-[#1F1F27] shadow-[0_0_40px_rgba(99,102,241,0.2)]'>
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
  )
}

export default TeacherAssignments