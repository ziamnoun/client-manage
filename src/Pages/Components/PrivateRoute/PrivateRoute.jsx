import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-20 text-indigo-600 font-semibold">Loading...</div>;
  }

  if (!user) {
    // Redirect to login page but keep track of where user tried to go
    return <Navigate to="/LogIn" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
