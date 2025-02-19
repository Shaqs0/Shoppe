import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { loadState } from './storage';
import { loginUser, registerUser } from '../api/user';
import { AppDispatch } from './store';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
    accessToken: string | null;
    refreshToken: string | null;
}

export interface UserState {
    accessToken: string | null;
    refreshToken: string | null;
    loginErrorMessage?: string;
    registerErrorMessage?: string;
}

const initialState: UserState = {
	accessToken: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.accessToken ?? null,
	refreshToken: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.refreshToken ?? null,
};


export const login = (params: { email: string, password: string }) => async (dispatch: AppDispatch) => {
	try {
		const data = await loginUser(params);
		console.log('Received tokens:', data.access_token, data.refresh_token); 
		dispatch(userActions.setTokens({
			accessToken: data.access_token,
			refreshToken: data.refresh_token
		}));
	} catch (error) {
		if (error instanceof AxiosError) {
			dispatch(userActions.setLoginError(error.response?.data.message || 'Ошибка авторизации'));
		}
	}
};

export const register = (params: { email: string, password: string, name: string }) => async (dispatch: AppDispatch) => {
	try {
		const data = await registerUser(params);
		dispatch(userActions.setTokens({
			accessToken: data.access_token,
			refreshToken: data.refresh_token
		}));
	} catch (error) {
		if (error instanceof AxiosError) {
			dispatch(userActions.setRegisterError(error.response?.data.message || 'Ошибка регистрации'));
		}
	}
};


export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
			console.log('Set tokens in reducer:', action.payload); 
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
		},
		setLoginError: (state, action: PayloadAction<string>) => {
			state.loginErrorMessage = action.payload;
		},
		setRegisterError: (state, action: PayloadAction<string>) => {
			state.registerErrorMessage = action.payload;
		},
		logout: (state) => {
			state.accessToken = null;
			state.refreshToken = null;
			localStorage.removeItem(JWT_PERSISTENT_STATE);
		},
		
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearRegisterError: (state) => {
			state.registerErrorMessage = undefined;
		}
	}
});


export default userSlice.reducer;
export const userActions = userSlice.actions;
