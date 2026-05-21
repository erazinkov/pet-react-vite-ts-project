import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';


export const CARTDATA_KEY_PERSISTENT_STATE = 'cartData';

export interface CartItem {
    id: number;
    count: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CARTDATA_KEY_PERSISTENT_STATE) ?? {
	items:  []
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
		},
		
		remove: (state, action: PayloadAction<number>) => {
			const productId = action.payload;
			const existingItem = state.items.find(item => item.id === productId);
			if (existingItem) {
				if (existingItem.count > 1) {
					state.items.forEach(item => {
						if (item.id === productId) {
							item.count -= 1;
						}
					});
				} else {
					state.items = state.items.filter(item => item.id !== productId);
				}
			}
		},
		delete: (state, action: PayloadAction<number>) => {
			const productId = action.payload;
			state.items = state.items.filter(item => item.id !== productId);
		}
	}
});



export default cartSlice.reducer;
export const cartActions = cartSlice.actions;