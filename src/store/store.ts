import { configureStore } from '@reduxjs/toolkit';
import userSlice, { USERDATA_KEY_PERSISTENT_STATE } from './user.slice';
import { saveState } from './storage';

export const store = configureStore({
	reducer: {
 		user: userSlice
	}
});

store.subscribe(() => {
	const state = store.getState();
	saveState(USERDATA_KEY_PERSISTENT_STATE, { accessToken: state.user.accessToken ?? '' });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;