
// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";


// import { AuthContext} from "../Components/Providers/AuthProviders";




// const Register = () => {

//     const data=useContext(AuthContext);
//   const { register, handleSubmit, watch, formState: { errors } } = useForm();
//   const password = watch("password");
//   const { createUser, user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       const result = await createUser(data.email, data.password);
//       const loggedUser = result.user;

//       // Backend এ ইউজারের ডেটা পাঠানো
//     //   await axios.post("http://localhost:5000/api/users", {
//     //     uid: loggedUser.uid,
//     //     fullName: data.fullName,
//     //     email: data.email,
//     //   });

//       alert("Registration successful!");
//       navigate("/");  // Registration successful হলে home এ নিয়ে যাবে

//     } catch (error) {
//       console.error("Registration failed:", error);
//       alert("Error: " + error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex justify-center items-center p-4">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Create Your Account</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* Full Name */}
//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Full Name</label>
//             <input
//               type="text"
//               {...register("fullName", { required: "Full Name is required" })}
//               className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Email</label>
//             <input
//               type="email"
//               {...register("email", { required: "Email is required" })}
//               className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//           </div>

//         {/* Password */}
// <div>
//   <label className="block mb-1 font-semibold text-gray-700">Password</label>
//   <input
//     type="password"
//     {...register("password", {
//       required: "Password is required",
//       minLength: { value: 6, message: "Password must be at least 6 characters" },
//       pattern: {
//         value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
//         message: "Password must contain both uppercase and lowercase letters"
//       }
//     })}
//     className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//   />
//   {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
// </div>


//           {/* Confirm Password */}
//           <div>
//             <label className="block mb-1 font-semibold text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               {...register("confirmPassword", {
//                 required: "Confirm your password",
//                 validate: (value) => value === password || "Passwords do not match"
//               })}
//               className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//             {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
//           >
//             Register
//           </button>

//           <p className="text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link to="/LogIn" className="text-indigo-600 font-semibold hover:underline">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios"; // new line
import { AuthContext } from "../Components/Providers/AuthProviders";

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;

      // send to backend
      await axios.post("http://localhost:5000/api/users", {
        uid: loggedUser.uid,  // firebase uid
        fullName: data.fullName,
        email: data.email,
      });

      alert("Registration successful!");
      navigate("/");

    } catch (error) {
      console.error("Registration failed:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Create Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  message: "Password must contain both uppercase and lowercase letters"
                }
              })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) => value === password || "Passwords do not match"
              })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/LogIn" className="text-indigo-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

