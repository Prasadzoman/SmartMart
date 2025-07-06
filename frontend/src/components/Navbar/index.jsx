import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import logoutIcon from '../icons/logout.svg';


function Navbar() {
  
  const { logout, user, setShowLoginModal, setShowSignupModal } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = user
    ? [
      { label: 'Home', path: '/' },
      { label: 'Chatbot', path: '/chatbot' },
      { label: 'Inventory', path: '/suggestions' },
      { label: 'Orders', path: '/orders' },
      { label: 'Cart', path: '/cart' },
      { label: 'Account', path: '/account' }
    ]
    : [
      { label: 'Home', path: '/' },
    ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-6 h-15">
        {/* Logo */}
        <Logo />

        <div className="md:hidden flex items-center gap-4">
          {user ? (
            <button onClick={logout} className="flex items-center gap-2 text-gray-700 hover:text-red-600">
              <img src={logoutIcon} alt="Logout" className="h-5 w-5" />
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className="text-green-600 hover:underline"
              >
                Signup
              </button>
            </>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">
            {navItems.map(({ label, path }) => (
              <li key={label} className="relative group cursor-pointer md:hover:text-blue-600">
                <Link to={path} className="block no-underline text-inherit">
                  {label}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full hidden md:block"></span>
                </Link>
              </li>
            ))}

            {user ? (
              <li className="relative group cursor-pointer md:hover:text-red-600">
                <button onClick={logout} className="flex items-center gap-2 text-inherit">
                  <img src={logoutIcon} alt="logout" className="h-5 w-5" />
                  Logout
                </button>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full hidden md:block"></span>
              </li>
            ) : (
              <>
                <li className="relative group cursor-pointer md:hover:text-blue-600">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="flex items-center gap-2 text-inherit"
                  >
                    Login
                  </button>
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full hidden md:block"></span>
                </li>
                <li className="relative group cursor-pointer md:hover:text-green-600">
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className="flex items-center gap-2 text-inherit"
                  >
                    Signup
                  </button>
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full hidden md:block"></span>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
