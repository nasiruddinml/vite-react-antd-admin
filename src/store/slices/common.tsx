import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CommonSliceState } from '@/types';

const initialState: CommonSliceState = {
  loading: false,
};

export const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {
    setGlobalLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const commonReducer = persistReducer(
  {
    key: 'rtk:common',
    storage,
    whitelist: ['loading'],
  },
  commonSlice.reducer,
);
