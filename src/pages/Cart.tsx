import React from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const { theme } = useTheme();

  const removeFromCart = (product: Product) => {
    dispatch({ type: 'REMOVE_FROM_CART', product });
  };

  const groupedItems = state.items.reduce((acc: { [key: number]: any }, item: Product) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 };
    }
    acc[item.id].quantity += 1;
    return acc;
  }, {});

  const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-200';

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
      <div className="container mx-auto py-8 px-4">
        <h1 className={`text-3xl font-bold mb-6 ${textColor}`}>Carrinho</h1>
        {state.items.length === 0 ? (
          <p className={`text-lg ${textColor}`}>Seu carrinho está vazio</p>
        ) : (
          <ul className="divide-y divide-gray-200 bg-red">
            {Object.values(groupedItems).map((item: Product & { quantity: number }) => (
              <li key={item.id} className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                  <div>
                    <h2 className={`text-lg font-semibold ${textColor}`}>{item.name}</h2>
                    <p className={textColor}>Quantidade: {item.quantity}</p>
                    <p className={textColor}>R$ {item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item)} className={`bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${theme === 'light' ? 'hover:text-white' : 'hover:text-gray-900'}`}>Remover</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
