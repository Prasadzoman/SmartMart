import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; 
import './Navbar.css';
import { useContext } from 'react';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">SmartMart</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>

        {user ? (
          <>
            <li><Link to="/suggestions">Inventory</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/account">Account</Link></li>
            <li><button onClick={logout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
