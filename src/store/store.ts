import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';
import { saveState } from './storage';



export const store = configureStore({
	reducer: {
		user: userSlice,
	}
});

store.subscribe(() => {
	const state = store.getState().user;
	console.log('Store state after update:', state); 
	if (state.accessToken && state.refreshToken) {
		saveState({
			accessToken: state.accessToken,
			refreshToken: state.refreshToken
		}, JWT_PERSISTENT_STATE);
	}
});





export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 