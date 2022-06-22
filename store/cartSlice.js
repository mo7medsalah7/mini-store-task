import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// INSERT BOOK
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartItems, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const res = await fetch('http://localhost:4000/', {
        method: 'POST',
        body: JSON.stringify(cartItems),
        headers: { 'Content-type': 'application/json' },
      });

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: null, isLoading: false, error: null },
  extraReducers: {
    [addToCart.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems.push(action.payload);
    },
    [addToCart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default cartSlice.reducer;
