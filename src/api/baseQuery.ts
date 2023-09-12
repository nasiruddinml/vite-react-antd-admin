import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { API_URL, UPDATE_TOKEN } from '@/constants';
import { resetStateAction } from '@/store/actions/resetState';
import { persistor, store } from '@/store';
import { authSlice } from '@/store/slices/auth';

type AxiosParams = {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  uploadProgress?: AxiosRequestConfig['onUploadProgress'];
};
const client = axios.create();

export interface IAxiosBaseQuery {
  baseUrl?: string;
  // eslint-disable-next-line no-unused-vars
  headers?: (headers: { [key: string]: string }) => { [key: string]: string };
}

export interface IBaseQuery extends AxiosParams {
  error?: {
    status: number;
    data: unknown;
  };
}

export const axiosBaseQuery = ({
  baseUrl = '',
  headers,
}: IAxiosBaseQuery): BaseQueryFn<
  IBaseQuery,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  {
    status?: number;
    data?: unknown;
    error?: {
      status: number | string;
      data: unknown;
    };
  }
> => {
  return async ({ url, params, method, data, uploadProgress }) => {
    try {
      const result = await client({
        url: baseUrl + url,
        method: method,
        ...(params && { params: params }),
        ...(headers && { headers: headers({}) }),
        ...(data && { data: data }),
        responseType: 'json',
        onUploadProgress: uploadProgress,
      });
      return {
        data: result.data,
      };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
};

// create a new mutex
const mutex = new Mutex();
export const APIBaseQueryInterceptor = axiosBaseQuery({
  baseUrl: `${API_URL}/v1`,
  headers: (headers) => {
    const token = store.getState().authSlice.accessToken;
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return headers;
  },
});

export const APIBaseQuery: BaseQueryFn<IBaseQuery, unknown, unknown> = async (
  args,
  api,
  extraOptions,
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await APIBaseQueryInterceptor(args, api, extraOptions);
  if (result?.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await APIBaseQueryInterceptor(
          {
            url: `${UPDATE_TOKEN}`,
            method: 'POST',
            data: { refreshToken: store.getState().authSlice.refreshToken },
          },
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          store.dispatch(authSlice.actions.updateAccessToken(refreshResult.data?.token));
          store.dispatch(authSlice.actions.updateRefreshToken(refreshResult.data?.refreshToken));
          // retry the initial query
          result = await APIBaseQueryInterceptor(args, api, extraOptions);
        } else {
          api.dispatch(resetStateAction());
          persistor.pause();
          persistor.flush().then(() => {
            return persistor.purge();
          });
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await APIBaseQueryInterceptor(args, api, extraOptions);
    }
  }
  return result;
};
