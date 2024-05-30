import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const { theme } = useTheme();

  // const addToCart = (product: Product) => {
  //   dispatch({ type: 'ADD_TO_CART', product, quantity});
  // };

  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-white';
  const secondaryTextColor = theme === 'light' ? 'text-gray-600' : 'text-gray-400';

  return (
    <Link to={`/product/${product.id}`} className={`rounded-lg overflow-hidden shadow-lg ${bgColor}`}>
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover object-center" />
      <div className="p-6">
        <h2 className={`text-xl font-bold mb-2 ${textColor}`}>{product.name}</h2>
        <p className={`mb-4 ${secondaryTextColor}`}>{product.description}</p>
        <div className="flex justify-between items-center">
          <p className={`font-semibold text-lg ${textColor}`}>R$ {product.price.toFixed(2)}</p>
          <button onClick={() => "addToCart(product)"} className={`bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg focus:outline-none transition duration-300 ease-in-out hover:text-white`}>
            Comprar
          </button>
        </div>
        <Link to={`/product/${product.id}`} className={`text-blue-500 hover:underline mt-4 inline-block ${theme === 'light' ? 'hover:text-blue-700' : 'hover:text-blue-300'}`}>Ver detalhes</Link>
      </div>
    </Link>
  );
};

export default ProductCard;
