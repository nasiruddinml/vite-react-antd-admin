import { commonReducer, commonSlice } from './slices/common';
import { authReducer, authSlice } from './slices/auth';
import { appReducer, appSlice } from './slices/app';
import { routeReducer, routeSlice } from './slices/route';
import { userInfoReducer, userInfoSlice } from './slices/userInfo';
import { commonApi, authApi } from '@/api';
import { AUTH_API_REDUCER_KEY, COMMON_API_REDUCER_KEY } from '@/constants';

const reducers = {
  [commonSlice.name]: commonReducer,
  [COMMON_API_REDUCER_KEY]: commonApi.reducer,
  [authSlice.name]: authReducer,
  [AUTH_API_REDUCER_KEY]: authApi.reducer,
  [appSlice.name]: appReducer,
  [routeSlice.name]: routeReducer,
  [userInfoSlice.name]: userInfoReducer,
};

export default reducers;
