import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { products } from '../mockData';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface Product {
  id: number;
  name: string;
  description: string;
  detailedDescription: string;
  price: number;
  image: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const { dispatch } = useCart();
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div className={`text-center ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'} text-xl mt-8`}>Produto não encontrado</div>;

  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', product, quantity });
    toast.success(`Produto adicionado ao carrinho!`);
  };

  
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-200';
  const buttonColor = theme === 'light' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-700 hover:bg-green-800';

  
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const secondaryTextColor = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const borderColor = theme === 'light' ? 'border-gray-300' : 'border-gray-700';
  const placeholderColor = theme === 'light' ? 'placeholder-gray-500' : 'placeholder-gray-400';


  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className={textColor}>
            <h1 className={`text-3xl font-bold mb-4 ${textColor}`}>{product.name}</h1>
            <p className={`text-lg mb-4 ${textColor}`}>{product.detailedDescription}</p>
            <p className={`text-xl font-semibold mb-4 ${textColor}`}>R$ {product.price.toFixed(2)}</p>
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-4">Quantidade:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                className={`w-16 text-center border-2 ${borderColor} rounded-lg ${bgColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <button
              onClick={() => addToCart(product, quantity)}
              className={`text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${buttonColor}`}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
