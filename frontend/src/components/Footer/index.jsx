import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import home from '../icons/home.svg';
import chatbot from '../icons/chatbot.svg';
import menu from '../icons/menu.svg';
import Shopping_Cart from '../icons/Shopping_Cart.svg';

import MenuModal from '../MenuModal'; 

function Footer() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // Control modal visibility

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-inner z-50">
        <div className="flex justify-around items-center h-full">
          <button onClick={() => navigate('/')}>
            <img src={home} alt="Home" className="w-6 h-6" />
          </button>
          <button onClick={() => navigate('/chatbot')}>
            <img src={chatbot} alt="Chatbot" className="w-6 h-6" />
          </button>
          <button onClick={() => navigate('/cart')}>
            <img src={Shopping_Cart} alt="Cart" className="w-6 h-6" />
          </button>
          <button onClick={() => setShowMenu(true)}>
            <img src={menu} alt="Menu" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Menu Modal */}
      <MenuModal isOpen={showMenu} onClose={() => setShowMenu(false)} />
    </>
  );
}

export default Footer;
