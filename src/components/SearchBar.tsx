import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Buscar"
        onChange={handleInputChange}
        className="w-full h-10 px-5 pr-10 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <div className="absolute top-0 right-0 mt-3 mr-3 text-gray-500">
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBar;
