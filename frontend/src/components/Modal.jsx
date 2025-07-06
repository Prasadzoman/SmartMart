import React from 'react';
import close from '../components/icons/Close.svg';

export default function Modal({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors duration-300 z-50
        ${open ? 'visible bg-black/30 backdrop-blur-sm' : 'invisible opacity-0'}
      `}
    >
     
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white p-6 rounded-xl shadow  transition-all 
          ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
        `}
      >
        <button onClick={onClose} className=' absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover: bg-gray-50 hover:text-gray-600'>
            <img src={close} alt="" />
        </button>
        {children}
      </div>
    </div>
  );
}
