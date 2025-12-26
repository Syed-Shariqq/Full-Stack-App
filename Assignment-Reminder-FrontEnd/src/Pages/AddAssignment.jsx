import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AssignmentContext } from '../Context/AssignmentContext';
import { createAssignment } from '../api/AssignmentApi';

const AddAssignment = () => {

  const navigate = useNavigate();

    const {
      title, setTitle,
      subject, setSubject,
      dueDate, setDueDate,
      time, setTime,
      description, setDescription,
      addAssignment,assignments
    } = useContext(AssignmentContext);


    const isFormValid = title.trim() !== "" && subject.trim() !== "" && dueDate !== "";

  const handleAddAssignment = async () => {
    const newAssignment = {
      title,
      subject,
      dueDate,
      time,
      description
    }
  
    try{
      
      const response = await createAssignment(newAssignment);
      addAssignment(response.data);
      navigate("/dashboard");

    }catch(err){
      
      console.log(err);
    }
  };
 

  return (
    <div className='min-h-screen w-screen gap-10 text-white flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-semibold'>Add Assignment</h1>
        <div className='h-[80vh] w-[40vw] bg-[#1F1F27] rounded-2xl border-2 flex flex-col gap-10 items-center justify-center border-purple-700/60 shadow-[0_0_50px_rgba(99,102,241,0.2)]'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-2xl font-semibold'>Title</h1>
                <input
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }} 
                className='bg-[#1F1F27] border-2 border-white/30 rounded-xl text-2xl focus:ring-2 focus:border-purple-500/40 focus:border-2 focus:ring-indigo-400/30 h-20 px-5 w-[30vw] outline-none' type="text" placeholder='Title'/>
            </div>
            <div className='flex flex-col gap-3'>
                <h1 className='text-2xl font-semibold'>Subject</h1>
                <input
                 required
                 value={subject}
                 onChange={(e) => {
                  setSubject(e.target.value);
                 }}
                 className='bg-[#1F1F27] border-2 border-white/30 rounded-xl text-2xl focus:ring-2 focus:border-purple-500/40 focus:border-2 focus:ring-indigo-400/30 h-20 px-5 w-[30vw] outline-none' type="text" placeholder='Subject'/>
            </div>
            <div className='w-[29vw] flex items-center justify-between gap-5'>
               <div className='flex h-[10vh] w-[15vw] flex-col gap-2'>
                 <h1 className='text-2xl'>DueDate</h1>
                 <div className='relative h-full w-full flex items-center justify-center '>
                    <input 
                    required
                    value={dueDate}
                    onChange={(e) => {
                      setDueDate(e.target.value);
                    }}
                    className="h-full focus:ring-2 focus:border-purple-500/40 focus:border-2 focus:ring-indigo-400/30 w-full outline-none border-2 border-white/30 rounded-xl pl-5 text-2xl text-white/40" type="date" placeholder='Date'/>
                 </div>
               </div>
               <div className='flex h-[10vh] w-[15vw] flex-col gap-2'>
                 <h1 className='text-2xl'>Time</h1>
                 <div className='relative h-full w-full flex items-center justify-center '>
                    <input
                      required
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value);
                      }}
                     className="h-full focus:ring-2 focus:border-purple-500/40 focus:border-2 focus:ring-indigo-400/30 w-full outline-none border-2 border-white/30 rounded-xl pl-5 text-2xl text-white/40" type="time" placeholder='Time'/>
                 </div>
               </div>
            </div>
            <div className='flex flex-col gap-3' >
                <h1 className='text-2xl font-semibold'>Description</h1>
                <textarea 
                 value={description}
                 onChange={(e) => {
                  setDescription(e.target.value);
                 }}
                className='scrollbar focus:ring-2 focus:border-purple-500/40 focus:border-2 focus:ring-indigo-400/30 h-40 w-[30vw] resize-none leading-relaxed bg-[#1F1F27] border-2 border-white/30 rounded-xl p-4 text-2xl outline-none' type="text" placeholder='Description'/>
            </div>
            <button
              onClick={handleAddAssignment}
              disabled={!isFormValid}
              className={`px-10 py-5 rounded-full text-2xl transition-all duration-300
                ${isFormValid
                  ? "bg-linear-to-r from-indigo-600 to-pink-500 hover:scale-105 active:scale-95 cursor-pointer"
                  : "bg-gray-600 cursor-not-allowed opacity-50"
                }`}>
              Create
            </button>

        </div>        
    </div>
  )
}

export default AddAssignment