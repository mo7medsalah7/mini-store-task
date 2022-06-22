import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'cart',
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
  reducer: { cart: persistedReducer },
  // reducer: { cart: cartSlice },
});

export const persistor = persistStore(store);
