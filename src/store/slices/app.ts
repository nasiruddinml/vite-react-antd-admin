import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type { LocaleType } from '@/locales';

export type ThemeMode = 'dark' | 'light';
export type SidebarMode = 'vertical' | 'horizontal' | 'blend';

export interface AppConfigMode {
  collapsed: boolean;
  locale: LocaleType;
  themeMode: ThemeMode;
  sidebarMode: SidebarMode;
  color: string;
}

const initialState: AppConfigMode = {
  collapsed: false,
  locale: 'bn-BD',
  themeMode: 'dark',
  sidebarMode: 'vertical',
  color: '#52c41a',
};

export const appSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setAppCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
    setAppLocale: (state, action: PayloadAction<LocaleType>) => {
      state.locale = action.payload;
    },
    setAppThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    setAppSidebarMode: (state, action: PayloadAction<SidebarMode>) => {
      state.sidebarMode = action.payload;
    },
    setAppColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
});

export const { setAppCollapsed, setAppColor, setAppLocale, setAppSidebarMode, setAppThemeMode } =
  appSlice.actions;

export const appReducer = persistReducer(
  {
    key: 'rtk:app',
    storage,
    whitelist: ['collapsed', 'locale', 'themeMode', 'sidebarMode', 'color'],
  },
  appSlice.reducer,
);
