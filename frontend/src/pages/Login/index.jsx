import React, { useContext, useState } from 'react';
import background from '../Landing/imgs/heroSection.jpg';
import Logo from '../../components/Logo';
import instance from '../../lib/axios';
import { UserContext } from '../../context/UserContext';
 import { useNavigate } from 'react-router-dom';
function Login() {
  const {setUser}=useContext(UserContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent form reload
    setErrorMsg('');    // clear previous error

    try {
      const res = await instance.post('/user/login', {
        email,
        password,
      });

      setUser(res.data)
      console.log('Login successful:', res.data);
      alert("login successful")
      navigate('/');
     
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error?.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  };

  return (
    <div className="w-full max-w-4xl h-[500px] rounded-lg flex flex-col md:flex-row overflow-hidden shadow-lg bg-white mx-auto">
      
      <div className="w-full md:w-1/2 h-60 md:h-full">
        <img
          src={background}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center px-6 md:px-10 py-6">
        {/* Logo */}
        <Logo />

        {/* Welcome Message */}
        <h2 className="text-xl font-semibold mb-2">Welcome Back!</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Don’t have an account?{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Create Account
          </span>
        </p>

        {/* 🔴 Error Message */}
        {errorMsg && (
          <div className="w-full bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col w-full gap-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
