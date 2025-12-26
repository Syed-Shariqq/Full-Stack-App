import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AssignmentContext } from "../Context/AssignmentContext";
import api from "../api/axios"; 
import { ArrowBigLeft } from "lucide-react";

const ViewAssignment = () => {
  const { id } = useParams();
  const { assignments, setAssignments } = useContext(AssignmentContext);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const assignment = assignments.find(
    (a) => a.id === Number(id)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subject: "",
    dueDate: "",
    time: "",
    description: ""
  });
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
  setIsAdmin(role === "ADMIN");
}, [role]);

  // Load assignment into form
  useEffect(() => {
    if (assignment) {
      setForm({
        title: assignment.title,
        subject: assignment.subject,
        dueDate: assignment.dueDate,
        time: assignment.time,
        description: assignment.description
      });
    }},[assignment]);

  const [currentUser, setCurrentUser] = useState(null);

   useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await api.get("/user/me");
          setCurrentUser(res.data);
          console.log(res.data);
          console.log(currentUser);
        } catch (err) {
          console.error("Failed to fetch user", err);
        }
      };

      fetchUser();
    }, []);



  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save changes (ADMIN only)
  const handleSave = async () => {
    try {
      const res = await api.put(`/assignments/${id}`, form);

      // Update context so UI updates instantly
      setAssignments((prev) =>
        prev.map((a) => (a.id === Number(id) ? res.data : a))
      );

      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update assignment");
    }
  };

  const handleDelete = async () => {
     const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");

        if (!confirmDelete) return;
        
        try {
         await api.delete(`/assignments/${id}`);
      
        
        // Remove assignment from context/state
        setAssignments((prev) =>
        prev.filter((a) => a.id !== Number(id))
        );
        navigate("/dashboard");
         
    } catch (err) {
        console.error(err);
        alert("Failed to delete assignment");
    }
  }
        useEffect(() => {
        if (!assignment) {
          navigate("/dashboard");
        }
      }, [assignment, navigate]);

      if (!assignment) {
          return null;
        }


  return (
    <div className="min-h-screen w-screen  flex flex-col items-center justify-center bg-[#0A0A12] text-white p-8">
       {/* HEADER */}
      <div className="flex flex-col justify-start gap-10 border-2 border-indigo-400 rounded-2xl shadow-[0_0_40px_rgba(99,102,241,0.4)] backdrop-blur-xl min-h-[70vh] w-[30vw] items-center">
        <div className="flex items-center p-10 justify-between h-full w-full">
          <div 
          onClick={() => {
            navigate(-1)
          }}
          className="bg-white/40 py-3 px-5 hover:bg-white/60 transition-all duration-300 rounded-3xl"><ArrowBigLeft/></div>
            <h1 className="text-3xl font-bold">
          {isEditing ? "Edit Assignment" : assignment.title}
        </h1>

        {role === "ADMIN" && (
          <div className="flex items-center justify-center gap-5"> 
          <button
           disabled={assignment?.user?.id !== currentUser?.id}
           className={assignment?.user?.id !== currentUser?.id ? "opacity-50 cursor-not-allowed" : "bg-red-500 rounded-2xl hover:bg-red-400 px-8 py-4 cursor-pointer"}
           onClick={handleDelete}>
            Delete
          </button>
           {isAdmin && (
            <button
            disabled={assignment?.user?.id !== currentUser?.id}
            className={assignment?.user?.id !== currentUser?.id ? "opacity-50 cursor-not-allowed" : "px-8 cursor-pointer py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-700"}
            onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
           </button>
           )}
          </div>
        )}
        </div>

        {/* CONTENT */}
      <div className="space-y-4 w-full justify-center items-center">
    
      <div className="grid grid-cols-2 text-2xl gap-60 items-center justify-center px-10 w-full">

        {/* TITLE */}
        <div>
          <label className="opacity-70 ">Title</label>
          {isEditing ? (
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-[#1F1F27] border-2 focus:outline-none border-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.4)] px-5 py-4 rounded-2xl "
            />
          ) : (
            <p className="border-2 mt-2 border-indigo-400 p-4 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">{assignment.title}</p>
          )}
        </div>

        {/* SUBJECT */}
        <div>
          <label className="opacity-70 ">Subject</label>
          {isEditing ? (
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full bg-[#1F1F27] border-2 focus:outline-none border-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.4)] px-5 py-4 rounded-2xl "
            />
          ) : (
            <p className="border-2 mt-2 border-indigo-400 p-4 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">{assignment.subject}</p>
          )}
        </div>
      </div>

        {/* DUE DATE */}
        <div className="grid grid-cols-2 mt-20 text-2xl gap-60 items-center justify-center px-10 w-full">
        <div>
          <label className="opacity-70">Due Date</label>
          {isEditing ? (
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-[10vw] bg-[#1F1F27] border-2 focus:outline-none border-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.4)] px-5 py-4 rounded-2xl "
            />
          ) : (
            <p className="border-2 mt-2 border-indigo-400 p-4 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">{assignment.dueDate}</p>
          )}
        </div>

        {/* TIME */}
        <div>
          <label className="opacity-70">Time</label>
          {isEditing ? (
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full  bg-[#1F1F27] border-2 focus:outline-none border-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.4)] px-5 py-4 rounded-2xl "
            />
          ) : (
            <p className="border-2 mt-2 border-indigo-400 p-4 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">{assignment.time}</p>
          )}
        </div>
      </div>

        {/* DESCRIPTION */}
        <div className="w-full flex flex-col text-2xl gap-5 items-center justify-center mt-20">
          <label className="opacity-70">Description</label>
          {isEditing ? (
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-[90%] bg-[#1F1F27] border-2 focus:outline-none border-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.4)] m-2 p-4 rounded-2xl"
            />
          ) : (
            <p className="w-[90%] border-2 pb-50 mb-20 border-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.4)] m-2 p-4 rounded-2xl">{assignment.description}</p>
          )}
        </div>

        {/* SAVE BUTTON */}
        {isEditing && role === "ADMIN" && (
           <div className="flex items-center justify-center mb-10">
             <button
            onClick={() =>{
                handleSave();
                navigate(-1);
            }}
            className="mt-6 px-10 py-5 rounded-full bg-green-600 hover:bg-green-700"
          >
            Save Changes
           </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ViewAssignment;
