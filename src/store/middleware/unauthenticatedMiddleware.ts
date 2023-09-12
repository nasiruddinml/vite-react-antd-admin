import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { persistor } from '..';
import { resetStateAction } from '../actions/resetState';

export const unauthenticatedMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      dispatch(resetStateAction());
      persistor.pause();
      persistor.flush().then(() => {
        return persistor.purge();
      });
    }

    return next(action);
  };
