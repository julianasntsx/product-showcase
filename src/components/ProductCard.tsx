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
    <div className="border p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p>R$ {product.price.toFixed(2)}</p>
      <Link to={`/product/${product.id}`} className="text-blue-500">View Details</Link>
      <button onClick={() => addToCart(product)} className="bg-green-500 text-white px-4 py-2 mt-2">Add to Cart</button>
    </div>
  );
};

export default ProductCard;