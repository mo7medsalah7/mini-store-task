import { createSlice } from '@reduxjs/toolkit';
import getPrice from '../utils.js/get-price';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
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
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { qty } = cartItem;
          console.log(cartItem);
          const priceToGet = getPrice(cartItem, 'USD');
          const price = priceToGet.map((item) => item.amount);
          const itemTotal = price * qty;

          cartTotal.total += itemTotal;
          cartTotal.quantity += qty;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});
export const { addToCart, removeFromCart, getTotals } = cartSlice.actions;

export default cartSlice.reducer;
