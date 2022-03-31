import { UserDetailActions } from './userActions';
import {
    USER_DETAIL_DATA,
    USER_DETAIL_ERROR,
    USER_DETAIL_FETCH,
} from './userConstants';

import { UserDetailState } from './userTypes';

export const initialUserDetail: UserDetailState = {
    payload: {},
    loading: false,
};

export const userDetailReducer = (
    state = initialUserDetail,
    action: UserDetailActions
): UserDetailState => {
    switch (action.type) {
    case USER_DETAIL_FETCH:
        return { ...state };
    case USER_DETAIL_DATA:
        return { ...state, payload: action.payload};
    case USER_DETAIL_ERROR:
        return { ...state, error: action.error};
    default:
        return state;
    }
};
