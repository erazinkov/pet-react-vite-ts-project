import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { PREFIX } from '../api/api';
import type { Auth } from '../interfaces/Auth.interface';
import axios, { AxiosError } from 'axios';

export const USERDATA_KEY_PERSISTENT_STATE = 'userData';


export interface UserPersistentState {
    accessToken: string | null;
}

export interface UserState {
    accessToken: string | null;
    loginErrorMessage?: string;
}

const initialState: UserState = {
	accessToken: loadState<UserPersistentState>(USERDATA_KEY_PERSISTENT_STATE)?.accessToken ?? null
};

export const login = createAsyncThunk('user/login', async (credentials: { username: string, password: string }) => {
	try {
		const { data } = await axios.post<Auth>(`${PREFIX}/auth/login`, { 
			username: credentials.username, 
			password: credentials.password 
		});
		return data;
        
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data.message || 'Login failed');
		}
	}
});

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		// addAccessToken: (state, action: PayloadAction<string>) => {
		// 	state.accessToken = action.payload;
		// },
		logOut: (state) => {
			state.accessToken = null;
		},
		clearLoginErrorMessage: (state) => {
			state.loginErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.accessToken = action.payload.accessToken;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});
	}

});

export default userSlice.reducer;
export const userActions = userSlice.actions;