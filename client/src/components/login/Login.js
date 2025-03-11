import React from "react";
import { Link } from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative"
      style={{
        // backgroundImage: url("/assets/campus-bg.png"),
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-7xl w-full space-y-8 backdrop-blur-md bg-white/30 p-8 rounded-3xl shadow-2xl">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-3">
            <SchoolIcon className="text-blue-700 transform hover:scale-110 transition-transform duration-300" sx={{ fontSize: 64 }} />
            <h1 className="text-6xl font-bold text-blue-700 tracking-tight">EduConnect</h1>
          </div>
          <p className="text-gray-800 text-xl font-medium">Empowering Education Through Technology</p>
          <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
            <LockOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Secure Login Portal</span>
          </div>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {/* Faculty Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 border border-blue-100">
            <div className="flex flex-col items-center space-y-6">
              <PersonIcon 
                sx={{ fontSize: 72 }} 
                className="text-blue-600 transform group-hover:scale-110 transition-transform duration-300" 
              />
              <h2 className="text-3xl font-bold text-gray-800">Faculty Portal</h2>
              <p className="text-gray-600 text-center text-lg">Access your teaching dashboard, manage classes, and track student progress</p>
              <Link
                to="/login/facultylogin"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 w-full text-center text-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Login as Faculty
              </Link>
            </div>
          </div>

          {/* Student Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 border border-blue-100">
            <div className="relative z-10 flex flex-col items-center space-y-6">
              <SchoolOutlinedIcon 
                sx={{ fontSize: 72 }} 
                className="text-blue-600 transform group-hover:scale-110 transition-transform duration-300" 
              />
              <h2 className="text-3xl font-bold text-gray-800">Student Portal</h2>
              <p className="text-gray-600 text-center text-lg">View your courses, check attendance, and access learning materials</p>
              <Link
                to="/login/studentlogin"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 w-full text-center text-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Login as Student
              </Link>
            </div>
          </div>

          {/* Admin Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 border border-blue-100">
            <div className="relative z-10 flex flex-col items-center space-y-6">
              <AdminPanelSettingsIcon 
                sx={{ fontSize: 72 }} 
                className="text-blue-600 transform group-hover:scale-110 transition-transform duration-300" 
              />
              <h2 className="text-3xl font-bold text-gray-800">Admin Portal</h2>
              <p className="text-gray-600 text-center text-lg">Manage institution settings, users, and monitor system performance</p>
              <Link
                to="/login/adminlogin"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 w-full text-center text-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Login as Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 space-y-2">
          <p className="text-gray-800 text-lg font-medium">© 2025 EduConnect. All rights reserved.</p>
          <p className="text-gray-600 text-sm">Secure • Reliable • Modern</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
