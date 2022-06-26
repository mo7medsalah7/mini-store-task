import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalPrice: 0,
    cartCount: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      const isExist = state?.cartItems?.find(
        (item) => item.id === action.payload.id
      );

      if (isExist) {
        return {
          ...state,
          cartItems: state?.cartItems?.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      } else {
        state.cartItems = [...state?.cartItems, action.payload];
      }
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems?.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      console.log(itemIndex);
      if (state.cartItems[itemIndex].qty > 1) {
        state.cartItems[itemIndex].qty -= 1;
      } else if (state.cartItems[itemIndex].qty === 1) {
        const nextCartItems = (state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ));
        state.cartItems = nextCartItems;
      }
    },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
