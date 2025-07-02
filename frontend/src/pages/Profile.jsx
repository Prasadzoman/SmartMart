import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/Profile.css"

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); 
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/user/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container">
    <h2>Welcome, {user.name}!</h2>
    <p><strong>Email:</strong> {user.email}</p>
    <button onClick={handleLogout}>Logout</button>
  </div>
  );
};

export default Profile;
