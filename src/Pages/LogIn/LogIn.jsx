import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/Providers/AuthProviders";

const LogIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Login to ProFile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/Register" className="text-indigo-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
