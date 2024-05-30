import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover object-center" />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-gray-800 font-semibold text-lg">R$ {product.price.toFixed(2)}</p>
          <button onClick={() => addToCart(product)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg focus:outline-none transition duration-300 ease-in-out">Comprar</button>
        </div>
        <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline mt-4 inline-block">Ver detalhes</Link>
      </div>
    </div>
  );
};

export default ProductCard;
