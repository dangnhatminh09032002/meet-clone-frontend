import { CommonError } from '../types';
import {
    USER_DETAIL_FETCH,
    USER_DETAIL_DATA,
    USER_DETAIL_ERROR,
} from './userConstants';
import { IUser, UserDetailState } from './userTypes';

// User detail action insterface
export interface UserDetailFetch {
  type: typeof USER_DETAIL_FETCH;
  payload: IUser;
}

export interface UserDetailData {
  type: typeof USER_DETAIL_DATA;
  payload: UserDetailState;
}

export interface UserDetailError {
  type: typeof USER_DETAIL_ERROR;
  error: CommonError;
}

export type UserDetailActions =
  | UserDetailFetch
  | UserDetailData
  | UserDetailError;

// User detail actions methods
export const userDetailFetch = (
    payload: UserDetailFetch['payload']
): UserDetailFetch => ({
    type: USER_DETAIL_FETCH,
    payload,
});

export const userDetailData = (
    payload: UserDetailData['payload']
): UserDetailData => ({
    type: USER_DETAIL_DATA,
    payload,
});

export const userDetailError = (
    payload: UserDetailError['error']
): UserDetailError => ({
    type: USER_DETAIL_ERROR,
    error: payload,
});
