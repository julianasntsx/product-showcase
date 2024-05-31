import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

import { FaSun, FaMoon } from 'react-icons/fa';
import { SiShopware } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { state } = useCart();
  
  // Alteração aqui para contar produtos únicos
  const cartItemCount = state.items.length;

  const textColor = theme === 'light' ? 'text-white' : 'text-white';
  const bgColor = theme === 'light' ? 'bg-blue-600' : 'bg-gray-900';

  return (
    <header className={`${bgColor} ${textColor} p-4 relative`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold tracking-wider"><SiShopware /></Link>
        <nav className="flex space-x-4 justify-center items-center">
          <Link to="/" className={`text-lg font-semibold ${textColor}`}>Home</Link>
          <Link to="/" className={`text-lg font-semibold ${textColor}`}>Produtos</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="text-lg font-semibold relative">
            <FaShoppingCart size="1.4em" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-6 bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-xs">{cartItemCount}</span>
            )}
          </Link>
            {theme === 'light' ? <FaMoon onClick={toggleTheme} className="mr-2 cursor-pointer" size="1.4em"/> : <FaSun onClick={toggleTheme}  className="mr-2 cursor-pointer" size="1.4em" />}
        </div>
      </div>
    </header>
  );
};

export default Header;
