import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../mockData';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const { dispatch } = useCart();
  const { theme } = useTheme();

  if (!product) return <div className={`text-center text-${theme === 'light' ? 'gray-800' : 'gray-200'} text-xl mt-8`}>Produto não encontrado</div>;

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-200';
  const buttonColor = theme === 'light' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-700 hover:bg-green-800';

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className={textColor}>
            <h1 className={`text-3xl font-bold mb-4 ${textColor}`}>{product.name}</h1>
            <p className={`text-lg mb-4 ${textColor}`}>{product.description}</p>
            <p className={`text-xl font-semibold mb-4 ${textColor}`}>R$ {product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)} className={`text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${buttonColor}`}>Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
