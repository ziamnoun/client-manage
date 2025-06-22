import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Components/Providers/AuthProviders';

const ProfileDetailsPage = () => {
  const { user } = useContext(AuthContext);  // Firebase logged in user
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/api/users/${user.uid}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p className="text-center mt-10 text-indigo-700">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!profile) return <p className="text-center mt-10 text-gray-600">No profile found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 p-8 flex justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-8 text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-indigo-700 text-center">Your Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-1">Full Name</h2>
            <p className="text-gray-700">{profile.fullName || '-'}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Email</h2>
            <p className="text-gray-700">{profile.email || '-'}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Phone</h2>
            <p className="text-gray-700">{profile.phone || '-'}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Date of Birth</h2>
            <p className="text-gray-700">{profile.dob ? new Date(profile.dob).toLocaleDateString() : '-'}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Gender</h2>
            <p className="text-gray-700">{profile.gender || '-'}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Interests</h2>
            <p className="text-gray-700">{profile.interests?.length ? profile.interests.join(', ') : '-'}</p>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-1">Bio</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{profile.bio || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsPage;
