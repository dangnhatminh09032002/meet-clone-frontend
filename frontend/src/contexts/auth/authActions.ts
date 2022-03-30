import { CommonError } from '../types';
import {
    AUTH_DETAIL_FETCH,
    AUTH_DETAIL_DATA,
    AUTH_DETAIL_ERROR,
    AUTH_LOGOUT,
} from './authConstants';

// interface of action
export interface AuthDetailFetch {
  type: typeof AUTH_DETAIL_FETCH;
}

export interface AuthDetailData {
  type: typeof AUTH_DETAIL_DATA;
}

export interface AuthDetailError {
  type: typeof AUTH_DETAIL_ERROR;
  error: CommonError;
}

export interface AuthLogout {
  type: typeof AUTH_LOGOUT;
}

// action
export type AuthDetailActions =
  | AuthDetailFetch
  | AuthDetailData
  | AuthDetailError
  | AuthLogout;

export const authDetailFetch = (
): AuthDetailActions => ({
    type: AUTH_DETAIL_FETCH,
});

export const authDetailData = (
): AuthDetailActions => ({
    type: AUTH_DETAIL_DATA,
});

export const authLogout = (
) : AuthDetailActions => ({
    type: AUTH_LOGOUT,
});

export const authDetailError = (
    error: AuthDetailError['error']
): AuthDetailActions => ({
    type: AUTH_DETAIL_ERROR,
    error
});