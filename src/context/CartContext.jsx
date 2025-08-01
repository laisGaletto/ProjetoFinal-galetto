import { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });
  
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  
  // Update localStorage when cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Calculate totals
      const newTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const newItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
      
      setTotal(newTotal);
      setItemCount(newItemCount);
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);
  
  // Add item to cart
  const addItem = (item, quantity) => {
    if (!isInCart(item.id)) {
      setCart(prev => [...prev, { ...item, quantity }]);
    } else {
      setCart(prev => 
        prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + quantity } 
            : cartItem
        )
      );
    }
  };
  
  // Remove item from cart
  const removeItem = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };
  
  // Update item quantity
  const updateItemQuantity = (itemId, quantity) => {
    setCart(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  // Check if item is in cart
  const isInCart = (id) => {
    return cart.some(item => item.id === id);
  };
  
  // Clear cart
  const clearCart = () => {
    setCart([]);
  };
  
  return (
    <CartContext.Provider value={{
      cart,
      total,
      itemCount,
      addItem,
      removeItem,
      updateItemQuantity,
      isInCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);