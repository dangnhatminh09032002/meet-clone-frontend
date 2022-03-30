import { CommonError } from '../types';
import {
    HOMEPAGE_DETAIL_FETCH,
    HOMEPAGE_DETAIL_DATA,
    HOMEPAGE_DETAIL_ERROR,
} from './homepageConstants';
import { Homepage, HomepageDetailState } from './homepageTypes';

// User detail action insterface
export interface HomepageFetch {
  type: typeof HOMEPAGE_DETAIL_FETCH;
  payload: Homepage;
}

export interface HomepageData {
  type: typeof HOMEPAGE_DETAIL_DATA;
  payload: HomepageDetailState;
}

export interface HomepageError {
  type: typeof HOMEPAGE_DETAIL_ERROR;
  error: CommonError;
}

export type HomepageActions =
  | HomepageFetch
  | HomepageData
  | HomepageError;

// User detail actions methods
export const homepageFetch = (
    payload: HomepageFetch['payload']
): HomepageActions => ({
    type: HOMEPAGE_DETAIL_FETCH,
    payload,
});

export const homepageData = (
    payload: HomepageData['payload']
): HomepageActions => ({
    type: HOMEPAGE_DETAIL_DATA,
    payload,
});

export const homepageError = (
    payload: HomepageError['error']
): HomepageError => ({
    type: HOMEPAGE_DETAIL_ERROR,
    error: payload,
});
