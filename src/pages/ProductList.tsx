import React, { useState } from 'react';
import { products } from '../mockData';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import PriceFilter from '../components/PriceFilter';
import Pagination from '../components/Pagination';
import { useTheme } from '../context/ThemeContext';

const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); 
  const { theme } = useTheme();


  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={` ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} py-8 px-4`}>
      <div className="max-w-4xl mx-auto">
        <SearchBar setSearchTerm={setSearchTerm} />
        <PriceFilter setPriceRange={setPriceRange} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          itemsPerPage={productsPerPage}
          totalItems={filteredProducts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ProductList;