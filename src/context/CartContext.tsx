import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}
interface CartState {
  items: CartItem[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product; quantity: number }
  | { type: 'REMOVE_FROM_CART'; product: Product }
  | { type: 'UPDATE_QUANTITY'; product: Product; quantity: number };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const initialState: CartState = {
    items: [],
  };

  const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
      case 'ADD_TO_CART':
       
        const existingItem = state.items.find((item) => item.product.id === action.product.id);
        if (existingItem) {
          
          return {
            ...state,
            items: state.items.map((item) =>
              item.product.id === action.product.id ? { ...item, quantity: item.quantity + action.quantity } : item
            ),
          };
        } else {
      
          return {
            ...state,
            items: [...state.items, { product: action.product, quantity: action.quantity }],
          };
        }
      case 'REMOVE_FROM_CART':
   
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== action.product.id),
        };
      case 'UPDATE_QUANTITY':
       
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.product.id ? { ...item, quantity: action.quantity } : item
          ),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
