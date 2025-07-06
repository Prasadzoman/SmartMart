import React from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from './icons/Close.svg';

const MenuModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
    <div
      onClick={onClose}
      className={`fixed inset-0 flex   transition-colors duration-300 z-50
        ${isOpen ? 'visible bg-black/30 backdrop-blur-sm' : 'invisible opacity-0'}
      `}
    ></div>
    <div className="fixed bottom-16 right-4 z-50">
      <div className="w-64 bg-white rounded-xl p-4 shadow-lg relative">
       
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <img src={CloseIcon} alt="Close" className="w-4 h-4" />
        </button>

       
        <h2 className="text-lg font-semibold mb-3">Menu</h2>
        <ul className="flex flex-col gap-2 text-sm">
          <li className="hover:text-blue-600 cursor-pointer" onClick={onClose}><Link to="/account" className="block py-2 px-4 hover:bg-gray-100">Account</Link></li>
          <li className="hover:text-blue-600 cursor-pointer" onClick={onClose}><Link to="/orders" className="block py-2 px-4 hover:bg-gray-100">Orders</Link></li>
          <li className="hover:text-blue-600 cursor-pointer"onClick={onClose}><Link to="/profile" className="block py-2 px-4 hover:bg-gray-100">Settings</Link></li>
          <li className="hover:text-red-600 cursor-pointer" onClick={onClose}><Link to="/profile" className="block py-2 px-4 hover:bg-gray-100">Logout</Link></li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default MenuModal;
