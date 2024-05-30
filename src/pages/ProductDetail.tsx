import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../mockData';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      <p>{product.description}</p>
      <p>R$ {product.price.toFixed(2)}</p>
      {/* btn add to cart */}
    </div>
  );
};

export default ProductDetail;