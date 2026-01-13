import React, { useContext, useEffect } from 'react'
import {  BellRing, Search } from 'lucide-react';
import {jwtDecode} from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom';
import { AssignmentContext } from '../Context/AssignmentContext';
import { getAllAssignments } from '../api/AssignmentApi';
import api from '../api/axios';

const Assignments = () => {

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

  return (
    <div className='w-[78vw] min-h-[90vh] overflow-hidden scrollbar h-[53vh] overflow-y-auto  border-2 border-white/30 rounded-2xl bg-[#1F1F27] shadow-[0_0_40px_rgba(99,102,241,0.2)]'>
                   <h1 className='text-5xl text-center text-indigo-300 font-semibold py-8 px-5'>All Assignments</h1>
                   <div className='grid grid-cols-7 px-10 py-6 text-2xl font-bold border-y-2 border-white/30'>
                    <span>Subject</span>
                    <span>Assignment Name</span>
                    <span>Due Date</span>
                    <span>Status</span>
                    <span>Priority</span>
                   </div>
                   {assignments.map((assignments, index) => {
                    const isExpired = new Date(assignments.dueDate) < new Date();
                    const isCompleted = assignments?.completed;

                    return (
                    <div className='grid grid-cols-7 px-10 py-6 text-2xl border-y-2 border-white/30' key={index}>
                     <span>{assignments?.subject}</span>
                     <span>{assignments?.title}</span>
                     <span>{assignments?.dueDate}</span>
                     <button
                        disabled={isCompleted || isExpired}
                        onClick={() => 
                          getStatus(assignments?.id)
                        }
                        className={`
                          px-4 py-1.5 rounded-full mr-8 font-medium transition
                          ${isCompleted
                            ? "bg-green-500/20 text-green-400 cursor-pointer"
                            : isExpired 
                            ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                            : "bg-gray-700 hover:bg-green-500/20 cursor-pointer hover:text-green-400"}
                        `}
                      >
                        {isCompleted ? "Completed" : isExpired ? "Expired" : "Mark complete"}
                      </button>
                     <span>Priority</span>
                     <Link to={`/viewassignment/${assignments?.id}`}>
                       <button className='text-2xl border-2 w-[5vw] hover:bg-gray-300 hover:text-black transition-all duration-300 rounded-2xl border-white/30 '>View</button>
                     </Link>
                     <span><BellRing className='hover:text-purple-400 cursor-pointer rounded-full h-8 w-8  transition-all duration-300'/></span>
                    </div>
                    
                   )})}
                </div>
  )
}

export default Assignments