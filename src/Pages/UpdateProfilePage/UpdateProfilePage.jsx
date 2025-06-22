

import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Components/Providers/AuthProviders";

const UpdateProfilePage = () => {
  const { user } = useContext(AuthContext); // assuming you have user info here
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch user profile data on mount and reset form
  useEffect(() => {
    if (!user?.uid) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${user.uid}`);
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();

        // Reset form with fetched data
        reset({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          dob: data.dob || "",
          gender: data.gender || "",
          interests: data.interests || [],
          bio: data.bio || ""
        });

        setLoading(false);
      } catch (error) {
        setServerError(error.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, reset]);

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Failed to update profile");
      alert("Profile updated successfully!");
    } catch (error) {
      setServerError(error.message);
    }
  };

  if (loading) return <p className="text-center text-white mt-10">Loading profile...</p>;
  if (serverError) return <p className="text-center text-red-500 mt-10">{serverError}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Update Your Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Phone Number</label>
            <input
              type="text"
              {...register("phone")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Date of Birth</label>
            <input
              type="date"
              {...register("dob", { required: "Date of Birth is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Gender</label>
            <div className="flex gap-4">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center">
                  <input type="radio" value={g} {...register("gender", { required: "Gender is required" })} className="mr-2" />
                  {g}
                </label>
              ))}
            </div>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          {/* Interests */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Interests</label>
            <div className="grid grid-cols-2 gap-2">
              {["Music", "Sports", "Tech", "Travel"].map((interest) => (
                <label key={interest} className="flex items-center">
                  <input type="checkbox" value={interest} {...register("interests")} className="mr-2" />
                  {interest}
                </label>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Short Bio</label>
            <textarea
              {...register("bio", { maxLength: { value: 300, message: "Max 300 characters" } })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
              rows="4"
              placeholder="Tell us something about yourself..."
            />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;

