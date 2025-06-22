

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load users');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = users.filter(user =>
      (user.fullName && user.fullName.toLowerCase().includes(lowercasedTerm)) ||
      (user.email && user.email.toLowerCase().includes(lowercasedTerm))
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  if (loading) return <p className="text-center mt-10 text-indigo-700 font-semibold">Loading users...</p>;
  if (error) return <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-indigo-700 border-b-4 border-yellow-400 pb-2">
        All Users
      </h2>

      {/* Search input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-center text-red-500 font-semibold">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredUsers.map(user => (
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
              </div>

              <button
                onClick={() => {
                  setSelectedUser(user);
                  document.getElementById('my_modal_2').showModal();
                }}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal Part*/}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">User Details</h3>
          {selectedUser && (
            <div className="space-y-2 text-gray-700 text-sm mt-4">
              <p><span className="font-semibold">Full Name:</span> {selectedUser.fullName || 'N/A'}</p>
              <p><span className="font-semibold">Email:</span> {selectedUser.email || 'N/A'}</p>
              <p><span className="font-semibold">Phone:</span> {selectedUser.phone || 'N/A'}</p>
              <p><span className="font-semibold">DOB:</span> {selectedUser.dob ? new Date(selectedUser.dob).toLocaleDateString() : 'N/A'}</p>
              <p><span className="font-semibold">Gender:</span> {selectedUser.gender || 'N/A'}</p>
              <p><span className="font-semibold">Interests:</span> {selectedUser.interests?.length ? selectedUser.interests.join(', ') : 'N/A'}</p>
              {selectedUser.bio && (
                <p><span className="font-semibold">Bio:</span> {selectedUser.bio}</p>
              )}
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserDetails;
