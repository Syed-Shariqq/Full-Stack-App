import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeClosed } from 'lucide-react';
import { signup } from '../api/auth';

const Signup = () => {
  
  const navigate = useNavigate();
  
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  {/* Handle SignUp submission */}
  const handleSignup = async () => {
    try{

     await signup(form);
     alert("Signup successful! Please log in.");
     navigate("/login")

    }catch(err){

      console.log(err);
      setError(err.response.data);
    }
  }

  return (
    <div className='absolute flex flex-col gap-10 h-full w-full'>
           <h1 className='pt-20 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-4xl font-semibold text-center'>Sign Up</h1>

           {/* Signup form */}
           <form 
           onSubmit={(e) => {
             e.preventDefault();
             handleSignup();
           }}
           className="flex flex-col mt-20 gap-5 " action="">

            {/* Username input field */}
             <div className='flex p-10 h-20  w-[28vw] relative justify-center items-center '>
              <input 
              value={form.username}
              required
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
               
              }}
              className='px-7 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 focus:border-2 
                              text-2xl h-full w-full py-8 outline-none border-4 border-white/10 rounded-3xl' 
              type="text" />
              <label className={`absolute left-18 ${form.username ? "hidden": "block" } text-2xl top-6`} htmlFor="">Username</label>
             </div>

             {/* Email/Phone input field */}
             <div className='flex p-10 h-20 w-[28vw] relative justify-center items-center '>
              <input 
              value={form.email}
              required
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                
              }}
              className='px-7 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 focus:border-2 
                              text-2xl h-full w-full py-8 outline-none border-4 border-white/10 rounded-3xl' 
              type="text" />
              <label className={`absolute left-18 ${form.email ? "hidden": "block" } text-2xl top-6`} htmlFor="">Email or Phone Number</label>
             </div>

             {/* Password input field */}
             <div className='flex p-10 h-20 w-[28vw] relative justify-center items-center '>
              <input 
              value={form.password}
              required
              onChange={(e) => {
                setForm({...form, password: e.target.value})
              }}
              className='px-7 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 focus:border-2 
                              text-2xl h-full w-full py-8 outline-none border-4 border-white/10 rounded-3xl' 
              type={showPassword ? "text" : "password"} />
              <label className={`absolute left-18 ${form.password ? "hidden": "block"} text-2xl top-6`} htmlFor="">Password</label>

              {/* Password visibility toggle button */}
              {showPassword ? (
                <Eye 
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className='absolute right-16 cursor-pointer top-8'/>
              ) : (
                <EyeClosed 
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className='absolute right-16 cursor-pointer top-8'/>
              )
              }
             </div>
             
             {/* Signup button */}
               <div className='flex mt-15 justify-center items-center'>
                <button className='cursor-pointer px-12 py-6 rounded-full font-semibold text-white bg-linear-to-br from-indigo-500 to-purple-500
                                  shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:from-purple-500 hover:to-indigo-500 text-xl hover:scale-[1.02] active:scale-95 transition-all'>Sign Up</button>
              </div>

             {/* Login redirect link */}
             <div className='flex items-center mt-10 justify-center gap-2 text-xl'>
               <p className=''>Already have an account?</p>
               <Link to="/login" className='font-bold text-indigo-400 hover:text-purple-400 transition-all duration-300'>Log In</Link>
            </div>
           </form>
        </div>
  )
}

export default Signup