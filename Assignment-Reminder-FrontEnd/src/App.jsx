import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Landing from './Pages/LandingPage' 
import Heading from './Components/Heading'
import NotFound from './Pages/NotFound'
import DashBoard from './Pages/DashBoard'
import ProtectedRoute from './Components/ProtectedRoute'
import AddAssignment from './Pages/AddAssignment'
import StudentDashboard from './Pages/StudentDashboard'
import ViewAssignment from './Pages/ViewAssignment'
import Calendar from './Pages/Calendar'
import Assignments from './Pages/Assignments'


const App = () => {

  return (
    <div className='min-h-screen w-screen flex flex-col justify-center items-center bg-[#0A0A12]'>
      
      <Routes>

        {/* Landing page route */}
        <Route path="/" element={<Landing />} />

        {/* Login page route */}
        <Route
          path="/login"
          element={
            <>
            <Heading />
            <div className='h-[80vh] w-[30vw] text-white shadow-[0_0_40px_rgba(99,102,241,0.18)]
                            backdrop-blur-xl  border-4 border-white/10 relative overflow-hidden bg-white/5 rounded-2xl'>  
              <Login />
            </div>
           </>
          }
        />
        
        {/* Signup Page route */}
        <Route
          path="/signup"
          element={
            <>
            <Heading />
            <div className='h-[80vh] w-[30vw] text-white shadow-[0_0_40px_rgba(99,102,241,0.18)]
                            backdrop-blur-xl  border-4 border-white/10 relative overflow-hidden bg-white/5 rounded-2xl'>
              <Signup />
            </div>
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/login/*" element={<NotFound />} />
        <Route path="/signup/*" element={<NotFound />} />
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <DashBoard />
          </ProtectedRoute> 
          } />

          <Route path="/addassignment" element = {
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AddAssignment />
            </ProtectedRoute>
          }/>

          <Route path="/assignments" element = {
            <ProtectedRoute allowedRoles={["USER","ADMIN"]}>
              <Assignments />
            </ProtectedRoute>
          }/> 

          <Route path="/studentdashboard" element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <StudentDashboard/>
            </ProtectedRoute>
            
            }/>
            <Route path="/viewassignment/:id" element={
              <ProtectedRoute allowedRoles={["USER","ADMIN"]}>
                <ViewAssignment />
              </ProtectedRoute>
            }/>

            <Route path="/calendar" element={
              <ProtectedRoute allowedRoles={["USER","ADMIN"]}>
                <Calendar />
              </ProtectedRoute>
            }/>

      </Routes>

    </div>
  )
}

export default App
