import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import restaurantsReducer from './slices/restaurantsSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        restaurants: restaurantsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;