import { configureStore } from '@reduxjs/toolkit';
import userSlice, { USERDATA_KEY_PERSISTENT_STATE } from './user.slice';
import { saveState } from './storage';
import cartSlice, { CARTDATA_KEY_PERSISTENT_STATE } from './cart.slice';

export const store = configureStore({
	reducer: {
 		user: userSlice,
		cart: cartSlice
	}
});

store.subscribe(() => {
	const state = store.getState();
	saveState(USERDATA_KEY_PERSISTENT_STATE, { accessToken: state.user.accessToken ?? '' });
});

store.subscribe(() => {
	const state = store.getState();
	saveState(CARTDATA_KEY_PERSISTENT_STATE, { items: state.cart.items });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;