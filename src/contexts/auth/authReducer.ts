import {
    AUTH_DETAIL_DATA,
    AUTH_DETAIL_ERROR,
    AUTH_DETAIL_FETCH,
    AUTH_LOGOUT
} from './authConstants';
import { AuthDetailActions } from './authActions';
import { AuthDetailState } from './authTypes';

export const initialAuthDetail: AuthDetailState = {
    payload: {
        isLogin: false
    },
    loading: true,
};

export const authDetailReducer = (
    state = initialAuthDetail,
    action: AuthDetailActions
): AuthDetailState => {
    switch (action.type) {
    case AUTH_DETAIL_FETCH:
        return { ...state, loading: true };
    case AUTH_DETAIL_DATA:
        return { ...state, loading: false, payload: action.payload };
    case AUTH_DETAIL_ERROR:
        return { ...state, loading: false, payload: {isLogin: false}, error: action.error };
    case AUTH_LOGOUT:
        return { ...state, loading: false, payload: {isLogin: false}};
    default:
        return state;
    }
};
