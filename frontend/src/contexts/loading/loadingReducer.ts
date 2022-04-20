import { LoadingActions } from './loadingActions';
import { LOADING_DATA, LOADING_ERROR } from './loadingConstants';
import { LoadingState } from './loadingTypes';


export const initialAuthDetail: LoadingState = {
    loading: true,
};

export const authDetailReducer = (
    state = initialAuthDetail,
    action: LoadingActions
): LoadingState => {
    switch (action.type) {
    case LOADING_DATA:
        return { ...state, loading: false};
    case LOADING_ERROR:
        return { ...state, loading: false, error: action.error };
    default:
        return state;
    }
};
