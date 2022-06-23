import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
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
        };
      } else {
        state.cartCount += 1;
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
  },
});
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
