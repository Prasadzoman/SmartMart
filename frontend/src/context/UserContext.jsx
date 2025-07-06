import React, { createContext, useEffect, useState } from 'react';
import instance from '../lib/axios';
import { useNavigate } from 'react-router-dom';
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate=useNavigate()
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await instance.get('/user/me', {
        withCredentials: true,
      });
      setUser(res.data.user);
      setShowSignupModal(false);
      setShowLoginModal(false);
    } catch {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await instance.post('/user/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  // ✅ Add to Cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await instance.post(
        '/cart/add',
        { productId, quantity },
        { withCredentials: true }
      );
      alert("Item added to cart")
      console.log(' Added to cart:', res.data.message);
    } catch (err) {
      console.error('Failed to add to cart:', err.response?.data?.error || err.message);
    }
  };

  // ✅ Remove from Cart
  const removeFromCart = async (productId) => {
    try {
      const res = await instance.post(
        '/cart/remove',
        { productId },
        { withCredentials: true }
      );
      console.log('Removed from cart:', res.data.message);
    } catch (err) {
      console.error('Failed to remove from cart:', err.response?.data?.error || err.message);
    }
  };
  

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, logout, addToCart, removeFromCart , showLoginModal,setShowLoginModal, showSignupModal, setShowSignupModal}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
