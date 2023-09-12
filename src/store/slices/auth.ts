import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AuthSliceState } from '@/types';

const initialState: AuthSliceState = {};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    updateAccessToken(state, action: PayloadAction<string | undefined>) {
      state.accessToken = action.payload;
    },
    updateRefreshToken(state, action: PayloadAction<string | undefined>) {
      state.refreshToken = action.payload;
    },
  },
});

export const authReducer = persistReducer(
  {
    key: 'rtk:auth',
    storage,
    whitelist: ['accessToken', 'refreshToken'],
  },
  authSlice.reducer,
);
