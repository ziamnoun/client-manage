
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Components/Providers/AuthProviders";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex flex-col justify-center items-center text-white p-6">
      
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight">
          Welcome to <span className="text-yellow-300">ProFile</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
          Simplify your online presence. Create, customize, and showcase your personal profile in minutes. Join the community and explore profiles from around the world.
        </p>

        {user ? (
          <div className="text-2xl font-semibold text-yellow-300">
            Welcome, {user.displayName || user.email}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link
              to="/LogIn"
              className="px-10 py-4 bg-yellow-400 text-indigo-900 rounded-lg text-lg font-semibold shadow-md hover:bg-yellow-300 transition transform hover:-translate-y-1"
            >
              Login
            </Link>

            <Link
              to="/Register"
              className="px-10 py-4 bg-white text-indigo-900 rounded-lg text-lg font-semibold shadow-md border border-yellow-400 hover:bg-gray-100 transition transform hover:-translate-y-1"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      <footer className="absolute bottom-4 text-gray-300 text-sm">
        © 2025 ProFile. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

