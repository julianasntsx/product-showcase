import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaTrash } from "react-icons/fa";
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const { theme } = useTheme();

  const [editedQuantities, setEditedQuantities] = useState<{ [key: number]: number }>({});

  const removeFromCart = (product: Product) => {
    dispatch({ type: 'REMOVE_FROM_CART', product });
    toast.info(`Produto removido do carrinho!`);
  };

  const updateQuantity = (product: Product, newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', product, quantity: newQuantity });
  };

  const groupedItems = state.items.reduce((acc: { [key: number]: CartItem }, item: CartItem) => {
    if (!acc[item.product.id]) {
      acc[item.product.id] = { ...item };
    } else {
      acc[item.product.id].quantity += item.quantity;
    }
    return acc;
  }, {});

  // const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-200';

  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-white';
  const borderColor = theme === 'light' ? 'border-gray-300' : 'border-gray-700';
  const placeholderColor = theme === 'light' ? 'placeholder-gray-500' : 'placeholder-gray-400';

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
      <div className="container mx-auto py-8 px-4">
        <h1 className={`text-3xl font-bold mb-6 ${textColor}`}>Carrinho</h1>
        {state.items.length === 0 ? (
          <p className={`text-lg ${textColor}`}>Seu carrinho está vazio</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {Object.values(groupedItems).map((item: CartItem) => (
              <li key={item.product.id} className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                  <div>
                    <h2 className={`text-lg font-semibold ${textColor}`}>{item.product.name}</h2>
                    <p className={textColor}>Quantidade: 

                      <input
                        type="number"
                        value={editedQuantities[item.product.id] || item.quantity}
                        onChange={(e) => setEditedQuantities({ ...editedQuantities, [item.product.id]: parseInt(e.target.value) })}
                        onBlur={() => {
                          const newQuantity = editedQuantities[item.product.id] || item.quantity;
                          setEditedQuantities({ ...editedQuantities, [item.product.id]: newQuantity });
                          updateQuantity(item.product, newQuantity);
                        }}
                        min="1"                      
                        className={`w-16 ml-2 text-center border-2 ${borderColor} rounded-lg ${bgColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out`}
                      />
                    </p>
                    <p className={textColor}>R$ {item.product.price.toFixed(2)}</p>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.product)} className={`bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:text-white`}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
