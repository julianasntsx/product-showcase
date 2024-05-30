import React, { useState } from 'react';
import { products } from '../mockData';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import PriceFilter from '../components/PriceFilter';

const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <PriceFilter setPriceRange={setPriceRange} />
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />       
        ))}
      </div>
    </div>
  );
};

export default ProductList;