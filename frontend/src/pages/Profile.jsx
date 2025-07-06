import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="pt-24 text-center text-xl text-gray-700">
        You are not logged in.
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 sm:px-6 md:px-20 lg:px-40 min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-emerald-600">My Profile</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 text-sm">Full Name</label>
            <div className="text-lg font-medium text-gray-800">{user.name}</div>
          </div>
          <div>
            <label className="text-gray-500 text-sm">Email</label>
            <div className="text-lg font-medium text-gray-800">{user.email}</div>
          </div>
          <div>
            <label className="text-gray-500 text-sm">Phone</label>
            <div className="text-lg font-medium text-gray-800">{user.phone || 'N/A'}</div>
          </div>
          <div>
            <label className="text-gray-500 text-sm">Joined On</label>
            <div className="text-lg font-medium text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => navigate('/orders')}
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition"
          >
            View Orders
          </button>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
