import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { state } = useCart();

  return (
    <header className={`bg-${theme === 'light' ? 'gray-800' : 'gray-200'} text-${theme === 'light' ? 'white' : 'black'} p-4`}>
      <nav className="flex justify-between">
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart ({state.items.length})</Link>
          </li>
        </ul>
        <button onClick={toggleTheme} className="bg-blue-500 text-white px-4 py-2">
          Toggle Theme
        </button>
      </nav>
    </header>
  );
};

export default Header;