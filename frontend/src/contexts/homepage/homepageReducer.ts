import { HomepageActions } from './homepageActions';
import {
    HOMEPAGE_DETAIL_FETCH,
    HOMEPAGE_DETAIL_DATA,
    HOMEPAGE_DETAIL_ERROR,
} from './homepageConstants';

import { HomepageDetailState } from './homepageTypes';

export const initialUserDetail: HomepageDetailState = {
    payload: {},
    loading: false,
};

export const userDetailReducer = (
    state = initialUserDetail,
    action: HomepageActions
): HomepageDetailState => {
    switch (action.type) {
    case HOMEPAGE_DETAIL_FETCH:
        return { ...state };
    case HOMEPAGE_DETAIL_DATA:
        return { ...state };
    case HOMEPAGE_DETAIL_ERROR:
        return { ...state };
    default:
        return state;
    }
};
