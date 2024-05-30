import React from 'react';

interface SearchBarProps {
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Buscar produtos..."
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border p-2"
    />
  );
};

export default SearchBar;