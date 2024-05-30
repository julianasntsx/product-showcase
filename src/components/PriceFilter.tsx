import React from 'react';

interface PriceFilterProps {
  setPriceRange: (range: [number, number]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ setPriceRange }) => {
  return (
    <select onChange={(e) => setPriceRange(JSON.parse(e.target.value))} className="border p-2">
      <option value="[0,50]">R$ 0 - R$ 50</option>
      <option value="[51,100]">R$ 51 - R$ 100</option>
      <option value="[101,200]">R$ 101 - R$ 200</option>
    </select>
  );
};

export default PriceFilter;