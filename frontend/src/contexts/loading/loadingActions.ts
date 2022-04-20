import { CommonError } from '../types';
import { LOADING_DATA, LOADING_ERROR } from './loadingConstants';

// interface of action
export interface LoadingData {
  type: typeof LOADING_DATA;
}

export interface LoadingError {
  type: typeof LOADING_ERROR;
  error: CommonError;
}


// action
export type LoadingActions =
  | LoadingData
  | LoadingError


export const loadingData = (
): LoadingActions => ({
    type: LOADING_DATA,
});

export const loadingError = (
    error: LoadingError['error']
): LoadingActions => ({
    type: LOADING_ERROR,
    error
});