import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { UseInfoType } from '@/types';

interface UserInfoSlice {
  userInfo?: UseInfoType;
  rule: UseInfoType['rule'];
}

const initialState: UserInfoSlice = {
  rule: 'admin',
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UseInfoType>) => {
      state.userInfo = action.payload;
      state.rule = action.payload.rule;
    },
    setRule: (state, action: PayloadAction<UseInfoType['rule']>) => {
      state.rule = action.payload;
      if (state.userInfo) {
        state.userInfo.rule = action.payload;
      }
    },
  },
});

export const { setUserInfo, setRule } = userInfoSlice.actions;

export const userInfoReducer = persistReducer(
  {
    key: 'rtk:userInfo',
    storage,
    whitelist: ['userInfo', 'rule'],
  },
  userInfoSlice.reducer,
);
