import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { SiShopware } from "react-icons/si";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { state } = useCart();

  const textColor = theme === 'light' ? 'text-white' : 'text-white';
  const bgColor = theme === 'light' ? 'bg-blue-600' : 'bg-gray-900';
  const buttonColor = theme === 'light' ? 'bg-white text-blue-600' : 'bg-blue-600 text-white';

  return (
    <header className={`${bgColor} ${textColor} p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold tracking-wider"><SiShopware /></Link>
        <nav className="flex space-x-4">
          <Link to="/" className={`text-lg font-semibold ${textColor}`}>Produtos</Link>
          <Link to="/cart" className={`text-lg font-semibold ${textColor}`}>Carrinho ({state.items.length})</Link>
        </nav>
        <button onClick={toggleTheme} className={`px-4 py-2 rounded-lg focus:outline-none ${buttonColor}`}>
          {theme === 'light' ? <FaMoon className="mr-2" /> : <FaSun className="mr-2" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
