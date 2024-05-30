import React from 'react';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const removeFromCart = (product: Product) => {
    dispatch({ type: 'REMOVE_FROM_CART', product });
  };

  return (
    <div>
      <h1>Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {state.items.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div>
                <h2>{item.name}</h2>
                <p>R$ {item.price.toFixed(2)}</p>
              </div>
              <button onClick={() => removeFromCart(item)} className="bg-red-500 text-white px-4 py-2">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;