import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


export interface CartItem {
    id: number;
    count: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
	items: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		add: (state, action: PayloadAction<number>) => {
			const productId = action.payload;
			const existingItem = state.items.find(item => item.id === productId);
			if (existingItem) {
				state.items.forEach(item => {
					if (item.id === productId) {
						item.count += 1;
					}
				});
			} else {
				state.items.push({ id: productId, count: 1 });
			}
		}
	}
});



export default cartSlice.reducer;
export const cartActions = cartSlice.actions;