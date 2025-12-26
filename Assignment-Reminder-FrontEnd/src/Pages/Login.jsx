import { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeClosed } from 'lucide-react';
import { login } from '../api/auth';

const Login = () => {
   
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false);

  {/* Handle login submission */}
  const handleLogIn = async () => {
    try{

      await login(form);
      const role = localStorage.getItem("role");

      if (role === "ADMIN") {
      navigate("/dashboard");
    } else {
      navigate("/studentdashboard");
    }

      alert("Login successful!");
      
    }catch(err){
       
      console.log(err);
      setError(err.response.data);
      
    }
  }
  return (
    <div className='absolute flex flex-col gap-10 min-h-full w-full'>
           <h1 className='pt-20 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-4xl font-semibold text-center'>Log In</h1>

           {/* Login form */}
           <form 
           onSubmit={(e) => {
             e.preventDefault();
             handleLogIn();
           }}
           className="flex flex-col mt-10 gap-5 " action="">

            {/* Username input field */}
             <div className='flex p-10 h-20 mt-20 w-full sm:w-[28vw] relative justify-center items-center '>
              <input 
              required
              value={form.username}
              onChange={(e) => {
                setForm({...form, username: e.target.value});
              }}
              className='px-7 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 focus:border-2 
                              text-2xl h-full w-full py-8 outline-none border-4 border-white/10 rounded-3xl' 
              type="text" />
              <label className={`absolute left-18 ${form.username ? "hidden": "block" } text-2xl top-6`} htmlFor="">Username</label>
             </div>

             {/* Password input field */}
             <div className='flex p-10 h-20 w-[28vw] relative justify-center items-center '>
              <input 
              required
              value={form.password}
              onChange={(e) => {
                setForm({...form, password: e.target.value});
              }}
              className='px-7 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 focus:border-2 text-2xl h-full w-full py-8 outline-none border-4 border-white/10 rounded-3xl'
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

             {/* Forgot password link */}
             <div className='h-20 pb-10 flex items-center justify-end mr-24 cursor-pointer'>
              <p className='text-indigo-400 hover:text-purple-400 text-[1.2rem] transition-all duration-300'>Forgot Password?</p>
             </div>

             {/* Login button */}
             <div className='flex justify-center items-center'>
              <button className='cursor-pointer px-12 py-6 rounded-full font-semibold text-white bg-linear-to-br from-indigo-500 to-purple-500
                                  shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:from-purple-500 hover:to-indigo-500 text-xl hover:scale-[1.02] active:scale-95 transition-all'>Log In</button>
             </div>
              {error && <p className='text-center text-red-500'>{error}</p>}
              {/* Signup redirect link */}
             <div className='flex items-center justify-center mt-10 gap-2 text-xl'>
              <p className=''>Don't have an account? </p>
              <Link to="/signup" className='font-bold text-indigo-400 hover:text-purple-400 transition-all duration-300'>Sign Up</Link>
             </div>
           </form>
        </div>
  )
}

export default Login