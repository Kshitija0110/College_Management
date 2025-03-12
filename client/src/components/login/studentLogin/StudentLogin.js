// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import Spinner from "../../../utils/Spinner";
// import { studentSignIn } from "../../../redux/actions/studentActions";

// const StudentLogin = () => {
//   const [translate, setTranslate] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const store = useSelector((state) => state);
//   const [error, setError] = useState({});
//   useEffect(() => {
//     setTimeout(() => {
//       setTranslate(true);
//     }, 1000);
//   }, []);

//   useEffect(() => {
//     if (store.errors) {
//       setError(store.errors);
//     }
//   }, [store.errors]);

//   const login = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     dispatch(
//       studentSignIn({ username: username, password: password }, navigate)
//     );
//   };

//   useEffect(() => {
//     if (store.errors) {
//       setLoading(false);
//       setUsername("");
//       setPassword("");
//     }
//   }, [store.errors]);
//   return (
//     <div className="bg-[#d65158] h-screen w-screen flex items-center justify-center">
//       <div className="grid grid-cols-2">
//         <div
//           className={`h-96 w-96 bg-white flex items-center justify-center ${
//             translate ? "translate-x-[12rem]" : ""
//           }  duration-1000 transition-all rounded-3xl shadow-2xl`}>
//           <h1 className="text-[3rem]  font-bold text-center">
//             Student
//             <br />
//             Login
//           </h1>
//         </div>
//         <form
//           onSubmit={login}
//           className={`${
//             loading ? "h-[27rem]" : "h-96"
//           } w-96 bg-[#2c2f35] flex flex-col items-center justify-center ${
//             translate ? "-translate-x-[12rem]" : ""
//           }  duration-1000 transition-all space-y-6 rounded-3xl shadow-2xl`}>
//           <h1 className="text-white text-3xl font-semibold">Student</h1>
//           <div className="space-y-1">
//             <p className="text-[#515966] font-bold text-sm">Username</p>
//             <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
//               <input
//                 onChange={(e) => setUsername(e.target.value)}
//                 value={username}
//                 type="text"
//                 required
//                 className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
//                 placeholder="Username"
//               />
//             </div>
//           </div>
//           <div className="space-y-1">
//             <p className="text-[#515966] font-bold text-sm">Password</p>
//             <div className="bg-[#515966] rounded-lg px-2 flex  items-center">
//               <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 required
//                 type={showPassword ? "text" : "password"}
//                 className=" bg-[#515966] text-white rounded-lg outline-none py-2  placeholder:text-sm"
//                 placeholder="Password"
//               />
//               {showPassword ? (
//                 <VisibilityIcon
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="cursor-pointer"
//                 />
//               ) : (
//                 <VisibilityOffIcon
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="cursor-pointer"
//                 />
//               )}
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]">
//             Login
//           </button>
//           {loading && (
//             <Spinner
//               message="Logging In"
//               height={30}
//               width={150}
//               color="#ffffff"
//               messageColor="#fff"
//             />
//           )}
//           {(error.usernameError || error.passwordError) && (
//             <p className="text-red-500">
//               {error.usernameError || error.passwordError}
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentLogin;

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SchoolIcon from '@mui/icons-material/School';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Spinner from "../../../utils/Spinner";
import { studentSignIn } from "../../../redux/actions/studentActions";

const StudentLogin = () => {
  const [translate, setTranslate] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  // Keeping existing effects
  useEffect(() => {
    setTimeout(() => {
      setTranslate(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
    }
  }, [store.errors]);

  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  }, [store.errors]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      studentSignIn({ username: username, password: password }, navigate)
    );
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 max-w-6xl w-full">
        {/* Left Section - Welcome */}
        <div className={`bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center ${
          translate ? "translate-x-12" : ""
        } duration-1000 transition-all`}>
          <SchoolIcon className="text-blue-700 mb-4" sx={{ fontSize: 64 }} />
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Welcome Back
            <br />
            Student
          </h1>
          <p className="mt-4 text-gray-600 text-center">
            Access your academic dashboard and stay connected with your education journey
          </p>
        </div>

        {/* Right Section - Login Form */}
        <form
          onSubmit={login}
          className={`bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-xl ${
            loading ? "h-auto" : ""
          } flex flex-col items-center justify-center ${
            translate ? "-translate-x-12" : ""
          } duration-1000 transition-all space-y-6`}
        >
          <div className="w-full space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-700">Student Login</h2>
              <p className="text-gray-600 mt-2">Please enter your credentials</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Username</label>
                <div className="bg-white rounded-xl border border-blue-100 flex items-center">
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl outline-none text-gray-800 placeholder:text-gray-400"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Password</label>
                <div className="bg-white rounded-xl border border-blue-100 flex items-center">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-xl outline-none text-gray-800 placeholder:text-gray-400"
                    placeholder="Enter your password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-4 text-gray-500 hover:text-blue-600"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {loading && (
              <div className="flex justify-center">
                <Spinner
                  message="Authenticating"
                  height={30}
                  width={150}
                  color="#2563EB"
                  messageColor="#2563EB"
                />
              </div>
            )}

            {(error.usernameError || error.passwordError) && (
              <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
                {error.usernameError || error.passwordError}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
