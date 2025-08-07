import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types';

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    totalAmount: number;
}

const initialState: CartState = {
    items: [],
    isOpen: false,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            cartSlice.caseReducers.calculateTotal(state);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            cartSlice.caseReducers.calculateTotal(state);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                if (action.payload.quantity <= 0) {
                    state.items = state.items.filter(item => item.id !== action.payload.id);
                } else {
                    item.quantity = action.payload.quantity;
                }
            }
            cartSlice.caseReducers.calculateTotal(state);
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        openCart: (state) => {
            state.isOpen = true;
        },
        closeCart: (state) => {
            state.isOpen = false;
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
        },
        calculateTotal: (state) => {
            state.totalAmount = state.items.reduce((total, item) => {
                return total + (item.preco * item.quantity);
            }, 0);
        },
    },
});

export const {
    addItem,
    removeItem,
    updateQuantity,
    toggleCart,
    openCart,
    closeCart,
    clearCart,
    calculateTotal,
} = cartSlice.actions;

export default cartSlice.reducer;