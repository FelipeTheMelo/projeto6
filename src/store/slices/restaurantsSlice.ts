import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant } from '../../types';

interface RestaurantsState {
    items: Restaurant[];
    loading: boolean;
    error: string | null;
}

const initialState: RestaurantsState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchRestaurants = createAsyncThunk(
    'restaurants/fetchRestaurants',
    async () => {
        const response = await fetch('https://ebac-fake-api.vercel.app/api/efood/restaurantes');
        if (!response.ok) {
            throw new Error('Failed to fetch restaurants');
        }
        return await response.json();
    }
);

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurants.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRestaurants.fulfilled, (state, action: PayloadAction<Restaurant[]>) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch restaurants';
            });
    },
});

export default restaurantsSlice.reducer;