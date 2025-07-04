import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './pages/Admin/DashBoard.jsx';
import AllAppiontments from './pages/Admin/AllAppiontments.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorsList from './pages/Admin/DoctorsList.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorDashborad from './pages/Doctor/DoctorDashborad.jsx';
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  return aToken || dToken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<DashBoard />} />
          <Route path='/all-appointments' element={<AllAppiontments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />


          <Route path='/doctor-dashboard' element={<DoctorDashborad />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )

}

export default App



