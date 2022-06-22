import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: null,
    cartCount: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      console.log(state.cartItems);
      state.cartCount += 1;
      state.cartItems = {
        ...state.cartItems,
        payload: action.payload,
      };
    },
  },
});
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
