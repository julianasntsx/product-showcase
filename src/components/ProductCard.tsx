import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p>R$ {product.price.toFixed(2)}</p>
      <Link to={`/product/${product.id}`} className="text-blue-500">View Details</Link>
    </div>
  );
};

export default ProductCard;