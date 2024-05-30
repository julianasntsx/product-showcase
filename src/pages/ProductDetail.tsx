import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../mockData';
import { useCart } from '../context/CartContext';

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

  if (!product) return <div>Product not found</div>;

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      <p>{product.description}</p>
      <p>R$ {product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)} className="bg-green-500 text-white px-4 py-2 mt-2">Add to Cart</button>
    </div>
  );
};

export default ProductDetail;