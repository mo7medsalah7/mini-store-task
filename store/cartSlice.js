import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartCount: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      state.cartCount += 1;
      state.cartItems = [...state.cartItems, action.payload];
    },
  },
});
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
