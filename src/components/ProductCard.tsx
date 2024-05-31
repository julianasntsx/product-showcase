import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import QuantitySelector from "./QuantitySelector";
import { Product } from "../types/interfaces";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState(1);

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", product, quantity });
    toast.success(`Produto adicionado ao carrinho!`);
  };

  const bgColor = theme === "light" ? "bg-white" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const secondaryTextColor = theme === "light" ? "text-gray-600" : "text-gray-400";

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${bgColor}`}>
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover object-center transition duration-300 ease-in-out transform hover:scale-110"
        />
      </Link>
      <div className="p-6">
        <h2 className={`text-xl font-bold mb-2 ${textColor}`}>
          {product.name}
        </h2>
        <p className={`mb-4 ${secondaryTextColor}`}>{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <p className={`font-semibold text-lg ${textColor}`}>
            R$ {product.price.toFixed(2)}
          </p>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() => addToCart(product)}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg focus:outline-none transition duration-300 ease-in-out hover:text-white"
          >
            Comprar
          </button>
          <Link
            to={`/product/${product.id}`}
            className={`text-blue-500 hover:underline ${
              theme === "light" ? "hover:text-blue-700" : "hover:text-blue-300"
            }`}
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
