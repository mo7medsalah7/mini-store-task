import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState({ count: 0, items: null });

  function addToCart() {
    setCartItems({ count: count++, ...items });
  }

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }



  return (
    <LocalStateProvider
      value={{
        cartOpen,
        toggleCart,
        closeCart,
        openCart,
        cartItems,
        addToCart,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

// making a custom hook for accessing the cart local state
function useCart() {
  //we use a consumer here to access local state
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
