
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load users');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10 text-indigo-700 font-semibold">Loading users...</p>;
  if (error) return <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-indigo-700 border-b-4 border-yellow-400 pb-2">
        All Users
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {users.map(user => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-indigo-800 mb-1">{user.fullName || 'N/A'}</h3>
              <p className="text-sm text-gray-500 italic">User ID: {user._id}</p>
            </div>

            <div className="space-y-2 text-gray-700 text-sm">
              <p><span className="font-semibold text-indigo-600">Email:</span> {user.email || 'N/A'}</p>
              <p><span className="font-semibold text-indigo-600">Phone:</span> {user.phone || 'N/A'}</p>
              <p><span className="font-semibold text-indigo-600">DOB:</span> {user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}</p>
              <p><span className="font-semibold text-indigo-600">Gender:</span> {user.gender || 'N/A'}</p>
              <p>
                <span className="font-semibold text-indigo-600">Interests:</span> {user.interests?.length ? user.interests.join(', ') : 'N/A'}
              </p>
            </div>

            {user.bio && (
              <div className="mt-4 p-3 bg-indigo-50 rounded-md text-gray-800 text-sm leading-relaxed">
                <p><span className="font-semibold text-indigo-600">Bio:</span></p>
                <p>{user.bio}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
