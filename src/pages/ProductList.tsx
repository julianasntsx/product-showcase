import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import PriceFilter from '../components/PriceFilter';
import Pagination from '../components/Pagination';
import { useTheme } from '../context/ThemeContext';
import { products } from '../mockData';

const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const { theme } = useTheme();
  const [filteredProducts, setFilteredProducts] = useState(products); 

  useEffect(() => {    
    const filterProducts = () => {
      return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    };
  setFilteredProducts(filterProducts()); 
  }, [searchTerm, priceRange]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  setCurrentPage(1); 
  };
  
  const handleFilter = (range: [number, number]) => {
    if (range[0] === 0 && range[1] === Infinity) {      
      toast.error('Nenhum resultado encontrado. Redefinindo filtros.');
      setSearchTerm('');
      setPriceRange([0, Infinity]);
    } else {
      setPriceRange(range);
    setCurrentPage(1); 
    }
  };
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} py-8 px-4`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-4">
          <div className="w-4/6 mx-4">
            <SearchBar setSearchTerm={handleSearch} />
          </div>
          <div className="w-2/6"> 
            <PriceFilter setPriceRange={handleFilter} />
          </div>
        </div>
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
