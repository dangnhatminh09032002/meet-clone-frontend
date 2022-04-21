import { CommonError } from '../types';
import { LOADING_DATA, LOADING_ERROR } from './loadingConstants';
import { IVideo } from './loadingTypes';

// interface of action
export interface LoadingData {
  type: typeof LOADING_DATA;
  payload: IVideo[];

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
 payload: LoadingData["payload"]
): LoadingData => ({
  type: LOADING_DATA,
  payload,
});

export const loadingError = (
    error: LoadingError['error']
): LoadingActions => ({
    type: LOADING_ERROR,
    error
});