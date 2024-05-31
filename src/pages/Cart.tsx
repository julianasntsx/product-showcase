import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import ConfirmModal from '../components/ConfirmModal'; // Importe o modal
import QuantitySelector from '../components/QuantitySelector'; // Importe o componente QuantitySelector

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const { theme } = useTheme();

  const [editedQuantities, setEditedQuantities] = useState<{ [key: number]: number }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [productToRemove, setProductToRemove] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setProductToRemove(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setProductToRemove(null);
    setModalOpen(false);
  };

  const confirmRemove = () => {
    if (productToRemove) {
      dispatch({ type: 'REMOVE_FROM_CART', product: productToRemove });
      toast.info('Produto removido do carrinho!');
      closeModal();
    }
  };

  const updateQuantity = (product: Product, newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', product, quantity: newQuantity });
  };

  const getTotalPrice = (item: CartItem) => {
    return (item.quantity * item.product.price).toFixed(2);
  };

  const groupedItems = state.items.reduce((acc: { [key: number]: CartItem }, item: CartItem) => {
    if (!acc[item.product.id]) {
      acc[item.product.id] = { ...item };
    } else {
      acc[item.product.id].quantity += item.quantity;
    }
    return acc;
  }, {});

  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-white';
  const borderColor = theme === 'light' ? 'border-gray-300' : 'border-gray-700';
  const placeholderColor = theme === 'light' ? 'placeholder-gray-500' : 'placeholder-gray-400';

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
      <div className="container mx-auto py-8 px-4">
        <h1 className={`text-3xl font-bold mb-6 ${textColor}`}>Carrinho</h1>
        {state.items.length === 0 ? (
          <p className={`text-lg ${textColor}`}>Seu carrinho está vazio</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {Object.values(groupedItems).map((item: CartItem) => (
              <li key={item.product.id} className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                  <div>
                    <h2 className={`text-lg font-semibold ${textColor}`}>{item.product.name}</h2>
                    <div className={`flex items-center ${textColor}`}>                      
                      <p className={`mr-2 ${textColor}`}>Quantidade:</p>
                      <QuantitySelector
                        quantity={editedQuantities[item.product.id] || item.quantity}
                        setQuantity={(newQuantity) => {
                          setEditedQuantities({ ...editedQuantities, [item.product.id]: newQuantity });
                          updateQuantity(item.product, newQuantity);
                        }}
                      />
                    </div>
                    <p className={textColor}>Valor Unitário: R$ {item.product.price.toFixed(2)}</p>
                    <p className={textColor}>Valor Total: R$ {getTotalPrice(item)}</p>
                  </div>
                </div>
                <button onClick={() => openModal(item.product)} className={`bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:text-white`}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ConfirmModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={confirmRemove}
        message="Tem certeza que deseja remover este produto do carrinho?"
      />
    </div>
  );
};

export default Cart;
