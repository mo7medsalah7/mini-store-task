import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// using redux-persist tp persist data
const persistConfig = {
  key: 'cart',
  storage,
};

// Configuring reducer
const persistedReducer = persistReducer(persistConfig, cartSlice);

// Configuring Store
export const store = configureStore({
  reducer: { cart: persistedReducer },
});

export const persistor = persistStore(store);
