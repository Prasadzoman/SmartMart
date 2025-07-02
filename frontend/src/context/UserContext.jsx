import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/me', {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/user/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  // ✅ Add to Cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await axios.post(
        'http://localhost:3000/cart/add',
        { productId, quantity },
        { withCredentials: true }
      );
      console.log('🛒 Added to cart:', res.data.message);
    } catch (err) {
      console.error('Failed to add to cart:', err.response?.data?.error || err.message);
    }
  };

  // ✅ Remove from Cart
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.post(
        'http://localhost:3000/cart/remove',
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
    <UserContext.Provider value={{ user, setUser, fetchUser, logout, addToCart, removeFromCart }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
