import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { PREFIX } from '../api/api';
import type { Auth } from '../interfaces/Auth.interface';
import axios, { AxiosError } from 'axios';
import type { Profile } from '../interfaces/Profile.interface';
import type { RootState } from './store';

export const USERDATA_KEY_PERSISTENT_STATE = 'userData';


export interface UserPersistentState {
    accessToken: string | null;
}

export interface UserState {
    accessToken: string | null;
    loginErrorMessage?: string;
	registerErrorMessage?: string;
	profile?: Profile;
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

export const register = createAsyncThunk('user/register', async (credentials: { username: string, password: string }) => {
	try {
		const { data } = await axios.post<Auth>(`${PREFIX}/auth/login`, { 
			username: credentials.username, 
			password: credentials.password 
		});
		return data;
        
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data.message || 'Register failed');
		}
	}
});

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>('user/getProfile', 
	async (_, thunkApi) => {
		const accessToken = thunkApi.getState().user.accessToken;
		const { data } = await axios.get<Profile>(`${PREFIX}/auth/me`, {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			},
			withCredentials: true
		});
		return data;
	});

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
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
		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.accessToken = action.payload.accessToken;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
	}

});

export default userSlice.reducer;
export const userActions = userSlice.actions;