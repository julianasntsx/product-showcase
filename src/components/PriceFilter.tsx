import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface PriceFilterProps {
  setPriceRange: (range: [number, number]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ setPriceRange }) => {
  const { theme } = useTheme();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRange = JSON.parse(e.target.value) as [number, number];
    setPriceRange(selectedRange);
  };

  return (
    <div className="relative">
      <select
        onChange={handleSelectChange}
        className={`w-full h-10 px-2 sm:px-5 pr-10 border-2 ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} focus:outline-none focus:border-blue-500`}
      >
        <option value="[0,50]">R$ 0 - R$ 50</option>
        <option value="[51,100]">R$ 51 - R$ 100</option>
        <option value="[101,200]">R$ 101 - R$ 200</option>
      </select>
    </div>
  );
};

export default PriceFilter;
