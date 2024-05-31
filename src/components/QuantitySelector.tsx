import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  setQuantity,
}) => {
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecrement}
        className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-l-lg focus:outline-none"
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        readOnly
        className="w-16 text-center border-2 border-gray-300 rounded-none bg-white text-gray-800 placeholder-gray-500 focus:outline-none"
        style={{ appearance: "textfield" }}
      />
      <button
        onClick={handleIncrement}
        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-r-lg focus:outline-none"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
