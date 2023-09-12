import { createApi } from '@reduxjs/toolkit/query/react';
import { APIBaseQuery } from './baseQuery';
import { COMMON_API_REDUCER_KEY } from '@/constants';

export const commonApi = createApi({
  reducerPath: COMMON_API_REDUCER_KEY,
  keepUnusedDataFor: 60,
  baseQuery: APIBaseQuery,
  endpoints: () => ({}),
});
